<template>
    <div class="c-loading">
        <div class="c-loading__item">
            <div class="c-loading__ball"></div>
            <div class="c-loading__ball"></div>
            <div class="c-loading__ball"></div>
        </div>
        <span class="c-loading__msg hideMsg">Final da Lista</span>
    </div>
</template>
<script>
const fn = () => {

    const url = window.location.href;
    let qtd = 0;
    let _class = '';

    if(url.indexOf('user-profile') > -1) {
        _class = 'c-userProfile__repos';
        qtd = 8;
    } else {
        _class = 'c-card__section';
        qtd = 10;
    }

    window.addEventListener("scroll", () => {
        
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (clientHeight + scrollTop >= scrollHeight - 5) {
            showLoading();
        }
    });

    setTimeout(() => {

        hideElsOnInit();

    }, 1000);

    function hideElsOnInit() {
        const selector = document.querySelectorAll("." + _class);

        for (let i = qtd; i < selector.length; i++) {
            selector[i].classList.add("hideEls");
        }
    }

    function showLoading() {
        const loading = document.querySelector(".c-loading__item");
        loading?.classList.add("c-loading--show");
        showOnScroll(qtd, loading);
    }

    function showOnScroll(show, loading) {

        const hideEls = document.querySelectorAll(".hideEls");
        
        if(!hideEls.length) {
            loading?.remove();
            const msg = document.querySelector('.c-loading__msg');
            msg.classList.remove('hideMsg');
            return;
        }

        setTimeout(() => {
            for (let i = show; i >= 0; i--) {
                if (hideEls[i]) {
                hideEls[i].classList.remove("hideEls");
                }
            }

            loading?.classList.remove("c-loading--show");
        }, 2000);

    }

};

fn();
</script>

<style src="@/styles/loading.css">
</style>