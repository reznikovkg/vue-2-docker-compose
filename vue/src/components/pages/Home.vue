<template>
  <PageLayout>
    <div class="home">
      <div class="home__header">
        <h1 class="home__title">Welcome to File Explorer</h1>
      </div>
      <div class="home__card">
        <div class="home__card-icon">📁</div>
        <h3 class="home__card-title">File Management</h3>

        <button class="home__card-button" @click="navigateToExplorer">
          Open Explorer
        </button>
      </div>
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'

export default {
  name: 'Home-page',
  components: {
    PageLayout
  },
  methods: {
    navigateToExplorer() {
      this.$router.push({ name: 'EXPLORER' })
    }
  }
}
</script>

<style scoped lang="less">
.home {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;

  &__header {
    text-align: center;
    margin-bottom: 60px;
  }

  &__title {
    font-size: 48px;
    font-family: @ffThree;
    color: @cBaseThree;
    margin-bottom: 16px;
    font-weight: 300;
  }

  &__subtitle {
    font-size: 18px;
    font-family: @ffThree;
    color: @cBaseThree;
    opacity: 0.8;
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
  }

  &__card {
    background: linear-gradient(135deg, @cBaseOne 0%, @cBaseTwo 100%);
    border: 1px solid @cBorderOne;
    border-radius: 12px;
    padding: 40px 30px;
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }
  }

  &__card-icon {
    font-size: 60px;
    margin-bottom: 20px;
  }

  &__card-title {
    font-size: 24px;
    font-family: @ffThree;
    color: @cBaseThree;
    margin-bottom: 16px;
    font-weight: 500;
  }

  &__card-description {
    font-size: 16px;
    font-family: @ffThree;
    color: @cBaseThree;
    opacity: 0.8;
    line-height: 1.6;
    margin-bottom: 30px;
  }

  &__card-button {
    padding: 12px 30px;
    border: 2px solid @cBaseThree;
    background-color: transparent;
    color: @cBaseThree;
    border-radius: 6px;
    cursor: pointer;
    font-family: @ffThree;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      background-color: @cBaseThree;
      color: white;
    }
  }

  &__footer {
    text-align: center;
    padding: 40px 20px;
    background-color: @cBaseOne;
    border-radius: 12px;
    border: 1px solid @cBorderOne;
  }

  &__footer-text {
    font-size: 18px;
    font-family: @ffThree;
    color: @cBaseThree;
    line-height: 1.6;
  }
}

@media (max-width: 768px) {
  .home {
    padding: 20px 15px;

    &__title {
      font-size: 36px;
    }

    &__content {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    &__card {
      padding: 30px 20px;
    }
  }
}
</style>