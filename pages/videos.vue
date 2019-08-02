<template>
  <div>
    <h1>{{t('videos')}}</h1>
    <!-- {{videos}} -->
    <div class="vid" v-for="video in videos" :key="video.ytLink">
      <h3>{{video.head}}</h3>
      <p>{{video.description}}</p>
      <div class="vcontainer">
        <youtube :video-id=' getYoutubeId(video.ytLink) '></youtube>
      </div>
      <br><br>
    </div>
  </div>
</template>

<script>
  export default {
    head: function () {
      return {
        title: "Videos",
        meta: [{
          hid: "description",
          name: "description",
          content: "Anthia's Videos Art"
        }]
      };
    },
    asyncData: async ({
      app,
      route,
      payload
    }) => {
      return {
        videos: await app.$content('/videos')
          .query({
            // exclude: ['attributes', 'body']
          })
          .getAll()
      };
    },
  }

</script>
