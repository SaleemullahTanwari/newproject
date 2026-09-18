export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  comparePrice?: number;
  category: string;
  images: string[];
  stock: number;
  sku: string;
  status: 'active' | 'draft' | 'archived';
  badge?: 'new' | 'bestseller' | 'sale' | 'limited' | 'clean' | 'award';
  rating: number;
  reviewsCount: number;
  specs: { label: string; value: string }[];
  featured?: boolean;
  createdAt: string;
  // Beauty-specific attributes
  volume?: string;
  skinType?: string;
  keyActives?: string[];
  howToUse?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  userId?: string;
  items: OrderItem[];
  customer: OrderCustomer;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  notes?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export interface UserAddress {
  address: string;
  city: string;
  postalCode: string;
  phone?: string;
  country?: string;
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  joinedDate: string;
  memberTier?: 'Member' | 'Gold Glow' | 'VIP Connoisseur';
  rewardPoints?: number;
  defaultShippingAddress?: UserAddress;
  skinType?: string;
}

export interface FilterState {
  category: string;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  onlyInStock: boolean;
  minPrice: number;
  maxPrice: number;
}
