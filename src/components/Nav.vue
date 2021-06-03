<template>
    <div>
        <nav class="c-nav">
            <a class="c-nav__link" :href='link'>
                <img class="c-nav__logo" :src='img' alt="">
            </a>
            <span class="c-nav__title">{{title}}</span>
        </nav>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String
        },
        link: {
            type: String
        },
        img: {
            type: String
        }
    }
}
</script>
<style scoped src="@/styles/navbar.css">

</style>