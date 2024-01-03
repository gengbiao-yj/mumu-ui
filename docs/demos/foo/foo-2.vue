<template>
  <mumu-foo :msg="msg" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const msg = ref('hello custom component')
</script>
