import Vue from 'vue';

Vue.mixin({
  methods: {
    uniq(a) {
        var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];
    
        return a.filter(function(item) {
            var type = typeof item;
            if(type in prims)
                return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
            else
                return objs.indexOf(item) >= 0 ? false : objs.push(item);
        });
    },
    rmDash(str){ // not used
      return str.replace(/-/g, "");
    }
  }
})