<template>
  <div>
    <label>水平翻转：</label>
    <mumu-icon
      color="#00a8ff"
      height="32px"
      icon="ep:bicycle"
      :inline="true"
      width="32px"
    />
    <mumu-icon
      color="#fbc531"
      :h-flip="true"
      height="32px"
      icon="ep:bicycle"
      :inline="true"
      width="32px"
    />
  </div>
  <div>
    <label>垂直翻转：</label>
    <mumu-icon
      color="#00a8ff"
      height="32px"
      icon="ep:finished"
      :inline="true"
      width="32px"
    />
    <mumu-icon
      color="#fbc531"
      height="32px"
      icon="ep:finished"
      :inline="true"
      :v-flip="true"
      width="32px"
    />
  </div>
  <div>
    <label>水平垂直翻转：</label>
    <mumu-icon
      color="#00a8ff"
      height="32px"
      icon="ep:video-camera-filled"
      :inline="true"
      width="32px"
    />
    <mumu-icon
      color="#fbc531"
      :h-flip="true"
      height="32px"
      icon="ep:video-camera-filled"
      :inline="true"
      :v-flip="true"
      width="32px"
    />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
  svg {
    display: inline-block;
  }
</style>
