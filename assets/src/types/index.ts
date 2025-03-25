export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Auth {
  user: User;
}

export type Monitor = {
  id: number;
  name: string;
  url: string;
  state: 'active' | 'disabled' | 'deleted';
  http_method: string;
  interval: number;
  request_timeout: number;
  expected_status_code: number;
  inserted_at: string;
  updated_at: string;
  last_check_id?: number;
  last_incident_id?: number;
  escalation_policy_id?: number;
  account_id: number;
};

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

export interface Certificate {
  id: number;
  monitor_id: number;
  issuer: string;
  not_before: string;
  not_after: string;
  inserted_at: string;
  updated_at: string;
}

export interface Check {
  id: number;
  monitor_id: number;
  result: 'success' | 'failure';
  duration: number;
  inserted_at: string;
  updated_at: string;
} 