<template>
  <div>
    <div class="fixedContact">
      <nuxt-link :to="'/contact'">
        <ul>
        <li><Chat/></li>
        <li><div>{{t('contact')}}</div></li>
        </ul>
      </nuxt-link>
    </div>
    <hr>
    <br>
    <footer>Developed by <a href="https://www.github.com/catman85/">Dimitris</a> | <nuxt-link :to="'/legal'">
        {{ t('legal')}}</nuxt-link> | © {{this.getCurrentYear()}}</footer>
  </div>
</template>

<script>
import Chat from "@/components/ChatIcon.vue";

  export default {
    name: "MyFooter",
    components: {
      Chat
    },
    methods: {
      getCurrentYear() {
        return new Date().getFullYear();
      }
    }
  }
</script>

<style>

</style>