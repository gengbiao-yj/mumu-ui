<template>
  <div class="mumu-icon-list">
    <mumu-icon
      v-for="(icon, i) in icons"
      :key="i"
      :color="icon.color"
      :height="icon.height"
      :icon="icon.icon"
      :width="icon.width"
    />
  </div>
</template>

<script lang="ts" setup>
  const icons = [
    { color: '#00a8ff', icon: 'ep:add-location', width: '1em', height: '1em' },
    {
      color: '#9c88ff',
      icon: 'ep:add-location',
      width: '1.5em',
      height: '1.5em',
    },
    { color: '#fbc531', icon: 'ep:add-location', width: '2em', height: '2em' },
    {
      color: '#4cd137',
      icon: 'ep:add-location',
      width: '2.5em',
      height: '2.5em',
    },
    { color: '#487eb0', icon: 'ep:add-location', width: '3em', height: '3em' },
  ]
</script>

<style lang="scss" scoped>
  .mumu-icon-list {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-start;
    & > * {
      margin-right: 1em;
    }
  }
</style>
