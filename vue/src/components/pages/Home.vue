<template>
  <PageLayout>
    <section class="p-16 section-content">
      <h1 class="title">Welcome to Our Online Shoe Store!</h1>
      <p class="description">We offer a wide variety of shoes for all occasions. Browse our collection to find the perfect pair for you.</p>
      <button class="help-button">Need Help?</button>
    </section>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'

export default {
  name: 'HomePage',
  components: {
    PageLayout
  }
}
</script>

<style scoped lang="less">
.p-16 {
  text-align: center;
}

.section-content {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
}

.title {
  font-size: 2em;
  color: #333;
}

.description {
  font-size: 1.2em;
  color: #666;
}

.help-button {
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #007BFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
}
</style>