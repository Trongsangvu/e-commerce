export const messageGeneral = {
  SOMETHING_WRONG: "An error has occurred",
  ACCESS_DENIED: "Access denied, you do not have permission",
  BAD_REQUEST: "Invalid request",
  UNAUTHORIZED: "Not authenticated",
  NOT_FOUND: "Not found",
  TOO_MANY_REQUESTS: "Too many requests",
  SERVICE_UNAVAILABLE: "Service unavailable",
};

export const messageRequired = (field: string) => `${field} is required`;

export const messageInvalid = (field: string) => `${field} is invalid`;

export const messageNotFound = (field: string) => `Cannot find ${field}`;

export const messageDeleted = (field: string) => `Deleted ${field} successfully`;

export const messageExisted = (field: string) => `${field} already exists`;

export const messageUser = {
  USER_LOGIN_FAILED: "Login failed, please check your email and password",
  USER_REGISTER_FAILED: "Registration failed, please try again",
  USER_REGISTER_SUCCESS: "Registered successfully",
  USER_LOGOUT_SUCCESS: "Logout successfully",
  OAUTH_MISSING_DATA: "Missing required data from OAuth provider",
}

export const messageProduct = {
  PRODUCT_NOT_FOUND: "Product not found",
  PRODUCT_DELETED: "Product deleted successfully",
  PRODUCT_CREATED: "Product created successfully",
  PRODUCT_UPDATED: "Product updated successfully",
  QUANTITY_INVALID: "Quantity must be greater than 0",
  MISSING_SEARCH_KEYWORD: "Missing search keyword",
};

export const messageCart = {
  CART_EMPTY: "Cart is empty",
  CART_CLEARED: "Cart cleared successfully",
  CART_UPDATED: "Cart updated successfully",
  CART_ADD_SUCCESS: "Product added to cart successfully",
};

export const messageOrder = {
  ORDER_NOT_FOUND: "Order not found",
  ORDER_PLACED: "Order placed successfully",
  ORDER_UPDATED: "Order updated successfully",
  ORDER_RETRIEVED: "Orders retrieved successfully",
  NO_PRODUCTS: "No products in order",
  PLACED_SUCCESS: "Order placed successfully",
};

export const messagePayment = {
  PAYMENT_SUCCESS: "Payment successful",
  PAYMENT_FAILED: "Payment failed",
  INVALID_PAYMENT_METHOD: "Invalid payment method",
  NO_MATCHING_ORDER: "No matching order found",
  WEBHOOK_FAILED: "Webhook processing failed",
};