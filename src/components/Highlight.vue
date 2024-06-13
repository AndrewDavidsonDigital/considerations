<script setup>
  defineProps({
    content: String,
  })

</script>

<template>
  <span class="rounded bg-gray-800 px-1 italics text-orange-500">{{ content }}</span>
</template>
