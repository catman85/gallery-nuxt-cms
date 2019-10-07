<template>
  <div>
        <div class="row">
      <p>{{this.paragraph}}</p>
    </div>
    <h1>{{t('contact')}}</h1>
    <h1>{{t('name')}}</h1>
    <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/contact/success/">
      <!-- honeypot bot trap (needs to be hidden)-->
      <!-- ATTENTION The hidden input field should have a name attribute called "form-name" and a value matching the name of the form, which in this case is "contact" -->
      <input type="hidden" name="form-name" value="contact" />
      <p>
        <label>E-mail: <input type="text" name="email" required /></label>
      </p>
      <p>
        <label>{{t('message')}}: <textarea name="message" required></textarea></label>
      </p>
      <p>
        <button type=”submit” class="pushy-btn">{{t('sndMsg')}}</button>
      </p>
    </form>
    <br>
    <hr>
    <h1>{{t('clinks')}}:</h1>
    <ul id="clinks">
      <li><a href="https://www.facebook.com/VisualArtistAnthiaMegaChavre/">facebook page</a></li>
      <li><a href="https://www.facebook.com/profile.php?id=100008421370594">facebook profile</a></li>
      <li><a href="https://www.facebook.com/WeDiveWeClean/">We Dive We Clean</a></li>
      <li><a
          href="https://www.facebook.com/Become-An-Artist-%CE%93%CE%AF%CE%BD%CE%B5-%CE%9A%CE%B1%CE%BB%CE%BB%CE%B9%CF%84%CE%AD%CF%87%CE%BD%CE%B7%CF%82-237040896974199/">Become
          An Artist</a></li>
      <li><a href="https://www.facebook.com/AnthiaMegaChavreAggelosGavriil/">Jazz Duet</a></li>
      <li><a href="https://www.youtube.com/channel/UCd_3qTM7zzxkl_I-3JDPKKg">youtube</a></li>
      <li><a href="https://myspace.com/anthiamega/mixes/706273/photo/373754354">myspace</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    head: function () {
      return {
        title: "Contact",
        meta: [{
          hid: "description",
          name: "description",
          content: "Contact Anthia Mega Chavre"
        }]
      };
    },
    asyncData: async ({
      app,
      route,
      payload
    }) => {
      return {
        paragraphs: await app.$content('/text')
          .query({
            // exclude: ['attributes', 'body']
          })
          .getAll()
      };
    },
    computed: {
      paragraph: function(){
        let para;
        this.paragraphs.forEach(par => {
          // console.debug(par.title + " " + par.text);
          if(par.title == "Epikoinwnia"){
            if (this.$store.state.lang == "en") {
            para = par.textEn;
            }else{
              para = par.textGr;
            }
            // ATTENTION you can't return or break here
          }
        })
        return para;
      }
    }
  }

</script>

<style scoped>
  hr{
    margin-top: 0;
  }
</style>
