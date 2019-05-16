<template>
  <div>
    <h3>Title:</h3>
    <nuxtdown-body class="body" :body="page.title" /><br>
    <h4>Category:</h4>
    <nuxtdown-body class="body" :body="page.category" /><br>
    <h4>Description:</h4>
    <!-- <nuxtdown-body class="body" :body="page.description" /><br> -->
    {{ this.description }}
    <h4>Featured Image: </h4>
    <img :src="page.featuredImage" alt="" /><br>

    <div class="images">
      <h3>Body:</h3>
      <!-- <nuxtdown-body class="body" :body="page.body" /> -->
      <!-- <no-ssr>  not needed </no-ssr> -->
      <div class="app-container">
        <div id="lightgallery">
          <a v-for="image in imagesArray" :key="image.src" :href="image.src"
            :data-sub-html="'.caption' + format(image.title)">
            <img :src="image.src" :title="image.title" :alt="image.alt">

            <!-- this must match with data-sub-html but there might be duplicates -->
            <!-- ATTENTION for some reason filters don't work -->
            <div :class="'description '+'caption'+ format(image.title)">
              <h5 class="current">{{image.title}}</h5>
              <!-- <p>{{image.alt}}</p> -->
            </div>
          </a>
        </div>
      </div>

    </div>


  </div>
</template>

<script>
  export default {
    // nuxtI18n: false,
    // nuxtI18n: {
    // paths: {
    // it: '/chi-siamo',
    // en: '/about'
    // }},
    head: function () {
      return {
        title: `${this.page.title}`,
        meta: [{
          hid: "description",
          name: "description",
          content: this.page.description
        }]
      };
    },
    asyncData: async ({
      app,
      route,
      payload
    }) => {
      return {
        page: (await app.$content("/pages").get(route.path)) || payload
      };
    },
    data: function () {
      return {
        imagesHTML: Object,
        imagesArray: Array
      }
    },
    async mounted() {
      await this.stringToHTML(this.page.body);
      await this.imagesToArray();
      this.startLightGallery('lightgallery');
    },
    computed: {
      description: function () {
        if (this.$store.state.lang == "en" || this.page.descriptionGr == "") {
          return this.page.descriptionEn;
        } else {
          return this.page.descriptionGr;
        }
      }
    },
    methods: {
      stringToHTML(s) {
        this.imagesHTML = document.createElement('div');
        this.imagesHTML.innerHTML = s;
      },
      imagesToArray() {
        this.imagesArray = this.imagesHTML.getElementsByTagName('img');
      },
      startLightGallery(id) {
        const el = document.getElementById(id)
        // http://sachinchoolur.github.io/lightGallery/docs/api.html
        window.lightGallery(el, {
          // getCaptionFromTitleOrAlt: true, //FIXME:
          hideBarsDelay: 700,
          // height: "70%",
          // width: "60%",
          // controls: false,
          // pullCaptionUp: false,
          // subHtmlSelectorRelative:true,
          // selector: '.current',
        })
      },
      format(title) {
        title = title.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''); // remove all special characters
        title = title.trim(); // remove spaces from beginning and end.
        title = title.replace(/ /g, "-"); //   / /g is a global replacement of the space character with dash
        return title;
      }
    },
    filters: {

    }
  };

</script>

<style lang="scss">
  .lg-sub-html {
    // width: 30%;
    height: 20%;
    opacity: 0;
    transition: opacity .25s ease-in-out;
    -moz-transition: opacity .25s ease-in-out;
    -webkit-transition: opacity .25s ease-in-out;

    &:hover {
      //show the caption on hover
      opacity: 1;
    }

    .current {
      //TODO: change text styl
    }
  }

</style>
