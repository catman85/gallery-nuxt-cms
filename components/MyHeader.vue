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
      <!-- {{categories}} to trigger the computed -->
      <br>
      <ul>
        <li v-for="entry in categories" :key="entry.title">
          <!-- <nuxtdown-body class="body" :body="" /> -->
          {{entry.category}}
        </li>
        <!-- TODO: handle exhibitions and duplicates in categories -->
      </ul>
    </nav>
  </header>
</template>

<script>
  export default {
    name: "MyHeader",
    props: {
      data: Object
    },
    mounted(){ 

    },
    data: function () {
      return {
        // categories: Object
      }
    },
    methods: {
      show() {
        // console.log(categories)
      }
    },
    computed: {
      categories: function(){
        // this.data.forEach(page => {
        //   console.debug(page.category);
        // });
        return this.data;
      }
    }
  }

</script>

<style>

</style>
