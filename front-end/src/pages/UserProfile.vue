<template>
  <div class="c-userProfile">
    <Nav class="c-userProfile__nav--mobile" :link="url" title="Perfil" :img="image" />
    <Nav class="c-userProfile__nav--desk" link="/" title="GitSearch" :img="iconDesk" />
    <div class="c-userProfile__error" v-if="profile.message">
      <div class="c-userProfile__errorSection">
        <h3 class="c-userProfile__errorMsg">Nenhum usuário encontrado.</h3>
      </div>
    </div>
    <div class="c-userProfile__item" v-if="!profile.message">
      <div class="c-userProfile__container">
        <div class="c-userProfile__section">
          <img class="c-userProfile__capa" :src="capa" alt="Imagem de capa" />
          <div class="c-userProfile__avatar">
            <img :src="profile.avatar_url" alt="Avatar do usuário"/>
          </div>
          <div class="c-userProfile__texts">
            <div class="c-userProfile__texts1">
              <h4 class="c-userProfile__name">{{ profile.name }}</h4>
              <div class="c-userProfile__user">
                <img :src="iconUser" alt="Ícone de usuário" width="10" height="10" />
                <span class="c-userProfile__login">{{ profile.login }}</span>
              </div>
            </div>
            <div class="c-userProfile__texts2">
              <div class="c-userProfile__info">
                <div class="c-userProfile__cols">
                  <div class="c-userProfile__colsItems">
                    <img class="c-userProfile__icons" :src="iconFollowing" alt="Ícone de pessoa" width="15" height="15"/>
                    <span class="c-userProfile__textInfos">{{ profile.following }}</span>
                  </div>
                  <p class="c-userProfile__description">Seguindo</p>
                </div>
                <div class="c-userProfile__cols">
                  <div class="c-userProfile__colsItems">
                    <img class="c-userProfile__icons" :src="iconProjects" alt="Ícone de pasta" width="18" height="15"/>
                    <span class="c-userProfile__textInfos">{{ profile.public_repos }}</span>
                  </div>
                  <p class="c-userProfile__description">Projetos</p>
                </div>
                <div class="c-userProfile__cols">
                  <div class="c-userProfile__colsItems">
                    <img class="c-userProfile__icons" :src="iconFollowers" alt="Ícone de pessoas" width="15" height="15"/>
                    <span class="c-userProfile__textInfos">{{ profile.followers }}</span>
                  </div>
                  <p class="c-userProfile__description">Seguidores</p>
                </div>
              </div>
            </div>
          </div>
          <div class="c-userProfile__divInfo">
            <div class="c-userProfile__information">
              <div class="c-userProfile__buttons">
                <button class="c-userProfile__btn c-userProfile__btn--active" v-on:click="showContent($event)">Sobre</button>
                <button class="c-userProfile__btn" v-on:click="showContent($event)">Projetos</button>
              </div>
              <div class="c-userProfile__bio">
                <p class="c-userProfile__bioTitle">Bio</p>
                <span>{{ profile.bio || lorem }}</span>
                <div class="c-userProfile__footer">
                  <div class="c-userProfile__divBioFooter" v-if="profile.location">
                    <img class="c-userProfile__icons" :src="iconHouse" alt="Ícone de uma casa" width="15" height="15" />
                    <span class="c-userProfile__textBioFooter">{{profile.location}}</span>
                  </div>
                  <div class="c-userProfile__divBioFooter" v-if="profile.blog">
                    <img class="c-userProfile__icons" :src="iconPc" alt="Ícone de um PC" width="15" height="15" />
                    <span class="c-userProfile__textBioFooter">{{ profile.blog }}</span>
                  </div>
                </div>
              </div>
              <div class="c-userProfile__projects c-userProfile--hideContent">
                <div class="c-userProfile__repos" v-for="(repo, index) in repos" :key="index">
                  <h4 class="c-userProfile__repoTitle">{{repo.name}}</h4>
                  <span class="c-userProfile__repoDesc">{{repo.description || lorem}}</span>
                  <div class="c-userProfile__repoInfos">
                    <div class="c-userProfile__repoTags">
                      <div class="c-userProfile__repoBadge"></div>
                      <span class="c-userProfile__repoLanguage">{{repo.language || "Não específicado"}}</span>
                    </div>
                    <span class="c-userProfile__repoUpdate" >Atualizado em {{ convertDate(repo.updated_at) }}</span>
                  </div>
                </div>
                <div class="c-userProfile__footer">
                  <Loading/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/services/api.js";
import Nav from "@/components/Nav.vue";
import Loading from "@/components/Loading.vue";

export default {
  components: {
    Nav,
    Loading
  },
  data() {
    return {
      image: require("@/assets/Icon.png"),
      url: "",
      profile: {},
      capa: require("@/assets/capa.png"),
      iconDesk: require("@/assets/logo-github.png"),
      iconFollowers: require("@/assets/icon-followers.png"),
      iconFollowing: require("@/assets/icon-following.png"),
      iconHouse: require("@/assets/icon-house.png"),
      iconPc: require("@/assets/icon-pc.png"),
      iconProjects: require("@/assets/icon-projects.png"),
      iconUser: require("@/assets/icon-user.png"),
      repos: [],
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla laoreet tincidunt erat ut dapibus. Sed vitae ante et dolor euismod fermentum eu vitae nunc. Sed eget massa ut eros condimentum tincidunt id quis enim. Suspendisse ipsum lectus, ullamcorper et fermentum id, sodales id elit. Nam ligula purus, volutpat at pellentesque vel, congue non purus. Phasellus quis ex dapibus, elementum ipsum ut, scelerisque elit. Duis eget metus eu enim hendrerit euismod. Quisque tortor odio, molestie ut hendrerit non, faucibus quis tortor.",
      els: []
    };
  },
  methods: {
    route: function () {
      if (window.location.href.indexOf("name") > -1) {
        this.url = "/all-users";
      } else {
        this.url = "/";
      }
    },
    showContent: function (e) {
      const btn = e.target;
      const active = document.querySelector(".c-userProfile__btn--active");
      active.classList.remove("c-userProfile__btn--active");
      btn.classList.add("c-userProfile__btn--active");
      const bio = document.querySelector(".c-userProfile__bio");
      const projects = document.querySelector(".c-userProfile__projects");

      if (btn.innerText == "Sobre") {
        bio.classList.remove("c-userProfile--hideContent");
        projects.classList.add("c-userProfile--hideContent");
      } else {
        projects.classList.remove("c-userProfile--hideContent");
        bio.classList.add("c-userProfile--hideContent");
      }
    },
    convertDate: function (date) {
      if(!date) return;
      const getOnlyDate = date.substr(date[0], date.indexOf("T") - 2);
      const splitDate = getOnlyDate.split("-");

      return splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0];
    },
    insertDataColor: function () {
      
      const badges = document.querySelectorAll(".c-userProfile__repoBadge");
      let a = [];
      let c = [];
      for (let i = 0; i < badges.length; i++) {
        c.push(badges[i]);
        if ((i + 1) % 5 == 0) {
          a.push(c);
          c = [];
        }
      }

      if(c.length) a.push(c);
      
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a[i].length; j++) {
          a[i][j].setAttribute('data-color', j);
        }
      }

    }
  },
  mounted() {
    
    this.route();
    const url = window.location.href;
    let user = "";
    if (url.indexOf("name=") > -1) {
      user = url.substr(url.indexOf("name="), url.length).replace("name=", "");
    } else {
      user = url.substr(url.indexOf("search="), url.length).replace("search=", "");
    }
    
    this.profile = api(`/users/${user}`);
    this.repos = api(`/users/${user}/repos`);

    setTimeout(() => {
      this.insertDataColor();
    }, 2000);

  }
};
</script>
<style src='@/styles/userProfile.css'>
</style>