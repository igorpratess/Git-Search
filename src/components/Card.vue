<template>
    <div class="c-card">
        <div class="c-card__section " v-for='(user, index) in users' :key='index' :data-id='user.login'>
            <div class="c-card__item" v-on:click='userProfile(user.login)'>
                <img :src='user.avatar_url' class="c-card__img" alt="Avatar de usuário" width="70" height="70">
                <span class="c-card__name">{{user.login}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        users: {
            type: Array
        },
        class: {
            type: String
        }
    },
    methods: {
        userProfile: function (user) {
            localStorage.setItem('user', user);
            setTimeout(() => {
                window.location.href = '/user-profile?name=' + user;
            }, 1000);
        }
    }
}
</script>
<style scoped src='@/styles/card.css'>

</style>