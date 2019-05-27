<template>
    <footer>footer | <nuxt-link :to="'/legal'">{{ t('legal')}}</nuxt-link> | © {{this.getCurrentYear()}}</footer>
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
