'use strict';

/**
 * A set of functions called "actions" for `custom-api`
 */

module.exports = {
  getProductDetails: async (ctx, next) => {
    try {
      ctx.body = await strapi
        .service("api::custom-api.get-product-details")
        .getProductDetails(ctx);
    } catch (err) {
      ctx.response.badRequest(err);
    }
  },
  getAllPdfs: async (ctx, next) => {
    try {
      ctx.body = await strapi
        .service("api::custom-api.get-all-pdfs")
        .getAllPdfs(ctx);
    } catch (err) {
      ctx.response.badRequest(err);
    }
  },
};
