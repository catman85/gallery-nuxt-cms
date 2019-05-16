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
            :data-sub-html="'.caption' + cleanString(image.title)">
            <img :src="image.src" :title="image.title" :alt="image.alt">

            <!-- this must match with data-sub-html but there might be duplicates -->
            <!-- ATTENTION for some reason filters don't work (format)-->
            <div :class="'description '+'caption'+ cleanString(image.title)">
              <h4>{{image.title | firstPart}}</h4>
              <p>{{image.title | secondPart}}</p>
              <p>{{image.title | thirdPart}}</p>
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
          getCaptionFromTitleOrAlt: true, //FIXME:
          hideBarsDelay: 700,
          hideControlOnEnd: true,
          // download: false,
          // height: "70%",
          // width: "60%",
          // controls: false,
          // pullCaptionUp: false,
          // subHtmlSelectorRelative:true,
          // selector: '.current',
        })
      }
    },
    filters: {
      firstPart(s) {
        // if(s.includes(",")){
        // (s.split(',').length - 1) // how many times "," appears inside a string
        if ((s.split(',').length - 1) >= 1) {
          // from start to first index
          return s.substring(0, s.indexOf(',')); //one comma , two parts
        } else {
          return s; // no comma
        }
      },
      secondPart(s) {
        if ((s.split(',').length - 1) == 1) { //one comma, two parts
          //from last index to end
          //in this case last index and first index are the same
          return s.substring(s.lastIndexOf(',') + 1);
        } else if ((s.split(',').length - 1) > 1) { // two commas
          //from first index to last index
          return s.substring(s.indexOf(',') + 1, s.lastIndexOf(',')); //two commas
        }
      },
      thirdPart(s) {
        if ((s.split(',').length - 1) >= 2) {
          //from last index to end
          return s.substring(s.lastIndexOf(',') + 1);
        }
      }
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

    > h4,p {
      font-size: 20px;
    }
  }

</style>
