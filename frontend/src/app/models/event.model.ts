export interface Event {
  id?: number;
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  location?: string;
  color: string;
  is_all_day: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface EventRequest {
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  location?: string;
  color?: string;
  is_all_day: boolean;
}

export interface CalendarView {
  start_date: string;
  end_date: string;
}