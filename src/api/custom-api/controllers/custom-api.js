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
  makePDF: async (ctx, next) => {
    try {
      ctx.body = await strapi
        .service("api::custom-api.make-pdf")
        .makePDF(ctx);
    } catch (err) {
      ctx.response.badRequest(err);
    }
  },
};
