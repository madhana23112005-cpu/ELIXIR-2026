
export enum EventCategory {
  TECHNICAL = 'Technical',
  NON_TECHNICAL = 'Non-Technical'
}

export enum RegistrationStatus {
  PENDING = 'Payment Pending Verification',
  CONFIRMED = 'Confirmed',
  REJECTED = 'Rejected',
  PRESENT = 'Checked In'
}

export interface Coordinator {
  name: string;
  phone?: string;
}

export interface EventRound {
  name: string;
  details: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  slogan?: string;
  category: EventCategory;
  rules: string[];
  rounds?: EventRound[];
  timing: string;
  prize: string;
  fee: number;
  image: string;
  maxMembers: number;
  coordinators?: Coordinator[];
  whatsappLink?: string;
}

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  image_url: string;
  published_at: string;
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  bio: string;
  institution: string;
  image: string;
  time: string;
  topic: string;
}

export interface ScheduleItem {
  time: string;
  activity: string;
  type: string;
  venue: string;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: 'Title' | 'Gold' | 'Silver' | 'Bronze';
  logo: string;
}

export interface Registration {
  id: string;
  name: string;
  college: string;
  department: string;
  email: string;
  phone: string;
  teamMembers: string[];
  events: string[];
  totalFee: number;
  transactionId?: string;
  status: RegistrationStatus;
  timestamp: string;
}
