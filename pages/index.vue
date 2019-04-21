<template>
  <div class="container">
    <h2>WelcomeF</h2>
    <h2>All Posts</h2>
    <br>
    <div v-for="page in pages" :key="page.title">
      <h3>Title:</h3>
      <nuxtdown-body class="body" :body="page.title" />
      <h3>Body:</h3>
      <nuxtdown-body class="body" :body="page.body" />
      <br>
    </div>
    <!-- {{pages}} -->
    
    <!-- TODO: 
    mint_setup vue_nuxt_nuxtdown nuxtent
    meta_content header footer mansory_layout slideshow filters iterate_markdown 
    categories_nuxtdown_cms_header
    style_markdown_content bulma google_fonts
    img_descriptions git_lfs form search translate_btn
    deploy_minifications compress_images font-awesome vuetify
    analytics
    domain_link robots.txt sitemap.xml ggl_search_console -->
  </div>
</template>

<script>
  export default {
    head: function () {
      return {
        title: "Home",
        meta: [{
          hid: "description",
          name: "description",
          content: "An art gallery"
        }]
      };
    },
    asyncData: async ({
      app,
      route,
      payload
    }) => {
      return {
        pages: await app.$content('/pages')
          .query({
            // exclude: ['attributes', 'body']
          })
          .getAll()
      };
    },
  };

</script>
