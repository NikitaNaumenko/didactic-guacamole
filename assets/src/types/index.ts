export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Auth {
  user: User;
}

export interface Monitor {
  id: number;
  name: string;
  description?: string;
  url: string;
  method: string;
  interval_seconds: number;
  timeout_seconds: number;
  expected_status_code: number;
  headers: Record<string, string>;
  body?: string;
  is_active: boolean;
  retry_count: number;
  retry_interval_seconds: number;
}

export interface MonitorFormData {
  name: string;
  description?: string;
  url: string;
  method: string;
  interval_seconds: number;
  timeout_seconds: number;
  expected_status_code: number;
  headers: Record<string, string>;
  body?: string;
  is_active: boolean;
  retry_count: number;
  retry_interval_seconds: number;
} 