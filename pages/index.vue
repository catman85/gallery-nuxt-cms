<!-- ATTENTION asyncData only works in pages, not components or layout -->
<!-- // https://nuxtjs.org/faq/async-data-components/ -->
<!-- TODO: 
wait on imgut uploader
order of photos

mansory_layout
style_markdown_content 
google_fonts
font-awesome

data-entry

lazy_load
meta_content
deploy_minifications_compress_images 
analytics 
domain_link 
robots.txt sitemap.xml ggl_search_console -->
<template>
  <div class="container">
    <!-- <h1>{{ t('welcome') }}</h1>  -->
    <!-- <h1>TEST</h1> -->
    <div class="filters">
    <div class="artwork">
      <h2>{{ t('artwork') }}</h2>
      <ul>
        <li @click="pickCategory" v-for="entry in categories" :key="entry">
          <!-- <nuxtdown-body class="body" :body="" /> -->
          {{entry}}
        </li>
        <li>1</li>
        <li>on-wood</li>
      </ul>
    </div>

    <div class="exhibit">
      <h2>{{ t('exhibitions') }}</h2>
      <ul>
        <li @click="pickCategory">Solo-{{ t('exhibitions') }}</li>
        <li @click="pickCategory">Group-{{ t('exhibitions') }}</li>
      </ul>
    </div>
    </div>

    <br>
    <!-- Search -->
    <!-- you can put a function between the "" -->
    <form v-on:submit.prevent="">
      <!--referenced by this.$route.query 2-way data binding with v-model -->
      <input type="text" v-model="query" id="search" :placeholder="t('search')">
    </form>
    <br>


    <div v-for="page in filteredContent" :key="page.title">
      <nuxt-link :to="page.title | formatLink">
        <!-- <nuxt-link :to="localePath({name: 'test',params:{}})"> -->
        <!-- <h3>{{ $t('title') }}:</h3> -->
        <nuxtdown-body class="body" :body="page.title" />

        <h3>Featured Image:</h3>
        <img :src="page.featuredImage" alt="">
        <!-- <nuxtdown-body class="body" :body="page.featuredImage" /> -->

        <h4>Category:</h4>
        <nuxtdown-body class="body" :body="page.category" />

        <h4>Date:</h4>
        <!-- <nuxtdown-body class="body" :body="page.creationDate" /> -->
        {{page.creationDate}}

      </nuxt-link>
      <br><br><br>
    </div>
  </div>
</template>

<script>
  // import MyHeader from "@/components/MyHeader";
  export default {
    // components: {
    // MyHeader
    // },
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
      // $emit method will propagate data to receiver components
      this.$nuxt.$emit('index', this.pages); // receiver is MyHeader

      // $on method will receive the data from the sender component
      this.$nuxt.$on('en', (english) => { // sender is MyHeader
        // your code goes here
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
    data: function () {
      return {
        selectedCat: "",
        query: "",
        hello: ""
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
        //Toggle Categories
        var filteredContent = this.pages.filter(page => {
          return page.category.toLowerCase().includes(this.selectedCat.toLowerCase());
        });
        //Search
        filteredContent = filteredContent.filter(post => {
          return post.title.toLowerCase().includes(this.query.toLowerCase());
        });
        filteredContent = filteredContent.sort(function (a, b) {
          return b.creationDate.replace(/-/g, "") - a.creationDate.replace(/-/g, "");
        });
        return filteredContent;
      }
    },
    methods: {
      pickCategory(event) {
        let option = event.target.firstChild.data.trim();
        if (option == this.selectedCat) { // show all posts when unchecking a category
          this.selectedCat = "";
        } else {
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
