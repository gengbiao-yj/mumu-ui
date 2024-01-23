<template>
  <div>
    <mumu-icon
      color="#00a8ff"
      height="32px"
      icon="ep:add-location"
      :inline="true"
      width="32px"
    />
    <span>phone inline:true;</span>
    <mumu-icon
      color="#fbc531"
      height="32px"
      icon="ep:add-location"
      :inline="false"
      width="32px"
    />
    <span>phone inline:false</span>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
  div {
    svg {
      display: inline-block;
      margin: 1px;
      border-bottom: 4px solid #eca5a5;
    }
  }
</style>
