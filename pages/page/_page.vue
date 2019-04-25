<template>
  <div>
            <h3>Title:</h3>
        <nuxtdown-body class="body" :body="page.title" />

        <h4>Category:</h4>
        <nuxtdown-body class="body" :body="page.category" />
    <div class="images">
            <h3>Body:</h3>
        <nuxtdown-body class="body" :body="page.body" />
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
    mounted(){
      console.debug(this.page.body);
    }
  };

</script>

<style scoped>
  .images{
    /* max-width: 1em; */
  }
</style>

