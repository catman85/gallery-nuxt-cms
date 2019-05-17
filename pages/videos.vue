<template>
  <div>
    <h1>{{t('videos')}}</h1>
    <!-- {{videos}} -->
    <div v-for="video in videos" :key="video.ytLink">
        <h3>{{video.title}}</h3>
        <p>{{video.description}}</p>
        <youtube :video-id=' getYoutubeId(video.ytLink) '></youtube>
        <br><br>
    </div>
  </div>
</template>

<script>
  export default {
    mounted(){

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
