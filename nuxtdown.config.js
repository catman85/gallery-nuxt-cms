module.exports = {
  api: function(isStatic) {
    const baseURL = "http://localhost:3000";
    const browserBaseURL = !isStatic ? "" : process.env.BASE_URL;

    return {
      baseURL,
      browserBaseURL
    };
  },
  content: [
    [
      "pages",
      {
        page: "/page/_page",
        permalink: "/:slug",
        isPost: false
      }
    ],
    // [ // FIXME: I don't know what I am doing
    //   "categories",
    //   {
    //     category: "/page/_page",
    //     permalink: "/:slug",
    //     isPost: false
    //   }
    // ]
  ]
};
