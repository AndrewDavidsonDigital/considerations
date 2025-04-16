<script setup lang="ts">
  import { ref } from 'vue'
  import Highlight from '../components/Highlight.vue';
  import Multiselect from 'vue-multiselect';


  const multiselector_abs = ref();
  const multiselector_grid = ref();
  const resultValue = ref(null);
  const options = ref(new Map([
    ['first', "First Value"],
    ['second', "Second Value"],
    ['third', "Third Value"]
  ]));


</script>

<template>
  <section class="text-white text-left w-1/2 pb-5">
    <h2 class="text-xl">Issue: </h2>
    <p class="indent-5">Native <Highlight content="placeholders"/> for select tags don't play nice with assistive technologies thus shouldn't be used. This is obviously <Highlight content="less accessible"/>for those NOT using such technologies (~90%+) of the users</p>
    <h2 class="text-xl">Details: </h2>
    <p class="indent-5">If the native html placeholder attributes cant be used then we should be able to replicate this with some non-accessible (aria-hidden) content that is ephemeral to the user</p>
    <h2 class="text-xl">Logic: </h2>
    <p class="indent-5">Placeholder content in itself should just be able to be a z-index'd higher element that has its opacity toggled based on a rule-set relative to the interaction of the underlying select element</p>
  </section>
  <section class="flex flex-col w-fit gap-y-8 justify-start h-[150%] mt-20">
    <article >
      <p><label for="nativeSelect_id">Native Select (doesn't support placeholders)</label></p>
      <select id="nativeSelect_id" class="text-slate-700 bg-slate-900 border border-emerald-600 rounded-sm" v-if="options.size > 0" >
        <template v-for="(key, index) in [...options.keys()]" :key="`${key}_${index}`">
          <option :value="key" :selected="index === 0">{{options.get(key)}}</option>
        </template>
      </select>
    </article>
    <article>
      <p>Standard Typeahead Selector with placeholder</p>
      <p class="ml-5">Note that both a visual <Highlight content="span"/> and the input field on the input box are both set</p>
      <section class="absolute">
        <multiselect
          v-model="resultValue"
          :options="[...options.keys()]"
          placeholder="I'm some placeholder text"
          class="w-fit min-w-40"
        />
      </section>
    </article>
    <article>
      <p>Standard Typeahead Selector without placeholder - Absolute positioning</p>
      <p class="ml-5">Note that this looks horrible and can leave the user confused</p>
      <section class="absolute">
        <div 
          aria-hidden
          class="w-full h-6 px-2 absolute z-1 opacity-0 truncate cursor-pointer"
          :class="[
            { '!opacity-50' : resultValue === null },
          ]"
          @click.prevent="e => multiselector_abs.activate()"
        >I'm a fake placeholder adasdasd</div>
        <multiselect
          ref="multiselector_abs"
          v-model="resultValue"
          :options="[...options.keys()]"
          placeholder=""
          class="w-fit min-w-40"
        />
      </section>
    </article>
    <article>
      <p>Standard Typeahead Selector without placeholder - Grid Stacking</p>
      <section class='w-min grid [grid-template-areas:_"stack"] *:[grid-area:_stack]'>
        <div 
          aria-hidden
          class="w-full h-6 px-2 z-1 opacity-0 truncate cursor-pointer"
          :class="[
            { '!opacity-50' : resultValue === null },
          ]"
          @click.prevent="e => multiselector_grid.activate()"
        >I'm a fake placeholder adasdasd</div>
        <multiselect
          ref="multiselector_grid"
          v-model="resultValue"
          :options="[...options.keys()]"
          placeholder=""
          class="w-full min-w-40"
        />
      </section>
    </article>
  </section>
</template>