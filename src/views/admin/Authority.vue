<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
onMounted(() => {
  console.info('=========mounted', useRoute().path)
})
</script>

<template>
  <div>
    <strong>
      {{ $t('menu.label.authorityManagement') }}
    </strong>
  </div>
</template>

<style scoped>

</style>
