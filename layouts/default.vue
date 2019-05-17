<template>
  <div>
    <!-- ATTENTION asyncData only works in pages, not components nor layout -->
    <!-- to send data from any component to any component in mounted.... this.$nuxt.$emit('index', this.pages);-->
    <!-- instead of Parent -> Child props.....   :data="this.pages" -->
    <MyHeader />
    <nuxt/>
    <MyFooter/>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";
import MyFooter from "@/components/MyFooter";
export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>


<style lang="scss" src="@/assets/scss/main.scss">
// ATTENTION these don't do anything if you use src
// html {
//   // font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
//   //   Roboto, "Helvetica Neue", Arial, sans-serif;
//   // font-family: Roboto;
//   font-size: 16px;
//   word-spacing: 1px;
//   -ms-text-size-adjust: 100%;
//   -webkit-text-size-adjust: 100%;
//   -moz-osx-font-smoothing: grayscale;
//   -webkit-font-smoothing: antialiased;
//   box-sizing: border-box;
// }

// *,
// *:before,
// *:after {
//   box-sizing: border-box;
//   margin: 0;
// }

// .button--green {
//   display: inline-block;
//   border-radius: 4px;
//   border: 1px solid #3b8070;
//   color: #3b8070;
//   text-decoration: none;
//   padding: 10px 30px;
// }

// .button--green:hover {
//   color: #fff;
//   background-color: #3b8070;
// }

// .button--grey {
//   display: inline-block;
//   border-radius: 4px;
//   border: 1px solid #35495e;
//   color: #35495e;
//   text-decoration: none;
//   padding: 10px 30px;
//   margin-left: 15px;
// }

// .button--grey:hover {
//   color: #fff;
//   background-color: #35495e;
// }
</style>
