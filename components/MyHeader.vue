<template>
  <header>
    <h2 @click="show">anthia art</h2>
    <nav>
      <ul>
        <li>
          <nuxt-link :to="'/'">{{ $t('home')}}</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="'/about'">{{ $t('about')}}</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="'/contact'">{{ $t('contact')}}</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="'/legal'">{{ $t('legal')}}</nuxt-link>
        </li>
      </ul>
      <br>
      <ul>
      <nuxt-link v-on:click.native="gr" :to="switchLocalePath('gr')">GR</nuxt-link>
      <nuxt-link v-on:click.native="en" :to="switchLocalePath('en')">EN</nuxt-link>
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
        console.debug("english");
        this.english = true;
        this.$nuxt.$emit('en', this.english);
      },
      gr() {
        console.debug("greek");
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
