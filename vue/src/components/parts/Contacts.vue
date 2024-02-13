<template>
  <div class="contacts">
    <ContentContainer>
      <div class="wrapper">
        <div class="left">
          <div class="title">Get the latest news delivery daily</div>
          <div class="caption">Give us your email and get the latest news delivery daily</div>
        </div>
        <div class="right">
          <input placeholder="Enter your email" class="input" />
          <button class="button">Subscribe</button>
        </div>
      </div>
    </ContentContainer>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css';
import ContentContainer from "./Container.vue";

export default {
  name: "ContactsComponent",
  components: {ContentContainer},
};
</script>

<style scoped lang="scss">
 .contacts {
   margin-top: 60px;
   background: var(--brand);;
   padding-block: 60px;
   color: white;
 }
 .wrapper {
   display: flex;
   align-items: center;
   justify-content: space-between;
 }

 .title {
   font-size: 40px;
   font-weight: bold;
   margin-bottom: 8px;
 }
 .caption {
   font-size: 16px;
 }

 .right {
   display: flex;
   align-items: center;
   column-gap: 12px;
 }
 .input {
   background: white;
   border: 1px solid gray;
   height: 34px;
   width: 300px;
   padding-inline: 16px;
 }
 .button {
   display: flex;
   align-items: center;
   justify-content: center;
   height: 37px;
   background: transparent;
   color: white;
   border: 1px solid white;
   padding-inline: 16px;
 }
</style>
