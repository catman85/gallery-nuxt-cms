<template>
  <div>
    <h3>Title:</h3>
    <nuxtdown-body class="body" :body="page.title" /><br>
    <h4>Category:</h4>
    <nuxtdown-body class="body" :body="page.category" /><br>
    <h4>Description:</h4>
    <nuxtdown-body class="body" :body="page.description" /><br>
    <h4>Featured Image: </h4>
    <img :src="page.featuredImage" alt=""/><br>

    <div class="images">
      <h3>Body:</h3>
      <nuxtdown-body class="body" :body="page.body" />
    </div>
    <!-- <no-ssr>
  <LightGallery ... />
</no-ssr> -->
    <div class="app-container">
      <div id="lightgallery">
        <a href="https://dzine.io/products/lightgallery-wp-plugin/static/images/demo/image-6-lg.jpg">
          <img src="https://dzine.io/products/lightgallery-wp-plugin/static/images/demo/thumb-6.jpg">
        </a>
        <!-- thinks br is an image -->
        <br>
        <a href="https://dzine.io/products/lightgallery-wp-plugin/static/images/demo/image-12-lg.jpg">
          <img src="https://dzine.io/products/lightgallery-wp-plugin/static/images/demo/thumb-12.jpg">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    head: function () {
      return {
        title: `${this.page.title}`,
        meta: [{
          hid: "description",
          name: "description",
          content: this.page.description
        }]
      };
    },
    asyncData: async ({
      app,
      route,
      payload
    }) => {
      return {
        page: (await app.$content("/pages").get(route.path)) || payload
      };
    },
    mounted() {
      console.debug(this.page.body);
      const el = document.getElementById('lightgallery')
      window.lightGallery(el)
    }
  };

</script>

<style scoped>
</style>
