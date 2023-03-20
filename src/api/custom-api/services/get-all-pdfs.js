"use strict";

const { default: axios } = require("axios");

// const axios = require("axios");

module.exports = () => ({
  async getAllPdfs(ctx) {
    try {
      console.log("inside pdf");
      let userID = ctx.state.user.id;
      // let userID = 2;

      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        userID
      );
      let pdfs = user.pdfs;
      if (!pdfs && !ctx?.query?.pdfID) {
        return "No PDF Found";
      }
      if (ctx?.query?.pdfID) {
        if (!pdfs) {
          pdfs = [];
        }
        pdfs.push(parseInt(ctx?.query?.pdfID));
      }
      console.log(pdfs);

      const updateduser = await strapi.entityService.update(
        "plugin::users-permissions.user",
        userID,
        {
          data: {
            pdfs: pdfs,
          },
        }
      );
      console.log(user);
      console.log(updateduser);
      let reversedPDFarray = updateduser.pdfs.reverse()
      let pdfsArray = await Promise.all(
        reversedPDFarray.map(async (pdfid) => {
          console.log(pdfid);
          return await strapi.entityService.findOne(
            "plugin::upload.file",
            pdfid
          );
        })
      );
      // const entry = await strapi.entityService.findMany("plugin::upload.file");
      /**
       * 1.fetch particular user using ctx.state.user.id
       * 2.take pdfs field from entry result
       * 3.append the pdf by the getting id from params and update
       * 4.promis.all on the array of pdfs
       * 5.give back the array
       */
      /**
       * 1.if logged in then add dont do any thing except adding the file id in storage and then send it as params
       */

      return { pdfsArray };
    } catch (error) {
      console.log("inside findall erro.....", error);
      throw error;
    }
  },
});
