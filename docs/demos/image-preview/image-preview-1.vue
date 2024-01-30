<template>
  <div class="mu-preview__box">
    <img
      v-for="(img, i) in images"
      :key="i"
      :src="img.url"
      style="width: 100px; height: 100px"
      @click="show = !show"
    />
  </div>
  <mumu-image-preview v-model:show="show" :list="images" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import img from './images/logo.jpg'
  import facemask from './images/3M.png'
  import heroes from './images/heroes.gif'
  import ninja from './images/ninja.png'
  import dlm from './images/dlm.jfif'

  const show = ref(false)
  const images = ref([
    {
      url: ninja,
      title: 'ninja',
    },
    {
      url: img,
      title: 'LOGO',
    },
    {
      url: facemask,
      title: '3M',
    },
    {
      url: heroes,
      title: 'heroes',
    },
    {
      url: dlm,
      title: 'dlm',
    },
  ])
</script>

<style scoped lang="scss">
  .mu-preview__box {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    img {
      margin-right: 10px;
      cursor: pointer;
    }
  }
</style>
