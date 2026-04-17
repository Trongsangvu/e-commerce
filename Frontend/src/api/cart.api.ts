const cartEndpoints = {
  getCart: "/cart",
  addToCart: "/cart/add",
  byId: (id: string) => `/cart/${id}`,
};

export default cartEndpoints;
