<template>
  <header>
    <h2 @click="show">anthia art</h2>
    <nav>
      <ul>
        <li>
          <nuxt-link :to="'/'">Home</nuxt-link>
        </li>
        <!-- <li>
          <nuxt-link :to="'/page-1'">Page 1</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="'/page-2'">Page 2</nuxt-link>
        </li> -->
        <li>
          <nuxt-link :to="'/about'">About</nuxt-link>
        </li>
      </ul>
      <br>
      <ul>
        <li @click="en">EN</li>
        <li @click="gr">GR</li>
      </ul>
      <!-- {{categories}} to trigger the computed -->
    </nav>
  </header>
</template>

<script>
  export default {
    name: "MyHeader",
    props: {
      // data: Object
    },
    mounted() {
      this.$nuxt.$on('index', (data) => {
        // console.debug(data); // runs only when this component is loaded on top of index
      })
    },
    data: function () {
      return {
        // categories: Object
        english: true
      }
    },
    methods: {
      show() {
        // console.log(categories)
      },
      en() {
        console.log("english");
        this.english = true;
        this.$nuxt.$emit('en', this.english);
      },
      gr() {
        console.log("greek");
        this.english = false;
        this.$nuxt.$emit('gr', this.english);
      }

    },
    beforeDestroy() {
      // $off method turns off the event listner
      this.$nuxt.$off('index');
    },
  }

</script>

<style>

</style>
