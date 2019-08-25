<!-- ATTENTION asyncData only works in pages, not components or layout -->
<!-- // https://nuxtjs.org/faq/async-data-components/ -->
<!-- TODO: 
black lightgallery bug fix
right arrow goes down masonry bug

domain_link 
analytics 
robots.txt sitemap.xml ggl_search_console -->
<template>
  <div class="container">
    <hr>
    <div class="row">
      <p>{{this.paragraph}}</p>
    </div>
    <div class="filters">
      <div class="artwork">
        <h2>{{ t('artworks') }}</h2>
        <ul>
          <li @click="pickCategory" v-for="entry in categories" :key="entry">
            <!-- <nuxtdown-body class="body" :body="" /> -->
            {{entry}}
          </li>
        </ul>
      </div>

      <div class="exhibit">
        <h2>{{ t('exhibitions') }}</h2>
        <ul>
          <li @click="pickCategory">Solo-{{ t('exhibitions') }}</li>
          <li @click="pickCategory">Group-{{ t('exhibitions') }}</li>
          <!-- <li @click="pickCategory">Solo-Exhibitions</li> -->
          <!-- <li @click="pickCategory">Group-{{ t('exhibitions') }}</li> -->
        </ul>
      </div>
    </div>

    <!-- <br> -->
    <!-- Search -->
    <!-- you can put a function between the "" -->
    <form v-on:submit.prevent="">
      <!--referenced by this.$route.query 2-way data binding with v-model -->
      <input type="text" v-model="query" id="search" :placeholder="t('search')">
    </form>
    <br>

    <masonry class="masonry" :cols="{default: 3,700: 2}" :gutter="15">
      <div v-vpshow v-for="page in filteredContent" :key="page.title">
        <nuxt-link v-if="page" :to="page.title | formatLink">
          <!-- <nuxt-link :to="localePath({name: 'test',params:{}})"> -->
          <!-- <h3>{{ $t('title') }}:</h3> -->
          <!-- <nuxtdown-body class="body" :body="page.title" /> -->

          <!-- <h3>Featured Image:</h3> -->
          <lazy-component>
          <img v-lazy="page.featuredImage" alt="">
          </lazy-component>
          <!-- <nuxtdown-body class="body" :body="page.featuredImage" /> -->

          <!-- <h4>Category:</h4> -->
          <!-- <nuxtdown-body class="body" :body="page.title" /> -->
          <!-- <nuxtdown-body class="cat" :body="page.category" /> -->
          <div class="cat">
             <!-- | {{page.category}} -->
            {{ page.head}}
          </div>

          <!-- <h4>Date:</h4> -->
          <!-- <nuxtdown-body class="body" :body="page.creationDate" /> -->
          <!-- {{page.creationDate}} -->

        </nuxt-link>
      </div>
    </masonry>
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
      // this.$nuxt.$emit('index', this.pages); // receiver is MyHeader

      // $on method will receive the data from the sender component
      // this.$nuxt.$on('en', (english) => { // sender is MyHeader
        // your code goes here
      // })
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
          .getAll(),
        paragraphs: await app.$content('/text')
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
        // ATTENTION if you get "Request failed with status code 404"
        // you probably need to configure something here...
        if (!link) return ''
        link = link.toString();
        // link = link.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''); // remove all special characters
        link = link.replace(/[`!@#$%^&*()|+\=?;:'",.<>\{\}\[\]\\\/]/gi, ''); // remove all special characters except the ones netlify cms understands - _
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
      paragraph: function () {
        let para;
        this.paragraphs.forEach(par => {
          // console.debug(par.title + " " + par.text);
          if(par.title == "Kentrikh"){
            if (this.$store.state.lang == "en") {
              para = par.textEn;
            }else{
              para = par.textGr;
            }
            // ATTENTION you can't return or break here
          }
        })
        return para;
      },
      filteredContent: function () {
        //Toggle Categories
        var filteredContent = this.pages.filter(page => {
          return page.category.toLowerCase().includes(this.selectedCat.toLowerCase());
        });
        //Search
        filteredContent = filteredContent.filter(post => {
          return post.head.toLowerCase().includes(this.query.toLowerCase());
        });
        // sort by date
        filteredContent = filteredContent.sort(function (a, b) {
          return b.creationDate.replace(/-/g, "") - a.creationDate.replace(/-/g, "");
        });
        return filteredContent;
      }
    },
    methods: {
      pickCategory(event) { // handles coloring
        let option = event.target.firstChild.data.trim();
        option = option.replace("Εκθέσεις","Exhibitions");
        // event.target.parent.classList.remove("selected");
        // let siblings = event.target.parentNode.children;
        this.clearSelectionColors(); // removes selected class
        if (option == this.selectedCat) { // show all posts when unchecking a category
          this.selectedCat = "";
        } else {
          this.selectedCat = option;
          event.target.classList.add("selected"); // start css effect
        }

        // if there is only one page after the filtering, redirect to that page
        if(this.filteredContent.length == 1){
          // window.location.href="/"+option;
          this.$nuxt.$router.replace({ path: '/'+ option })
        }
      },
      clearSelectionColors() { // gets all li elements and removes the selected class
        let lis = document.querySelectorAll("li");
        // console.debug(lis);
        for (let i = 0; i < lis.length; i++) {
          lis.item(i).classList.remove("selected");
          // li.classList.remove("selected");
        }
      }
    },
    beforeDestroy() {
      // $off method turns off the event listner
      this.$nuxt.$off('en');
    }
  };

</script>
