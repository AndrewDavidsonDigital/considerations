<script setup>
  import { ref } from 'vue'
  import Highlight from '../components/Highlight.vue';
  import Multiselect from 'vue-multiselect';


  const multiselector = ref();
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
  <section class="flex flex-col w-fit gap-y-8 pb-10">
    <article >
      <p>Native Select (doesn't support placeholders)</p>
      <select class="text-slate-700" v-if="options.size > 0" >
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
      <p>Standard Typeahead Selector without placeholder</p>
      <p class="ml-5">Note that this looks horrible and can leave the user confused</p>
      <section class="absolute">
        <div 
          aria-hidden
          class="w-full h-6 px-2 absolute z-1 opacity-0 truncate cursor-pointer"
          :class="[
            { '!opacity-50' : resultValue === null },
          ]"
          @click.prevent="e => multiselector.activate()"
        >I'm a fake placeholder adasdasd</div>
        <multiselect
          ref="multiselector"
          v-model="resultValue"
          :options="[...options.keys()]"
          placeholder=""
          class="w-fit min-w-40"
        />
      </section>
    </article>
  </section>
</template>