<template>
  <div class="container">
    <h2>Welcome</h2><br>
    <h2>Categories</h2>
    <ul>
      <li v-for="entry in categories" :key="entry">
        <!-- <nuxtdown-body class="body" :body="" /> -->
        {{entry}}
      </li>
    </ul>
    <br>
    <h2>All Posts</h2>
    <div v-for="page in pages" :key="page.title">
      <!-- TODO: order of posts is alphabetical? -->
      <nuxt-link :to="page.title | formatLink">
        <h3>Title:</h3>
        <nuxtdown-body class="body" :body="page.title" />
        <h3>Body:</h3>
        <nuxtdown-body class="body" :body="page.body" />
        <h4>Category:</h4>
        <nuxtdown-body class="body" :body="page.category" />
      </nuxt-link>
      <br>
    </div>

    <!-- ATTENTION asyncData only works in pages, not components or layout -->
    <!-- // https://nuxtjs.org/faq/async-data-components/ -->
    <!-- TODO: 
    configure_scss
    photoswipe.js_lightgallery.js_slideshow mansory_layout
    i18n_multi_languages_translate_btn
    header_burger_responsive footer   
    categories_nuxtdown_cms_header_filters
    style_markdown_content google_fonts
    img_descriptions git_lfs form search 
    font-awesome vuetify

    clear_package.json
    meta_content
    deploy_minifications_compress_images analytics domain_link 
    robots.txt sitemap.xml ggl_search_console -->
  </div>
</template>

<script>
  // import MyHeader from "@/components/MyHeader";
  export default {
    components: {
      // MyHeader
    },
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
    mounted() {
      // this.uniq({});
      // $emit method will propagate data to receiver components
      this.$nuxt.$emit('index', this.pages); // receiver is MyHeader

      // $on method will receive the data from the sender component
      this.$nuxt.$on('en', (english) => { // sender is MyHeader
        // your code goes here
        console.debug("english selected" + english);
      })
    },
    asyncData: async ({
      app,
      route,
      payload
    }) => {
      return {
        pages: await app.$content('/pages')
          .query({
            // exclude: ['attributes', 'body']
          })
          .getAll()
      };
    },
    filters: {
      formatLink: function (link) {
        if (!link) return ''
        link = link.toString();
        link = link.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');// remove all special characters
        link = link.trim(); // remove spaces from beginning and end.
        link = link.replace(/ /g,"-"); //   / /g is a global replacement of the space character with dash
        return link.toLowerCase();
      }
    },
    computed: {
      categories: function () {
        let cats = [];
        this.pages.forEach(page => {
          cats.push(page.category);
        });
        // cats = [...new Set(cats)]; // removes duplicates from cats array
        cats = this.uniq(cats); // removes duplicates from cats array (plugin mixin)
        return cats;
      }
    },
    beforeDestroy() {
      // $off method turns off the event listner
      this.$nuxt.$off('en');
    }
  };

</script>
