export interface Craftsman {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  experience: number;
  location: string;
  phone: string;
  email: string;
  bio: string;
  services: { name: string; price: string }[];
  featured: boolean;
  verified: boolean;
  avatar: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface Review {
  id: string;
  craftsmanId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
