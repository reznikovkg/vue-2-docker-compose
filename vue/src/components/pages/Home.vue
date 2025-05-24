<template>
  <PageLayout>
    <h1 class="home__head">Create your own puzzle</h1>
    <p class="home__text">On this page you can create a puzzle from any photo from your device</p>
    <div class="home">
      <div
        class="home__upload"
        @dragover.prevent="(event) => event.preventDefault()"
        @drop.prevent="(event) => onFileSelection(event)"
      >
        <label>
          <input
            id="input-image"
            accept=".jpg,.png,.webp"
            type="file"
            name="file"
            :style="{display: 'none'}"
            @change="(event) => onFileSelection(event)"
          >
          <span class="home__upload__input">Select a photo or drag it here</span>
        </label>
      </div>
    </div>
    <div class="home">
      <div class="home__number">
        <label>
          <input
            v-model="puzzleSize"
            type="number"
            class="home__number__input"
            placeholder="Enter number of pieces (e.g., 3x3)"
            @change="() => updatePuzzleCount(puzzleSize)"
          >
        </label>
      </div>
    </div>
    <div class="home__text">or choose one of these levels</div>
    <div class="home">
      <button
        class="home__level-button"
        @click="() => chooseLevel(3, imageOne)"
      >
        Easy
      </button>
      <button
        class="home__level-button"
        @click="() => chooseLevel(5, imageTwo)"
      >
        Medium
      </button>
      <button
        class="home__level-button"
        @click="() => chooseLevel(10, imageThree)"
      >
        Hard
      </button>
    </div>
    <div class="home">
      <button
        class="home__create-button"
        @click="() => createPuzzle()"
      >
        Create
      </button>
    </div>
    <h1
      v-if="getImageUrl"
      class="home__head"
    >
      Preview:
    </h1>
    <div
      v-if="getImageUrl"
      class="home"
    >
      <img
        :src="getImageUrl"
        class="home__preview"
        alt="Preview Image"
      />
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import { ROUTER_NAMES } from "@/router/routes";
import { mapGetters, mapActions, mapMutations } from "vuex";
import HelpModal from "@/components/modals/HelpModal.vue";
import PineForest from '@/assets/PineForest.webp';
import MonaLisa from '@/assets/MonaLisa.webp';
import PearlEarring from '@/assets/PearlEarring.webp';

export default {
  name: ROUTER_NAMES.HOME,
  components: {
    PageLayout,
  },
  data () {
    return {
      puzzleSize: null,
      imageOne: PearlEarring,
      imageTwo: MonaLisa,
      imageThree: PineForest
    }
  },
  computed: {
    ...mapGetters('image', [
      'getImageUrl',
      'getPuzzleCount'
    ])
  },
  created () {
    const savedImageUrl = localStorage.getItem('imageUrl')
    if (savedImageUrl) {
      this.updateImage(JSON.parse(savedImageUrl))
    }
  },
  methods: {
    ...mapActions('image', [
      'updateImage',
      'updatePuzzleCount',
      'loadImage'
    ]),
    ...mapMutations('modals', [
      'openModal'
    ]),
    onFileSelection (event) {
      let file
      if (event.target.files) {
        file = event.target.files[0]
      } else if (event.dataTransfer) {
        file = event.dataTransfer.files[0]
      }
      this.loadImage(file)
    },
    chooseLevel(size, image) {
      this.loadImage(image)
      this.puzzleSize = size
      this.updatePuzzleCount(this.puzzleSize)
    },
    createPuzzle () {
      if (this.getImageUrl && this.getPuzzleCount >= 2) {
        this.$router.push({name: ROUTER_NAMES.PUZZLE})
      }
      if (!this.getImageUrl) {
        this.openModal({
          component: HelpModal,
          params: {
            title: 'Warning',
            message: 'Select an image'
          }
        })
      }
      if (!(this.getPuzzleCount >= 2)) {
        this.openModal({
          component: HelpModal,
          params: {
            title: 'Warning',
            message: 'Enter the correct number of puzzles (more than 1)'
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.home {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  &__head {
    font-size: 32px;
    text-align: center;
    margin-top: 30px;
    font-family: @ffThree;
  }
  &__text {
    font-size: 16px;
    text-align: center;
    margin-top: 20px;
    font-family: @ffThree;
  }
  &__upload {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    border: 2px dashed @cBorderOne;
    padding: 5% 3%;
    border-radius: 10px;
    background-color: @cBaseOne;
    &__input {
      font-size: 16px;
      color: gray;
      width: 100%;
      cursor: pointer;
      font-family: @ffThree;
    }
  }
  &__number {
    width: 40%;
    border: 2px dashed @cBorderOne;
    padding: 2% 3%;
    border-radius: 10px;
    background-color: @cBaseOne;
    &__input {
      width: 100%;
      border: none;
      outline: none;
      text-align: center;
      font-size: 16px;
      color: gray;
      background-color: @cBaseOne;
      font-family: @ffThree;
    }
  }
  &__preview {
    width: 46%;
    border-radius: 10px;
  }
  &__level-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 14%;
    padding: 1% 2%;
    border: none;
    border-radius: 10px;
    margin-left: 1%;
    margin-right: 1%;
    font-size: 16px;
    color: white;
    background-color: #7C7C7C;
    &:hover {
      background-color: #707070;
    }
  }
  &__create-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 46%;
    padding: 2% 3%;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    color: white;
    background-color: @cBaseFive;
    &:hover {
      background-color: #7e2738;
    }
  }
}
</style>
