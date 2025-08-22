<script setup lang="ts">
  import { ref } from 'vue';
  import Highlight from '../components/Highlight.vue';
  import Pill from '@/components/Pill.vue';

  interface ILink {
    label: string;
    destination: string;
    isExternal: boolean;
  }
  const navItems = ref<Array<ILink>>([
    {
      label: "Home",
      destination: "/",
      isExternal: false,
    },
    {
      label: "Blog",
      destination: "/blog",
      isExternal: false,
    },
    {
      label: "About",
      destination: "/about",
      isExternal: false,
    },
  ])

  const tagList = ref<string[]>([
    'anchor-name',
    'position-anchor',
    'anchor()',
    'corner-shape',
    'squircle',
  ])

</script>

<template>
  <section class="text-white text-left w-[80dvw] md:w-1/2 pb-5">
    <h2 class="text-xl">
      Thought:
    </h2>
    <p class="indent-5">
      Effects on Navigation elements can be tricky but also more <Highlight content="interesting" />.
    </p>
    <h2 class="text-xl">
      Tags:
    </h2>
    <div class="flex gap-2">
      <Pill 
        v-for="tag,index in tagList" 
        :key="`tag_${index}`" 
        :copy="tag"
      />
    </div>
    <h2 class="text-xl">
      Logic:
    </h2>
    <p class="indent-5">
      The logic here is fairly simple we have a pseudo element (after), on our nav, which we ar shaping to the size of our target (the underlying anchor tag). we do this by using the calculated values of the anchor'ed element via <Highlight content="anchor()" />. After that its all just transition / style fudging to get something that feels nice
    </p>
    <h2 class="text-xl text-orange-300">
      Source:
    </h2>
    <p class="indent-5">
      Kevin Powell https://www.youtube.com/watch?v=8_NQ7ARXz8c
    </p>
  </section>
  <section class="flex flex-col gap-y-8 justify-start h-[150%] mt-20 w-full px-5">
    <nav 
      class="
        flex max-w-[1000px] mx-auto
        rounded-lg
        bg-slate-800/50
        hover-wrapper
      "
    >
      <a 
        v-for="item, index in navItems"
        :key="`nav_el_${index}`"
        class="px-6 py-4 bg-unset hover:!text-black"
        :href="item.destination"
        :target="item.isExternal ? '_blank' : 'none'"
        @click.stop.prevent
      >
        {{ item.label }}
      </a>
    </nav>
  </section>
</template>

<style lang="css" scoped>
  @reference "@/styles/main.css";

  @supports not (anchor-name: none){
    .hover-wrapper > a {
      @apply hover:!bg-emerald-500;
    }
  }

  @supports(anchor-name: none) and (top: anchor(bottom)){
    .bg-unset {
      background: unset;
    }

    .hover-wrapper {
      anchor-name: --anchor-name;
      @apply isolate;

      &>a:hover {
        anchor-name: --anchor-name;
      }

      &::after {
        content:'';
        @apply absolute;
        @apply rounded-2xl;

        @supports(corner-shape: squircle){
          corner-shape: squircle;
        }

        @apply bg-emerald-500/75;

        z-index: -1;
        left: calc(anchor(left) + 1rem);
        right: calc(anchor(right) + 1rem);
        bottom: calc(anchor(bottom) + 2px);
        top: calc(anchor(bottom) - 6px);

        position-anchor: --anchor-name;

        transition: 500ms;
      }
      
      &:has(a:hover)::after {
        left: calc(anchor(left) + 6px);
        right: calc(anchor(right) + 6px);
        top: calc(anchor(top) + 6px);
        bottom: calc(anchor(bottom) + 6px);
        @apply ease-[linear(0,1_44.7%,0.898_51.8%,0.874_55.1%,0.866_58.4%,0.888_64.3%,1_77.4%,0.98_84.5%,1)];
      }
    }
    
  }
</style>