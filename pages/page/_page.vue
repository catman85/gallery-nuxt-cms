<template>
  <div>
    <hr class="normal">
    <h2>
      <nuxtdown-body class="title" :body="page.head" />
    </h2>
    <hr class="reverse">
    <br>
    <div class="row">
      <p class="pageDescription">{{ this.description }}</p>
    </div>
    <br>
    <div class="featured">
      <lazy-component>
        <img v-lazy="page.featuredImage" alt="" />
      </lazy-component>
      <!-- <img :src="page.featuredImage" alt="" /> -->
    </div>

    <!-- TODO: add relative posts -->
    <div class="row">
      <div v-if="relativePosts[0]">
        <nuxt-link :to="relativePosts[0].title | formatLink">Previous post: {{relativePosts[0].head}}
          <lazy-component>
            <img v-lazy="relativePosts[0].image" alt="" />
          </lazy-component>
        </nuxt-link>
      </div>
      <div v-if="relativePosts[1]">
        <nuxt-link :to="relativePosts[1].title | formatLink">Next post: {{relativePosts[1].head}}
          <lazy-component>
            <img v-lazy="relativePosts[1].image" alt="" />
          </lazy-component>
        </nuxt-link>
      </div>
    </div>
    <br>
    <div class="row">
      <nuxtdown-body class="category" :body="page.category" />
      <nuxtdown-body class="date" :body="page.creationDate | checkIfFutureDate" />
    </div>
    <br>

    <div class="images">
      <!-- <nuxtdown-body class="body" :body="page.body" /> -->
      <!-- <no-ssr>  not needed </no-ssr> -->
      <div class="app-container">

        <div id="lightgallery">
          <!-- needs a refresh to see changes -->
          <masonry :cols="{default: 5,1000: 4,700: 3}" :gutter="15">
            <!-- ATTENTION for some reason loading imagesArray first results in downloading both the original an the thumbnail -->
            <a v-for="image in thumbnailsArray" :key="image.src" :href="original(image.src)"
              :data-sub-html="'.caption' + cleanString(image.title)" class="current">
              <!-- :src="image.src" (notice the scroll bar on the right)-->
              <!-- :data-srcset -->
              <lazy-component v-vpshow.native>
                <!-- :alt="image.alt" shows Imgur everywhere-->
                <!-- :src="thumbnail(image.src)" -->
                <img v-if="image" v-lazy="(image.src)" :title="image.title">

                <!-- <pinch :src="(image.src)" :min-zoom="1" :max-zoom="2.5"></pinch> -->
              </lazy-component>
              <!-- this must match with data-sub-html but there might be duplicates -->
              <!-- ATTENTION for some reason filters don't work (format)-->
              <div v-if="$store.state.lang == 'en'" :class="'description '+'caption'+ cleanString(image.title)">
                <h4>{{image.title | firstPart}}</h4>
                <p>{{image.title | secondPart}}</p>
                <p>{{image.title | thirdPart}}</p>

              </div>
              <div v-else :class="'description '+'caption'+ cleanString(image.title)">
                <h4>{{image.alt | firstPart}}</h4>
                <p>{{image.alt | secondPart}}</p>
                <p>{{image.alt | thirdPart}}</p>
              </div>
            </a>
          </masonry>
        </div>
      </div>

    </div>


  </div>
</template>

<script>
  import pinch from "@/components/PinchImage.vue";
  export default {
    components: {
      pinch
    },
    // nuxtI18n: false,
    // nuxtI18n: {
    // paths: {
    // it: '/chi-siamo',
    // en: '/about'
    // }},
    head: function () {
      return {
        title: `${this.page.head}`,
        meta: [{
          hid: "description",
          name: "description",
          content: this.page.description
        }, {
          property: "og:image",
          content: this.page.featuredImage
        }]
      };
    },
    asyncData: async ({
      app,
      route,
      payload
    }) => {
      return {
        page: (await app.$content("/pages").get(route.path)) || payload,
        pages: await app.$content('/pages') // for relative posts
          .query({
            // this is wrong doesn't work that way
            // exclude: ['category','descriptionEn','descriptionGr','body','head']
            // exclude: ['attributes'] // if you exclude attributes it breaks
          })
          .getAll(),
      };
    },
    data: function () {
      return {
        imagesHTML: Object,
        imagesArray: Array,
        thumbnailsArray: [],
        isMounted: false,
        compressionLevel: "l"
        // s = Small Square (90×90) as seen in the example above
        // b = Big Square (160×160)
        // t = Small Thumbnail (160×160)
        // m = Medium Thumbnail (320×320)
        // l = Large Thumbnail (640×640) as seen in the example above
        // h = Huge Thumbnail (1024×1024)
      }
    },
    async mounted() {
      await this.stringToHTML(this.page.body);
      await this.imagesToArray();
      await Array.prototype.forEach.call(this.imagesArray, child => {
        let img = child;
        img.src = this.thumbnail(img.src);
        this.thumbnailsArray.push(img);
      });
      this.startLightGallery('lightgallery');

      // var myElement = document.querySelectorAll(".current");
      // var pz = new PinchZoom.default(myElement, {
      //   draggableUnzoomed: false,
      //   minZoom: 1,
      //   onZoomStart: function (object, event) {
      //     // Do something on zoom start
      //     // You can use any Pinchzoom method by calling object.method()
      //   },
      //   onZoomEnd: function (object, event) {
      //     // Do something on zoom end
      //   }
      // })

    },
    computed: {
      description: function () {
        if (this.$store.state.lang == "en" || this.page.descriptionGr == "") {
          return this.page.descriptionEn;
        } else {
          return this.page.descriptionGr;
        }
      },
      relativePosts: function () {
        let prevPost;
        let nextPost;
        let refDate = parseInt(this.page.creationDate.replace(/-/g, ""));
        let refTitle = this.page.title;
        let posts = [];
        let newerPosts = [];
        let olderPosts = [];

        // IMPROVEMENT if you have manually added the relatives do an early return
        // IMPROVEMENT handle the same date somehow

        // creating two groups, newer and older
        this.pages.forEach(page => {
          let head = page.head;
          let title = page.title;
          let image = page.featuredImage;
          let date = parseInt(page.creationDate.replace(/-/g, ""));

          if (date > refDate) {
            prevPost = {
              title,
              date,
              head,
              image
            };
            if (prevPost.title != refTitle) {
              newerPosts.push(prevPost);
            }
          }
          if (refDate > date) {
            nextPost = {
              title,
              date,
              head,
              image
            };
            if (nextPost.title != refTitle) {
              olderPosts.push(nextPost);
            }
          }
        });

        // getting the ones that is closer to the current page
        // from the 2 groups
        olderPosts.forEach(post => { // we want the biggest date
          if (post.date > nextPost.date) {
            // if(post.date == nextPost.date){
            // if(post.title < nextPost.title){
            // nextPost = post;
            // }
            // }else{
            nextPost = post;
            // }
          }
        });

        newerPosts.forEach(post => { // we want the smallets date
          if (post.date < prevPost.date) {
            // if(post.date == nextPost.date){
            // if(post.title > nextPost.title){
            // nextPost = post;
            // }
            // }else{
            prevPost = post;
            // }
          }
        });
        posts = [prevPost, nextPost];
        return posts;
      }
    },
    methods: {
      stringToHTML(s) {
        this.imagesHTML = document.createElement('div');
        this.imagesHTML.innerHTML = s;
      },
      async imagesToArray() {
        this.imagesArray = this.imagesHTML.getElementsByTagName('img');
      },
      startLightGallery(id) {
        const el = document.getElementById(id)
        // http://sachinchoolur.github.io/lightGallery/docs/api.html
        window.lightGallery(el, {

          hideBarsDelay: 900,
          hideControlOnEnd: false,
          controls: false,
          download: false,
          selector: ".current", // linking the click and the element that pops
          counter: false,
          preload: 3,
          zoomFromImage: false,
          zoom: true,
          // showAfterLoad: false
          // appendCounterTo: '.lg-sub-html'
          // getCaptionFromTitleOrAlt: false,
        })
      },
      thumbnail(s) {
        let n = s.lastIndexOf(".");
        s = s.substring(0, n) + this.compressionLevel + s.substring(n);
        return s;
      },
      original(s) {
        let n = s.lastIndexOf(this.compressionLevel);
        if ((s.substring(n)).length == 5) { // already thumbnailed
          s = s.substring(0, n) + s.substring(n + 1);
        }
        return s;
      }
    },
    filters: {
      firstPart(s) {
        if (s.length > 110 && screen.width < 400) {
          return "";
        }
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
        if (s.length > 110 && screen.width < 400) {
          return s;
        }

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
        if (s.length > 110 && screen.width < 400) {
          return "";
        }
        if ((s.split(',').length - 1) >= 2) {
          //from last index to end
          return s.substring(s.lastIndexOf(',') + 1);
        }
      },
      checkIfFutureDate: function (date) {
        let dateinMs = Date.parse(date)
        let pageDateFull = new Date(dateinMs);

        if (dateinMs > Date.now()) {
          let current_datetime = new Date();
          let formatted_date = formatDate(current_datetime);
          return formatted_date;
        } else {
          let formatted_date = formatDate(pageDateFull);
          return formatted_date;
        }


        function formatDate(date) {
          let string;
          string = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
          // current_datetime.getFullYear() + "-" + (current_datetime.getMonth()+1) + "-" + current_datetime.getDate();
          // + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()
          return string;
        }
      }
    }
  };

</script>

<style lang="scss">
  // it doesn't apply if you import this at main.scss
  @import 'assets/scss/components/lightgallery';

</style>
