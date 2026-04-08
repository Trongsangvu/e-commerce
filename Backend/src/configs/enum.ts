export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}

export enum PaymentStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  PAID = "paid",
}

export enum PaymentMethod {
  CASH = "cash",
  CARD = "card",
  PAYPAL = "paypal",
  STRIPE = "stripe",
}

export enum ProductCategory {
  MEN = "men",
  WOMEN = "women",
}
