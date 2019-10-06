import Vue from 'vue';

Vue.filter('formatLink', function (link) {
  // ATTENTION if you get "Request failed with status code 404"
  // you probably need to configure something here...
  if (!link) return ''
  link = link.toString();
  // link = link.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''); // remove all special characters
  link = link.replace(/[`!@#$%^&*()|+\=?;:'",.<>\{\}\[\]\\\/]/gi,
    ''); // remove all special characters except the ones netlify cms understands - _
  link = link.trim(); // remove spaces from beginning and end.
  link = link.replace(/ /g, "-"); //   / /g is a global replacement of the space character with dash
  return link.toLowerCase();
})
