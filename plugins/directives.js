import Vue from 'vue';

// You will need to add v-vpshow directive to the elements you want to animate when they become visible in the viewport.
// check the classes  "enter" and "before-enter" in _page.scss
Vue.directive("vpshow", {
    inViewport(el) {
      var rect = el.getBoundingClientRect();
      return !(
        rect.bottom < 0 ||
        rect.right < 0 ||
        rect.left > window.innerWidth ||
        rect.top > window.innerHeight
      );
    },
  
    bind(el, binding) {
      el.classList.add("before-enter");
      el.$onScroll = function() {
        if (binding.def.inViewport(el)) {
          el.classList.add("enter");
          el.classList.remove("before-enter");
          binding.def.unbind(el, binding);
        }
      };
      document.addEventListener("scroll", el.$onScroll);
    },
  
    inserted(el) {
      el.$onScroll();
    },
  
    unbind(el) {
      document.removeEventListener("scroll", el.$onScroll);
      delete el.$onScroll;
    }
  });