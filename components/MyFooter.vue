<template>
    <footer>footer | © {{this.getCurrentYear()}}</footer>
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
