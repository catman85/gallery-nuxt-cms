<template>
  <div>
    <h3>Title:</h3>
    <nuxtdown-body class="body" :body="page.title" />
    <h4>Category:</h4>
    <nuxtdown-body class="body" :body="page.category" />
    <h4>Description:</h4>
    <!-- <nuxtdown-body class="body" :body="page.description" /><br> -->
    {{ this.description }}
    <h4>Date:</h4>
    <nuxtdown-body class="body" :body="page.creationDate" />
    <h4>Featured Image: </h4>
    <img :src="page.featuredImage" alt="" /><br>

    <div class="images">
      <h3>Body:</h3>
      <!-- <nuxtdown-body class="body" :body="page.body" /> -->
      <!-- <no-ssr>  not needed </no-ssr> -->
      <div class="app-container">
        
          <div id="lightgallery">
            <masonry  :cols="{default: 5,1000: 3,700: 2}" :gutter="10">
            <a v-for="image in imagesArray" :key="image.src" :href="image.src"
              :data-sub-html="'.caption' + cleanString(image.title)" class="current">
              <img :src="image.src" :title="image.title" :alt="image.alt">

              <!-- this must match with data-sub-html but there might be duplicates -->
              <!-- ATTENTION for some reason filters don't work (format)-->
              <div :class="'description '+'caption'+ cleanString(image.title)">
                <h4>{{image.title | firstPart}}</h4>
                <p>{{image.title | secondPart}}</p>
                <p>{{image.title | thirdPart}}</p>
              </div>
            </a>
            </masonry>
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
          hideBarsDelay: 500,
          hideControlOnEnd: true,
          controls: false,
          download: false,
          selector: ".current", // linking the click and the element that pops
          // height: "70%",
          // width: "60%",
          // pullCaptionUp: false,
          // subHtmlSelectorRelative:true,
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
  .lg-backdrop {
    background-color: white;
  }

  .lg {
    position: absolute;

    .lg-close {
      color: black;
    }

    .lg-toolbar {
      // opacity: 0; //remove that shit
      background-color: rgba(0, 0, 0, 0.0); // opacity full but dont kill children
    }

    .lg-inner {
      //restricting the image's height
      height: 90%;
      bottom: 10%;
    }

    .lg-sub-html {
      // width: 30%;
      // FIXME:// are all tehse restrictions necessary?
      // position: fixed;
      // bottom: 0;
      top: 90%;
      height: 10%;

      padding: 2px 0px;

      opacity: 1;
      transition: opacity .25s ease-in-out;
      -moz-transition: opacity .25s ease-in-out;
      -webkit-transition: opacity .25s ease-in-out;

      background-color: rgba(0, 0, 0, 0); //black full opacity overrite default

      &:hover {
        //hide the caption on hover
        opacity: 0;
      }

      >h4,
      p {
        // font-size: 15px;
        // position: absolute;
        // top: 50%;
        font-size: 2.5vh;
        margin-top: 0px;
        color: black;
      }
    }
  }

</style>
