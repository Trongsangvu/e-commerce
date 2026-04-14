const productEndpoints = {
  list: "/products",
  byId: (id: string) => `/products/${id}`,
  search: "/products/search",
};

export default productEndpoints;
