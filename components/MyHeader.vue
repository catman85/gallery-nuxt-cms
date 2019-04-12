<template>
    <header>
    <h2>anthia art</h2>
        <nav>
      <ul>
        <li>
          <nuxt-link :to="'/page-1'">Page 1</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="'/page-2'">Page 2</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="'/about'">About</nuxt-link>
        </li>
      </ul>
    </nav>
    </header>
</template>

<script>
export default {
    name: "MyHeader"
}
</script>

<style>

</style>
