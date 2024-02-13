<template>
  <div class="wrap">
    <div class="card">
      <div class="content">
        <div class="title">
          <div class="title__bold">suspension</div>
          <div class="title__light">parts</div>
          <div class="title__sale">20 % off</div>
        </div>
        <button class="button">shop now</button>
      </div>
    </div>
    <div style="background-image: url('/car2.jpg')" class="card">
      <div class="shadow" />
      <div class="content">
        <div class="title">
          <div class="title__bold">auto</div>
          <div class="title__light">lighting</div>
        </div>
        <button class="button">shop now</button>
      </div>
    </div>
    <div style="background-image: url('/car1.jpg')" class="card">
      <div class="shadow" />
      <div class="content">
        <div class="title">
          <div class="title__bold">car</div>
          <div class="title__light">spoilers</div>
          <div class="title__sale">50 % off</div>
        </div>
        <button class="button">shop now</button>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/css';

export default {
  name: 'SpecialCards',
}
</script>

<style scoped lang="scss">
  .wrap {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .card {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    background-position: center;
    background-size: cover;

    &:first-child {
      background: var(--brand);
    }
    &:nth-child(2) {
      .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 20px;
      }
      .title {
        display: flex;
        flex-direction: column;
        align-items: center;

        &__bold {
          font-size: 54px;
        }
      }
    }
    &:last-child {
      .title__sale {
        color: var(--brand);
      }
      .button {
        background: black;
      }
    }
  }
  .shadow {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.5;
  }
  .content {
    position: absolute;
    width: max-content;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;

    .title {
      width: 100%;

      &__bold {
        font-size: 46px;
        font-weight: bold;
        text-transform: uppercase;
      }
      &__light {
        font-size: 48px;
        font-weight: 100;
        text-transform: uppercase;
      }
      &__sale {
        font-size: 80px;
        font-weight: bold;
      }
    }

    .button {
      border: 1px solid white;
      background: transparent;
      padding: 12px 20px;
      color: white;
      margin-top: 12px;
    }
  }
</style>
