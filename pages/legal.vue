<template>
  <div>
    <h1>{{ t('legal') }}</h1>
    <!-- this.$refs.bioText.innerHTML -->
    <div class="row">
      <div ref="legalText">
        {{lang}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    head: function () {
      return {
        title: "Legal",
        meta: [{
          hid: "description",
          name: "description",
          content: "Legal Info"
        }]
      };
    },
    mounted() {
      // hack
      this.isMounted = true;
    },
    data: function () {
      return {
        contentEn: "<h2>Μember of the Chamber of Fine Arts of Greece</h2><p>All works are registered and protected by the Law 4481/2017 copyright, related rights and cultural issues. GG A 25 1993.</p>",
        contentGr: "<h2>Μέλος του Επιμελητηρίου Εικαστικών Τεχνών Ελλάδας</h2><p>Όλα τα έργα είναι κατοχυρωμένα και προστατεύονται από το Νόμο 4481/2017 περί Πνευματικής ιδιοκτησίας, συγγενικών δικαιώματων και πολιτιστικών θεμάτων. ΦΕΚ Α 25 1993</p>",
        isMounted: false
      }
    },
    computed: {
      lang: function () {
        // ATTENTION this tricks Vue to run our code after the component is mounted
        // https://stackoverflow.com/questions/43531755/using-refs-in-a-computed-property
        if (!this.isMounted) {
          // if this component isn't mounted dont run this function
          // because if you do we will get undefined errors
          return;
        }
        if (this.$store.state.lang == "en") {
          this.renderHTML(this.contentEn);
        } else {
          this.renderHTML(this.contentGr);
        }
      }
    },
    methods: {
      renderHTML(s) {
        this.$refs.legalText.innerHTML = s;
      }
    }
  }

</script>
