<script setup lang="ts">

  interface Props {
    content: String,
  }

  const props = defineProps<Props>()

</script>

<template>
  <span class="rounded bg-gray-800 px-1 italics text-orange-500">{{ props.content }}</span>
</template>
