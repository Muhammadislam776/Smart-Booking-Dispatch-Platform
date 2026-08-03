export type UserRole = 'super_admin' | 'business_owner' | 'dispatcher' | 'engineer' | 'customer';

export type JobStatus = 'pending' | 'assigned' | 'en_route' | 'arrived' | 'in_progress' | 'completed' | 'cancelled';

export type ServiceCategory = 'plumbing' | 'electrical' | 'hvac' | 'locksmith' | 'cleaning' | 'painting' | 'handyman';

export interface Business {
  id: string;
  name: string;
  slug: string;
  logo: string;
  primaryColor: string;
  accentColor: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  currency: string;
  vatRate: number; // e.g. 20 for UK VAT
  hourlyRate: number;
  emergencyMultiplier: number;
  weekendMultiplier: number;
  callOutFee: number;
  googlePlaceId?: string;
  rating: number;
  reviewCount: number;
}

export interface User {
  id: string;
  businessId: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address?: string;
  postcode?: string;
  createdAt: string;
}

export interface Engineer extends User {
  skills: string[];
  certifications: string[];
  vehicleRegistration: string;
  isAvailable: boolean;
  currentLat: number;
  currentLng: number;
  rating: number;
  completedJobsCount: number;
  activeJobId?: string;
}

export interface Customer extends User {
  notes?: string;
  totalBookings: number;
}

export interface ServiceItem {
  id: string;
  businessId: string;
  category: ServiceCategory;
  title: string;
  description: string;
  basePrice: number;
  estimatedDurationMins: number;
  isEmergencyAvailable: boolean;
  requiredSkills: string[];
}

export interface PricingBreakdown {
  basePrice: number;
  labourCost: number;
  distanceFee: number;
  emergencyFee: number;
  weekendFee: number;
  materialsCost: number;
  discount: number;
  subtotal: number;
  vatAmount: number;
  total: number;
}

export interface Booking {
  id: string;
  bookingRef: string;
  businessId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceId: string;
  serviceTitle: string;
  category: ServiceCategory;
  status: JobStatus;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
  issueDescription: string;
  photos: string[];
  isEmergency: boolean;
  assignedEngineerId?: string;
  assignedEngineerName?: string;
  assignedEngineerPhone?: string;
  assignedEngineerAvatar?: string;
  assignedEngineerVehicle?: string;
  engineerLat?: number;
  engineerLng?: number;
  etaMins?: number;
  pricing: PricingBreakdown;
  beforePhotos?: string[];
  afterPhotos?: string[];
  materialsUsed?: { name: string; cost: number }[];
  customerNotes?: string;
  engineerNotes?: string;
  signatureUrl?: string;
  createdAt: string;
  completedAt?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  bookingId: string;
  businessId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  issueDate: string;
  dueDate: string;
  items: { description: string; quantity: number; unitPrice: number; amount: number }[];
  subtotal: number;
  vatAmount: number;
  totalAmount: number;
  status: 'unpaid' | 'paid' | 'overdue' | 'refunded';
  stripePaymentId?: string;
  paidAt?: string;
}

export interface ChatMessage {
  id: string;
  bookingId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'dispatch' | 'arrival' | 'invoice' | 'system';
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface AIRecommendation {
  engineerId: string;
  engineerName: string;
  matchScore: number; // 0 - 100
  distanceKm: number;
  etaMins: number;
  skillMatchCount: number;
  currentWorkload: number;
  reason: string;
}
