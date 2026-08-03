import { Business, ServiceItem, PricingBreakdown } from '@/types';

export function calculateBookingPrice(params: {
  business: Business;
  service: ServiceItem;
  distanceKm?: number;
  isEmergency?: boolean;
  isWeekend?: boolean;
  materialsCost?: number;
  discountCode?: string;
}): PricingBreakdown {
  const {
    business,
    service,
    distanceKm = 2.5,
    isEmergency = false,
    isWeekend = false,
    materialsCost = 0,
    discountCode,
  } = params;

  const basePrice = service.basePrice;
  const estimatedHours = service.estimatedDurationMins / 60;
  const labourCost = Math.round(business.hourlyRate * estimatedHours * 100) / 100;

  // Distance fee: £1.50 per km beyond initial 3 km free radius
  const billableDistance = Math.max(0, distanceKm - 3);
  const distanceFee = Math.round(billableDistance * 1.5 * 100) / 100;

  // Emergency & Weekend multipliers
  const emergencyFee = isEmergency
    ? Math.round(basePrice * (business.emergencyMultiplier - 1) * 100) / 100
    : 0;

  const weekendFee = isWeekend
    ? Math.round(basePrice * (business.weekendMultiplier - 1) * 100) / 100
    : 0;

  // Discount handling (e.g., 'TRADEPRO10' gives 10% off subtotal)
  let discount = 0;
  const preliminarySubtotal =
    basePrice + labourCost + distanceFee + emergencyFee + weekendFee + materialsCost;

  if (discountCode?.toUpperCase() === 'TRADEPRO10') {
    discount = Math.round(preliminarySubtotal * 0.1 * 100) / 100;
  } else if (discountCode?.toUpperCase() === 'WELCOME15') {
    discount = Math.round(preliminarySubtotal * 0.15 * 100) / 100;
  }

  const subtotal = Math.max(0, preliminarySubtotal - discount);

  // UK VAT @ 20%
  const vatAmount = Math.round(subtotal * (business.vatRate / 100) * 100) / 100;
  const total = Math.round((subtotal + vatAmount) * 100) / 100;

  return {
    basePrice,
    labourCost,
    distanceFee,
    emergencyFee,
    weekendFee,
    materialsCost,
    discount,
    subtotal: Math.round(subtotal * 100) / 100,
    vatAmount,
    total,
  };
}
