<template>
  <div class="container">
    <h2>WelcomeF</h2>
    <h2>All Posts</h2>
    <br>
    <div v-for="content in contentPreview" :key="content.title">
      <!-- <div @click="show" >{{content.body}}</div> -->
      <h3>Title:</h3><nuxtdown-body class="body" :body="content.title" />
      <h3>Body:</h3><nuxtdown-body class="body" :body="content.body" />
      <br>
    </div>

    <!-- {{contentPreview}} -->
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
        contentPreview: await app.$content('/pages')
          .query({
            // exclude: ['attributes', 'body']
          })
          .getAll()
      };
    },
    updated() {
      console.debug(contentPreview);
    },
    methods: {
      show(){
        // console.log(this);
      }
    }
  };

</script>
