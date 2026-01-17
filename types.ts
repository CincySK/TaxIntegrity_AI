

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  isError?: boolean;
}

export enum AppView {
  // Public Website Views
  HOME = 'HOME',
  AUDITS = 'AUDITS',
  EVASION = 'EVASION',
  PROGRESS = 'PROGRESS',
  SOURCES = 'SOURCES',
  SIMULATOR = 'SIMULATOR',
  
  // App/Dashboard Views
  DASHBOARD = 'DASHBOARD',
  CHAT = 'CHAT',
  GUIDELINES = 'GUIDELINES',
  RESOURCES = 'RESOURCES',
}

export interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<any>;
}

export interface AuditRecord {
  id: string;
  entityName: string;
  status: 'Compliant' | 'Flagged' | 'Pending';
  riskScore: number;
  lastReview: string;
}