<script setup lang="ts">

  type Props = 
  | {
      colour: 'text-orange-700' | 'text-emerald-700',
      content: 'foo' | 'bar' | 'baz';
    }
  | {
      content: String,
      colour?: never;
    }
  | {
      content?: never;
      colour: 'text-orange-500' | 'text-emerald-500',
    }

  defineProps<Props>();

</script>

<template>
  <span 
    :class="[
      'rounded bg-gray-800 px-1 italics',
      colour,
      { 'text-blue-500' : !colour },
    ]"
  >{{ content ? content : 'no content in props' }}</span>
</template>

