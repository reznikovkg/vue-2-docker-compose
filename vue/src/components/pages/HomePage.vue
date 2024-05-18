<template>
  <PageLayout>
    <div class="wide-bar">
      <div class="wide-bar__text">
        <div class="wide-bar__text__title">
          Create your own indoor oasis
        </div>
        <div class="wide-bar__text__subtitle">
          Official Herschel stockist Australian warranty assistance & support Australian shipping & returns.
        </div>
      </div>
      <img class="side-image" src="https://www.liustudentsecondhand.se/pictures/pexels-catherine-augustin-3049121.jpg" />
    </div>

    <div class="spacer"></div>

    <div class="basic-title">
      Featured plants
    </div>
    <ListContainer :plants="plants"/>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import ListContainer from '@/components/parts/ListContainer.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'HomePage',
  computed: {
    ...mapGetters(
      'plants', [ 'getPlants', 'getSearchedPlants' ]
    ),
    plants () {
      return this.getPlants
    },
    currentRoute () {
      return this.$route.name
    }
  },
  components: {
    PageLayout,
    ListContainer
  },
 }
</script>

<style scoped lang="less">
.wide-bar {
  width: 100%;
  height: 500px;
  background-color: #bcd8c1;
  position: relative;
  min-width: 1000px;

  &__text {
    &__title {
      font-size: 30pt;
      font-weight: 700;
    }

    &__subtitle {
      font-size: 16pt;
      margin-top: 20px;
    }

    position: relative;
    margin-right: 60%;
    padding: 20px;
    top: 150px;
    left: 100px;
    right: 50px;
    min-width: 400px;
  }
}

.side-image {
  height: 530px;
  width: 400px;
  position: absolute;
  top: 30px;
  left: 60%;
}

.spacer {
  height: 60px;
}

.basic-title {
  margin-top: 50px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  font-size: 25pt;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 700;
}
</style>
