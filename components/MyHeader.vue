<template>
  <header>
    <h2 @click="show">anthia art</h2>
    <nav>
      <ul>
        <li>
          <nuxt-link :to="'/'">Home</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="'/page-1'">Page 1</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="'/page-2'">Page 2</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="'/about'">About</nuxt-link>
        </li>
      </ul>
      <!-- {{categories}} -->
      <!-- {{pages}} -->
      <ul>
        <!-- <li v-for="category in categories" :key="category.title">
          <nuxtdown-body class="body" :body="category.title" />
          {{category.title}}
        </li> -->
      </ul>
    </nav>
  </header>
</template>

<script>
  export default {
    name: "MyHeader",
    // data: function () {
    //   return {
    //     categories: ''
    //   }
    // },
    // asyncData: async ({
    //   app,
    //   route,
    //   payload
    // }) => {
    //   return {
    //     categories: await app.$content('/categories')
    //       .query({
    //         // exclude: ['attributes', 'body']
    //       })
    //       .getAll(),
    //       // pages: await app.$content('/pages')
    //       // .query({
    //       //   // exclude: ['attributes', 'body']
    //       // })
    //       // .getAll()
    //   };
    // },
    methods: {
      show(){
        console.log(categories)
      }
    }
  }

</script>

<style>

</style>
