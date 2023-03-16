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
      method: "GET",
      path: "/custom-api/get-all-pdfs",
      handler: "custom-api.getAllPdfs",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
