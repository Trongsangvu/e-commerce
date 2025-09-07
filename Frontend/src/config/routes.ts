const routes = {
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

export type Routes = typeof routes;
export default routes;
