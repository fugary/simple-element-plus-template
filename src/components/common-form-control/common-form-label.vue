<script setup>
defineProps({
  component: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <div class="common-form-label">
    <slot />
    <component
      :is="component"
      v-if="component"
      v-bind="$attrs"
    />
  </div>
</template>

<style scoped>

</style>
