import Vue from 'vue';
import {
  default as english
} from '@/lang/en-US';
import {
  default as greek
} from '@/lang/gr-GR';


Vue.mixin({
  methods: {
    uniq(a) {
      var prims = {
          "boolean": {},
          "number": {},
          "string": {}
        },
        objs = [];

      return a.filter(function (item) {
        var type = typeof item;
        if (type in prims)
          return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        else
          return objs.indexOf(item) >= 0 ? false : objs.push(item);
      });
    },
    rmDash(str) { // not used
      return str.replace(/-/g, "");
    },
    t(key) { // translate method (look at (store/index.js) and (lang/*))
      let lang = this.$store.state.lang;
      if (lang == 'en') {
        return english[key];
      } else {
        return greek[key];
      }
    },
    nthIndex(str, pat, n) { // not used
      var L = str.length,
        i = -1;
      while (n-- && i++ < L) {
        i = str.indexOf(pat, i);
        if (i < 0) break;
      }
      return i;
    },
    cleanString(title) {
      title = title.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''); // remove all special characters
      title = title.trim(); // remove spaces from beginning and end.
      title = title.replace(/ /g, "-"); //   / /g is a global replacement of the space character with dash
      return title;
    },
    getYoutubeId(url) {
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      var match = url.match(regExp);
      return (match && match[7].length == 11) ? match[7] : false;
    }
  }
});
