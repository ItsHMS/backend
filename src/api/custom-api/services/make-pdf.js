"use strict";

const { default: axios } = require("axios");

// const axios = require("axios");

module.exports = () => ({
  async makePDF(ctx) {
    try {
      global.window = {
        document: {
          createElementNS: () => {
            return {};
          },
        },
      };
      global.navigator = {};
      global.html2pdf = {};
      global.btoa = () => {};

      // var fs = require('fs');
      var pdf = require("jspdf");
      var data = new FormData();

      pdf.text("Hello world", 10, 10);

      img =
        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-W60FxQ9fgi4JTjPbKIquU7Z7/user-omX2lhNibGLUg8Eowns8VTdA/img-sv9ut9egQDMrLii9uvNjzv4S.png?st=2023-03-12T04%3A05%3A59Z&se=2023-03-12T06%3A05%3A59Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-12T03%3A31%3A44Z&ske=2023-03-13T03%3A31%3A44Z&sks=b&skv=2021-08-06&sig=38OCjls3Kwn7BStciEkKTnpjRX1ZNsJ%2B1aLLHM%2BKhOA%3D";
      pdf.addImage(img, "PNG", 10, 200, 100, 100);

      // doc.html("<button>abcd</button>")

      console.log(pdf.getLineHeight());
      var temp = pdf.output("blob");
      var data = new FormData();
      data.append("files", temp);
      console.log(data);
      // console.log(data);
      const res = await axios.post("http://localhost:1337/api/upload", data);
      delete global.window;
      delete global.html2pdf;
      delete global.navigator;
      delete global.btoa;
      return res.data;
    } catch (error) {
      console.log("inside findall erro.....", error);
      throw error;
    }
  },
});
