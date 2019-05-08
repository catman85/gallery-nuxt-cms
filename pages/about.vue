<template>
<div>
    <h1>{{ t('about') }}</h1>
    </div>
</template>

<script>
export default {
    mounted(){
        console.debug(this.$store.state.lang)
    }
}
</script>
