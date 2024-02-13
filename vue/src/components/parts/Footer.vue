<template>
  <div class="footer">
    <ContentContainer>
      <div class="footer__top">
        <a href="/" class="logo">
          <img src="../../assets/redlogo.png">
          <div class="logo__header">MAGETIQUE</div>
          <div class="logo__caption">Spare Parts</div>
        </a>
        <div class="links">
          <div class="links__row">
            <a href="/">Shopping & Delivery</a>
            <a href="/">Secure payment</a>
            <a href="/">Support</a>
            <a href="/">Guarantee</a>
            <a href="/">Terms & Conditions</a>
          </div>
          <div class="links__row">
            <a href="/">About Us</a>
            <a href="/">Customer Service</a>
            <a href="/">Template Setting</a>
          </div>
          <div class="links__row">
            <a href="/">Privacy Policy</a>
            <a href="/">Search Terms</a>
            <a href="/">Contact Us</a>
            <a href="/">Orders and Returns</a>
            <a href="/">Advanced Search</a>
            <a href="/">Newsletter Subscription</a>
          </div>
        </div>
      </div>
      <div class="footer__bottom">
        <div class="social">
          <button class="social__button"><unicon name="facebook-f" width="16" height="16" fill="gray"></unicon></button>
          <button class="social__button"><unicon name="twitter" width="16" height="16" fill="gray"></unicon></button>
          <button class="social__button"><unicon name="google" width="16" height="16" fill="gray"></unicon></button>
          <button class="social__button"><unicon name="instagram" width="16" height="16" fill="gray"></unicon></button>
        </div>
        <div class="copyright">@ 2017 Magetro Spareparts Spare Parts</div>
      </div>
    </ContentContainer>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css';
import ContentContainer from "./Container.vue";

export default {
  name: "FooterComponent",
  components: {ContentContainer},
};
</script>

<style scoped lang="scss">
 .footer {
   padding-block: 60px;
   background: white;
 }

 .footer__top {
   display: flex;
   align-items: flex-start;
   justify-content: space-between;
 }

 .logo {
   display: grid;
   width: 220px;

   img {
     grid-column: 1;
     grid-row: 1 / 3;
     height: 44px;
   }

   &__header {
     grid-column: 2;
     grid-row: 1;
     text-transform: uppercase;
     font-weight: bold;
     color: #0e1416;
     font-family: Arial, sans-serif;
     font-size: 24px;
   }

   &__caption {
     grid-column: 2;
     grid-row: 2;
     font-family: Arial, sans-serif;
     font-size: 12px;
     color: gray;
     align-self: flex-end;
   }
 }

 .links {
   display: flex;
   flex-direction: column;
   align-items: flex-end;
   row-gap: 12px;
   font-size: 12px;

   &__row {
     display: flex;
     column-gap: 12px;

     a {
       color: gray;
     }
   }
 }

 .footer__bottom {
   display: flex;
   align-items: flex-end;
   justify-content: space-between;
   margin-top: 24px;
 }

 .social {
   display: flex;
   column-gap: 4px;

   &__button {
     display: flex;
     align-items: center;
     justify-content: center;
     width: 36px;
     height: 36px;
     border-radius: 50%;
     border: 1px solid gray;
     background: transparent;
     color: gray;
     cursor: pointer;

     > div {
       display: flex;
     }
   }
 }

</style>
