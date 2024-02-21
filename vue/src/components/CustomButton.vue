<template>
  <button class="button">
    <slot>
      HELLO
    </slot>
  </button>
</template>

<script>
export default {
  name: 'CustomButton'
}
</script>

<style>
.button {
  margin-left: 20px;
  height: 35px;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  border-radius: 0;
  border: 0;
  outline: #000 solid 2px;
  position: relative;
  z-index: 0;
}

.button::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #ecc956;
  z-index: -1;
  transition: all 0.45s ease 0.05s;
  left: -7px;
  bottom: -7px;
}

.button:hover::after {
    transition: all 0.45s ease 0.05s;
    left: 7px;
    bottom: 7px;
}


</style>