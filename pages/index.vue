<!-- ATTENTION asyncData only works in pages, not components or layout -->
<!-- // https://nuxtjs.org/faq/async-data-components/ -->
<!-- TODO: 
photoswipe.js_lightgallery.js_slideshow 
img_descriptions
form_search 
contact_form
mansory_layout
i18n_multi_languages_translate_btn
header_burger_responsive 
configure_scss
style_markdown_content 
google_fonts
font-awesome
meta_content
deploy_minifications_compress_images 
analytics 
domain_link 
robots.txt sitemap.xml ggl_search_console -->
<template>
  <div class="container">
    <h2>Categories</h2>
    <ul>
      <li @click="pickCategory" v-for="entry in categories" :key="entry">
        <!-- <nuxtdown-body class="body" :body="" /> -->
        {{entry}}
      </li>
    </ul>
    <br>
    <h2>Exhibitions</h2>
    <ul>
      <li @click="pickCategory">Solo-Exhibitions</li>
      <li @click="pickCategory">Group-Exhibitions</li>
    </ul>
    <br>
    <h2>All Posts</h2>
    <div v-for="page in filteredContent" :key="page.title">
      <!-- TODO: order of posts is alphabetical? -->
      <nuxt-link :to="page.title | formatLink">
        <h3>Title:</h3>
        <nuxtdown-body class="body" :body="page.title" />
        <h3>Featured Image:</h3>
        <img :src="page.featuredImage" alt="">
        <nuxtdown-body class="body" :body="page.featuredImage" />
        <h4>Category:</h4>
        <nuxtdown-body class="body" :body="page.category" />
      </nuxt-link>
      <br><br><br>
    </div>
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
    data: function(){
      return {
        selectedCat: ""
      }
    },
    filters: {
      formatLink: function (link) {
        if (!link) return ''
        link = link.toString();
        link = link.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''); // remove all special characters
        link = link.trim(); // remove spaces from beginning and end.
        link = link.replace(/ /g, "-"); //   / /g is a global replacement of the space character with dash
        return link.toLowerCase();
      }
    },
    computed: {
      categories: function () {
        let cats = [];
        this.pages.forEach(page => {
          let cat = page.category;
          if (cat.toLowerCase() != 'solo-exhibitions' && cat.toLowerCase() != 'group-exhibitions') {
            cats.push(cat);
          }
        });
        // cats = [...new Set(cats)]; // removes duplicates from cats array
        cats = this.uniq(cats); // removes duplicates from cats array (plugin mixin)
        return cats;
      },
      filteredContent: function () {
        var filteredContent = this.pages.filter(page => {
          return page.category.toLowerCase().includes(this.selectedCat.toLowerCase());
        });
        return filteredContent;
      }
    },
    methods: {
      pickCategory(event) {
        let option = event.target.firstChild.data.trim();
        if(option == this.selectedCat){ // show all posts when unchecking a category
          this.selectedCat = "";
        }else{
          this.selectedCat = option;
        }
      }
    },
    beforeDestroy() {
      // $off method turns off the event listner
      this.$nuxt.$off('en');
    }
  };

</script>
