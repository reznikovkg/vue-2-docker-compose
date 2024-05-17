<template>
  <div class="gallery">
    <div 
    class="gallery__query"
    >
      <button 
        class="prev"
        @click="() => changeSlide(-1)"
      ></button>
      <div class="gallery__query__select">
        <div 
        class="gallery__query__select__slide"
        :style="{ transform: `translateY(${-100 * currentImg}px)` }"
        >
          <img
            v-for="(image, index) in images"
            :key="index" 
            :class="currentImg == index ? 'gallery__element__active' : 'gallery__element'" 
            :src="image" 
            alt=""
            @click="() => changeSlide(index - currentImg)"
          >
        </div>
      </div>
      <button 
        class="next"
        @click="() => changeSlide(1)"
      ></button>
    </div>
    <div class="gallery__main">
      <img class="gallery__main__img" :src="images[currentImg]" alt="">
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'GalleryUI',
  props: {
    images: {
    type: Array,
    reqiered: true
    }
  },
  data () {
    return {
      currentImg: 0,
    }
  },
  methods: {
    changeSlide (direction) {
    this.currentImg += direction
    if (this.currentImg == this.images.length)
        this.currentImg = 0
    if (this.currentImg < 0)
        this.currentImg = this.images.length - 1
    }
  }
}
</script>
  
<style scoped lang="less">
.gallery {
  width: 40%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  &__main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    &__img {
      width: 300px;
    }
  }  
  &__query {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: space-around;
    align-items: center;
    & .prev {
      width: 30px;
      height: 30px;
      border: none;
      cursor: pointer;
      background: none;
      transform: rotate(90deg);
      background-position: center;
      background-repeat: no-repeat;
      background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --%3E%3Csvg fill='%23000000' height='30px' width='30px' version='1.1' id='XMLID_54_' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 24 24' xml:space='preserve'%3E%3Cg id='previous'%3E%3Cg%3E%3Cpolygon points='17.2,23.7 5.4,12 17.2,0.3 18.5,1.7 8.4,12 18.5,22.3 '/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
    & .next {
      width: 30px;
      height: 30px;
      border: none;
      cursor: pointer;
      background: none;
      transform: rotate(-90deg);
      background-position: center;
      background-repeat: no-repeat;
      background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --%3E%3Csvg fill='%23000000' height='30px' width='30px' version='1.1' id='XMLID_54_' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 24 24' xml:space='preserve'%3E%3Cg id='previous'%3E%3Cg%3E%3Cpolygon points='17.2,23.7 5.4,12 17.2,0.3 18.5,1.7 8.4,12 18.5,22.3 '/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
    &__select {
      width: 80%;
      overflow: hidden;
    &__slide {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
      transition: all .3s ease-in-out;
     }
    }
  }
  &__element {
    width: 150px;
    height: 100px;
    cursor: pointer;
    transition: all .3s ease-in-out;
    &:hover {
      scale: 1.2;
    }
    &__active {
      width: 150px;
      border: 3px solid #000;
    }
  }
}
</style>
   