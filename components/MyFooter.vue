<template>
    <footer>Developed by <a href="https://www.github.com/catman85/">Dimitris</a>  | <nuxt-link :to="'/legal'">{{ t('legal')}}</nuxt-link> | © {{this.getCurrentYear()}}</footer>
</template>

<script>
export default {
    name: "MyFooter",
    methods: {
        getCurrentYear(){
            return new Date().getFullYear();
        }
    }
}
</script>

<style>

</style>
