export const routes = {
  home: "/",

  cart: "/cart",

  login: "/login",
  register: "/register",

  products: "/products",
  productDetail: "/products/:id",

  account: "/account",

  checkout: "/checkout",

  shop: "/shop",

  features: "/features",

  blog: "/blog",

  about: "/about",

  contact: "/contact",

  oauthSuccess: "/oauth-success",
};

export const routes_gen = {
  productDetail: (id: string) => `/products/${id}`
};

export type Routes = typeof routes;
