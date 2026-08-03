import { Engineer, ServiceItem, AIRecommendation } from '@/types';

/**
 * Calculates Haversine distance between two GPS coordinates in Kilometers
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Calculates Estimated Time of Arrival (ETA) in minutes based on UK urban drive speeds
 */
export function calculateETA(distanceKm: number, isEmergency: boolean): number {
  // Average urban speed ~ 24 km/h (0.4 km per minute) + 3 mins dispatch prep
  const speedKmPerMin = isEmergency ? 0.5 : 0.4;
  const driveTimeMins = Math.round(distanceKm / speedKmPerMin);
  return Math.max(5, driveTimeMins + 3);
}

/**
 * AI Dispatch recommendation engine evaluating skill match, GPS distance, and current workload.
 */
export function findBestEngineerForJob(
  jobLat: number,
  jobLng: number,
  service: ServiceItem,
  engineers: Engineer[],
  isEmergency: boolean = false
): AIRecommendation[] {
  const recommendations: AIRecommendation[] = engineers.map((engineer) => {
    // 1. Distance Calculation
    const distanceKm = calculateHaversineDistance(
      engineer.currentLat,
      engineer.currentLng,
      jobLat,
      jobLng
    );

    // 2. ETA Calculation
    const etaMins = calculateETA(distanceKm, isEmergency);

    // 3. Skill Match Calculation
    const requiredSkills = service.requiredSkills || [];
    let matchedSkillsCount = 0;
    
    if (requiredSkills.length === 0) {
      matchedSkillsCount = 1;
    } else {
      requiredSkills.forEach((reqSkill) => {
        const hasSkill = engineer.skills.some((s) =>
          s.toLowerCase().includes(reqSkill.toLowerCase())
        );
        if (hasSkill) matchedSkillsCount++;
      });
    }

    const skillScore =
      requiredSkills.length > 0
        ? (matchedSkillsCount / requiredSkills.length) * 50
        : 50;

    // 4. Proximity Score (max 40 pts, loses 4 pts per km)
    const proximityScore = Math.max(0, 40 - distanceKm * 4);

    // 5. Availability & Rating Bonus (max 10 pts)
    const availabilityScore = engineer.isAvailable ? 5 : 0;
    const ratingBonus = (engineer.rating / 5) * 5;

    let totalScore = Math.round(skillScore + proximityScore + availabilityScore + ratingBonus);
    if (!engineer.isAvailable) totalScore = Math.min(totalScore, 35); // Heavy penalty if unavailable

    let reason = '';
    if (matchedSkillsCount >= requiredSkills.length && distanceKm < 5 && engineer.isAvailable) {
      reason = `Optimal Match: Certified in ${requiredSkills.join(', ')}, only ${distanceKm}km away (ETA ${etaMins} mins).`;
    } else if (matchedSkillsCount > 0 && engineer.isAvailable) {
      reason = `Good Match: Near location (${distanceKm}km), qualified rating ${engineer.rating}/5.`;
    } else if (!engineer.isAvailable) {
      reason = `Currently on active job, available later.`;
    } else {
      reason = `Partial skill match, ${distanceKm}km distance.`;
    }

    return {
      engineerId: engineer.id,
      engineerName: engineer.name,
      matchScore: Math.min(100, totalScore),
      distanceKm,
      etaMins,
      skillMatchCount: matchedSkillsCount,
      currentWorkload: engineer.activeJobId ? 1 : 0,
      reason,
    };
  });

  // Sort descending by matchScore
  return recommendations.sort((a, b) => b.matchScore - a.matchScore);
}
