module.exports = {
  routes: [
    {
      method: "POST",
      path: "/custom-api/get-product-details",
      handler: "custom-api.getProductDetails",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/custom-api/make-pdf",
      handler: "custom-api.makePDF",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
