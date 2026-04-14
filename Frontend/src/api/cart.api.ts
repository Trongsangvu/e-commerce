const cartEndpoints = {
  getCart: "/cart",
  addToCart: "/cart/add",
  byId: (id: string) => `/cart/${id}`,
  updateCart: "/cart/update",
};

export default cartEndpoints;
