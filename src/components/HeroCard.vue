<template>
  <div class="carousel-item">
    <img :id="`hero-img-${hero.name}`" :src="hero.image" :alt="hero.name" />
    <figcaption>{{ hero.name }}</figcaption>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['hero'],
  computed: {
    ...mapState(['index'])
  },
  methods: {
  }
}
</script>

<style scoped>
.carousel-item {
  min-width: 350px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-direction: column;
  cursor: pointer;
  position: relative; /* Для правильного позиционирования текста */
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease-in-out;
}

.carousel-item:hover img {
  transform: scale(var(--scale-factor));
}

figcaption {
  text-align: center;
  color: white;
  font-size: 18px;
  background-color: none; /* rgba(0, 0, 0, 0.5); */
  padding: 5px 0;
  position: relative; /* Для правильного позиционирования текста */
}

/* Псевдо-элемент для текста "Подробнее..." */
.carousel-item figcaption::after {
  content: "Подробнее...";
  position: absolute;
  bottom: -20px; /* Отступ от изображения */
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  color: white;
  opacity: 0; /* Изначально скрыто */
  visibility: hidden; /* Изначально скрыто */
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

/* Когда на карточку наведено, показываем текст */
.carousel-item:hover figcaption::after {
  opacity: 1;
  visibility: visible;
}
</style>
