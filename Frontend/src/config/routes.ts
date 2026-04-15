const ROUTES = {
  home: "/",
  cart: "/cart",
  login: "/login",
  register: "/register",
  products: "/products",
  productDetail: "/products/:id",
  profile: "/profile",
  checkout: "/checkout",
  shop: "/shop",
  features: "/features",
  blog: "/blog",
  about: "/about",
  contact: "/contact",
  oauthSuccess: "/oauth-success",
};

export type Routes = typeof ROUTES;
export default ROUTES;
