<template>
  <header>
    <nuxt-link :to="'/'" id="logo">
      <Logo></Logo>
    </nuxt-link>
    <!-- @blur.native is only for input elements -->
    <nav ref="nav" v-click-outside="closeMenu">
      <a @click="toggleMenu" id="menu-icon">
        <Burger /></a>
      <ul>
        <li>
          <nuxt-link :to="'/'">{{ t('home')}}</nuxt-link>
          <!-- <nuxt-link :to="'/'">home</nuxt-link> -->
        </li>
        <li>
          <nuxt-link :to="'/acts'">{{ t('acts')}}</nuxt-link>
          <!-- <nuxt-link :to="'/contact'">contact</nuxt-link> -->
        </li>
        <li>
          <nuxt-link :to="'/videos'">{{ t('videos')}}</nuxt-link>
          <!-- <nuxt-link :to="'/contact'">contact</nuxt-link> -->
        </li>
        <li>
          <nuxt-link :to="'/bio'">{{ t('bio')}}</nuxt-link>
          <!-- <nuxt-link :to="'/about'">about</nuxt-link> -->
        </li>
        <li>
          <nuxt-link :to="'/contact'">{{ t('contact')}}</nuxt-link>
          <!-- <nuxt-link :to="'/contact'">contact</nuxt-link> -->
        </li>
      </ul>
      <ul class="languages">
        <!-- <nuxt-link v-on:click.native="gr" :to="switchLocalePath('gr')">GR</nuxt-link> -->
        <!-- <nuxt-link v-on:click.native="en" :to="switchLocalePath('en')">EN</nuxt-link> -->

        <li v-on:click="gr">GR</li>
        <li id="seperator">|</li>
        <li v-on:click="en">EN</li>
        
      </ul>
      <!-- {{categories}} to trigger the computed -->
    </nav>
  </header>
</template>

<script>
  import Logo from "@/components/Logo.vue";
  import Burger from "@/components/Burger.vue";
  // import vClickOutside from 'v-click-outside';
  export default {
    name: "MyHeader",
    props: {
      // data: Object
    },
    components: {
      Logo,
      Burger
    },
    watch: {
      $route(to, from) {
        this.closeMenu();
      }
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
        // console.debug("english");
        this.english = true;
        this.$nuxt.$emit('en', this.english);
        this.$store.commit('SET_LANG', 'en');
        this.closeMenu();
      },
      gr() {
        // console.debug("greek");
        this.english = false;
        this.$nuxt.$emit('gr', this.english);
        this.$store.commit('SET_LANG', 'gr');
        this.closeMenu();
      },
      toggleMenu() {
        let nav = this.$refs.nav;
        // let nav = document.querySelector("nav");
        if (nav.classList.contains("open")) {
          nav.classList.remove("open");
        } else {
          nav.classList.add("open");
        }
      },
      closeMenu() {
        let nav = this.$refs.nav;
        nav.classList.remove("open");
      }
    },
    beforeDestroy() {
      // $off method turns off the event listner
      this.$nuxt.$off('index');
    }
  }
</script>
