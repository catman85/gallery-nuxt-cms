<template>
  <div @click="toggleIcon" v-click-outside="showBurger">
    <svg ref="burger" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50"
      version="1.1" width="50px" height="50px">
      <g id="surface1">
        <path style=" "
          d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z " />
      </g>
    </svg>
    <svg ref="cross" class="hidden" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 50 50" version="1.1" width="50px" height="50px">
      <g id="surface1">
        <path style=" "
          d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z " />
      </g>
    </svg></div>
</template>

<script>
  export default {
    name: "Burger",
    methods: {
      toggleIcon() {
        if (this.$refs.cross.classList.contains("hidden")) {
          this.showCross();
        } else {
          this.showBurger();
        }
      },
      showCross() {
        this.$refs.burger.classList.add("hidden");
        this.$refs.cross.classList.remove("hidden");
        this.$refs.burger.classList.remove("visible");
        this.$refs.cross.classList.add("visible");
      },
      showBurger() {
        this.$refs.cross.classList.add("hidden");
        this.$refs.burger.classList.remove("hidden");
        this.$refs.burger.classList.add("visible");
        this.$refs.cross.classList.remove("visible");

      }
    }
  }

</script>