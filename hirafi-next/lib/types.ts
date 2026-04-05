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

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: "admin" | "client" | "artisan";
  isActive: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalCraftsmen: number;
  totalCategories: number;
  totalReviews: number;
  pendingVerifications: number;
  newUsersThisMonth: number;
}

export interface ContactMessage {
  id: number;
  name: string;
  phone: string;
  message: string;
  craftsmanId: string;
  createdAt: string;
}
