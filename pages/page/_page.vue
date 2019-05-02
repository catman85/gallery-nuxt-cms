<template>
  <div>
    <h3>Title:</h3>
    <nuxtdown-body class="body" :body="page.title" /><br>
    <h4>Category:</h4>
    <nuxtdown-body class="body" :body="page.category" /><br>
    <h4>Description:</h4>
    <nuxtdown-body class="body" :body="page.description" /><br>
    <h4>Featured Image: </h4>
    <img :src="page.featuredImage" alt="" /><br>

    <div class="images">
      <h3>Body:</h3>
      <!-- <nuxtdown-body class="body" :body="page.body" /> -->
      <!-- <no-ssr>  not needed </no-ssr> -->
      <div class="app-container">
        <div id="lightgallery">
          <a v-for="image in imagesArray" :key="image.src" :href="image.src" data-sub-html=".caption" >
            <img :src="image.src" :title="image.title" :alt="image.alt">
            <div class="caption">
              <h5>{{image.title}}</h5>
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
          // subHtmlSelectorRelative:true,
          // selector: '.current',
        })
      }
    }
  };

</script>

<style scoped>
</style>
