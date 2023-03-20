"use strict";

// const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");

module.exports = () => ({
  async getProductDetails(ctx) {
    try {
      let type = ctx.request.body.type;
      console.log(type);
      let end = "";
      if (ctx.request.body?.color?.length) {
        let colors = ctx.request.body?.color;
        let materials = ctx.request.body?.material;
        let inspirations = ctx.request.body?.inspiration;
        console.log(colors);
        let colorStr = "it must be ";
        let materialStr = " and material should be ";
        let inspirationStr = " and inspiration ";
        colors.forEach((color, i) => {
          if (colors.length > 1 && i === colors.length - 1) {
            colorStr += ` and ${color} `;
          } else if (i === 0) {
            colorStr += ` ${color} `;
          } else {
            colorStr += `, ${color} `;
          }
        });
        materials.forEach((material, i) => {
          if (materials.length > 1 && i === materials.length - 1) {
            materialStr += ` and ${material} `;
          } else if (i === 0) {
            materialStr += ` ${material} `;
          } else {
            materialStr += `, ${material} `;
          }
        });
        inspirations.forEach((inspiration, i) => {
          if (inspirations.length > 1 && i === inspirations.length - 1) {
            inspirationStr += ` and ${inspiration} `;
          } else if (i === 0) {
            inspirationStr += ` ${inspiration} `;
          } else {
            inspirationStr += `, ${inspiration} `;
          }
        });
        end = colorStr + materialStr + inspirationStr;
        console.log(inspirationStr);
      }
      let prompt = `Generate product images with the following title "${ctx.request.body.title}" and specifications "${ctx.request.body.specification}" ${end}`;
      console.log(prompt);
      const configuration = new Configuration({
        apiKey: "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",
      });
      const openai = new OpenAIApi(configuration);
      if (type == "image") {
        const response = await openai.createImage({
          prompt: prompt.trim(),
          n: 4,
          size: "256x256",
          user: "user1234",
          response_format: "b64_json",
        });
        return response.data;
      } else {
        prompt = `Generate product requirements with the following title "${ctx.request.body.title}" and specifications "${ctx.request.body.specification}" ${end}`;
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: prompt,
          temperature: 0.6,
          max_tokens: 150,
          top_p: 1,
          frequency_penalty: 1,
          presence_penalty: 1,
        });
        return response.data;
      }

      // return prompt.trim();
    } catch (error) {
      console.log("inside findall erro.....", error);
      throw error;
    }
  },
});
