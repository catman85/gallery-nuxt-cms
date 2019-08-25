<template>
  <div class="acts">
    <h1>{{t('acts')}} - {{t('features')}} - {{t('links')}}</h1>

    <div class="row">
      <div class="column" v-for="column in this.columns" :key="column.t">
        <p v-for="item in column" :key="item.title">
          <!-- {{item.url}} -->
          <a :href="item.url" target="_blank">{{item.title}}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    head: function () {
      return {
        title: "Acts - Features - Links",
        meta: [{
          hid: "description",
          name: "description",
          content: "Anthia's Acts"
        }]
      };
    },
    asyncData: async ({
      app,
      route,
      payload
    }) => {
      return {
        links: await app.$content('/links')
          .query({
            // exclude: ['attributes', 'body']
          })
          .getAll()
      };
    },
    data: function () {
      return {
        cols: 3
      }
    },
    computed: {
      columns: function () {
        let columns = []
        let mid = Math.ceil(this.links.length / this.cols)
        console.debug(mid);
        for (let col = 0; col < this.cols; col++) {
          columns.push(this.links.slice(col * mid, col * mid + mid))
        }
        return columns;
      }
    }
  }

</script>
