<template>
  <section class="c-home">
    <img class="c-home__img" :src="image" alt="" width="140" height="140" />
    <h3 class="c-home__title">GitSearch</h3>
    <input class="c-home__input" type="text" placeholder="Pesquisar..." />
    <div class="c-home__buttons">
      <a href="/all-users" class="c-home__buttons--purple">Ver Todos</a>
      <a :href="link" class="c-home__buttons--green" v-on:click='searchUser()'>Buscar</a>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      image: require("@/assets/logo-github.png"),
      link: ''
    };
  },
  methods: {
    searchUser: function() {
      const input = document.querySelector('.c-home__input');
      this.link = '/user-profile?search=' + input.value;
    }
  }
};
</script>
<style scoped src="@/styles/home.css">
</style>