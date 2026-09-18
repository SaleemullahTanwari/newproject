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
  badge?: 'new' | 'bestseller' | 'sale' | 'limited';
  rating: number;
  reviewsCount: number;
  specs: { label: string; value: string }[];
  featured?: boolean;
  createdAt: string;
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
  items: OrderItem[];
  customer: OrderCustomer;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  notes?: string;
}

export interface FilterState {
  category: string;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  onlyInStock: boolean;
  minPrice: number;
  maxPrice: number;
}
