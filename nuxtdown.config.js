module.exports = {
  api: function(isStatic) {
    const baseURL = "http://localhost:3000";
    const browserBaseURL = !isStatic ? "" : process.env.BASE_URL;

    return {
      baseURL,
      browserBaseURL
    };
  },
  content: [ // ATTENTION after messing with these you need to restart "npm run serve"
    [
      "pages",
      {
        page: "/page/_page",
        permalink: "/:slug",
        isPost: false
      }
    ],
    [
      "videos",
      {
        // makes videos.vue work? I don't know how...
        page: "/video/_video",
        permalink: "/:slug",
        isPost: false
      }
    ],
    [
      "text",
      {
        page: "/text/_text",
        permalink: "/:slug",
        isPost: false
      }
    ],
    [
      "links",
      {
        page: "/act/_act",
        permalink: "/:slug",
        isPost: false
      }
    ]
  ]
};
