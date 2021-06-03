<template>
  <section class="c-allUsers">
    <Nav class="c-allUsers__nav--mobile" link="/" title="Lista de Usuários" :img="image" />
    <Nav class="c-allUsers__nav--desk" link="/" title="GitSearch" :img="iconDesk" />
    <div class="c-allUsers__item">
      <div class="c-allUsers__container">
        <div class="c-allUsers__section">
          <h3 class="c-allUsers__textDesk">Search Result</h3>
          <div class="c-allUsers__inputIcon">
            <img class="c-allUsers__icon" :src='icon' width="45"/>
            <input class="c-allUsers__input" type="text" placeholder="Buscar" v-on:input='search' v-on:change="noResults"/>
          </div>
        </div>
        <div class="c-allUsers__card">
          <div class="c-allUsers__notFound" v-if="notFound">
            <h3>Nenhum usuário encontrado.</h3>
          </div>
          <Card v-if="users" :users="users" />
          <!-- <Loading/> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from "@/services/api.js";
import Card from "@/components/Card.vue";
import Nav from "@/components/Nav.vue";
// import Loading from "@/components/Loading.vue";

export default {
  components: {
    Card,
    Nav,
    // Loading
  },
  data() {
    return {
      users: [],
      image: require("@/assets/Icon.png"),
      icon: require("@/assets/Vector.png"),
      iconDesk: require("@/assets/logo-github.png"),
      notFound: false
    };
  },
  mounted() {
    this.users = api('/users');
  },
  methods: {
    search: function() {
      
      const input = document.querySelector('.c-allUsers__input');
      const cards = document.querySelectorAll('.c-card__section');

      cards.forEach((card) => {
        if(card.getAttribute('data-id').indexOf(input.value) > -1) {
          card.classList.remove('c-card__section--hide');
        } else {
          card.classList.add('c-card__section--hide');
        }
      });

      this.noResults();

    },
    noResults: function() {
     
      const cards = document.querySelectorAll('.c-card__section');
      const hideCards = document.querySelectorAll('.c-card__section--hide');
      
      if(hideCards.length === cards.length) {
        this.notFound = true;
      } else {
        this.notFound = false;
      }

    }
  }
};
</script>
<style src="@/styles/allUsers.css">

</style>