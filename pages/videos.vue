<template>
  <h1>{{t('videos')}}</h1>
</template>

<script>
  export default {
    asyncData: async ({
      app,
      route,
      payload
    }) => {
      return {
        // videos: await app.$content('/videos')
        //   .query({
        //     // exclude: ['attributes', 'body']
        //   })
        //   .getAll()
      };
    },
  }

</script>
