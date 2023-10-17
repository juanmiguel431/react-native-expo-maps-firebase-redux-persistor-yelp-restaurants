export type BusinessSearch = {
  businesses: Business[];
  total: string;
}

export type Business = {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: string;
  url: string;
  review_count: string;
  categories: BusinessCategory[];
  rating: string;
  coordinates: BusinessCoordinates;
  transactions: string[];
  price: string;
  location: BusinessLocation;
  phone: string;
  display_phone: string;
  distance: string;
  hours: BusinessHours[];
  is_claimed: boolean;
  date_opened?: string;
  date_closed?: string;
  photos: string[];
  special_hours: BusinessSpecialHours;
  messaging: BusinessMessaging;
}

type BusinessMessaging = {
  url: string;
  use_case_text: string;
  response_rate?: string;
  response_time?: number;
  is_enabled?: boolean;
}

type BusinessSpecialHours = {
  date: string;
  start?: string;
  end?: string;
  is_overnight?: boolean;
  is_closed?: boolean;

}

type BusinessHours = {
  hour_type: string;
  open: BusinessHoursOpen[];
  is_open_now: boolean;
}

type BusinessHoursOpen = {
  day: number;
  start: string;
  end: string;
  is_overnight: boolean;
}

type BusinessCategory = {
  alias: string;
  title: string;
}

type BusinessCoordinates = {
  latitude: string;
  longitude: string;
}

type BusinessLocation = {
  display_address: string;
  address1?: string;
  address2?: string;
  address3?: string;
  city?: string;
  zip_code?: string;
  country?: string;
  state?: string;
  cross_street?: string;
}
