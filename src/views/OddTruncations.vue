<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import Highlight from '../components/Highlight.vue';

  const NEW_LINE_DELIMITER = "<br>";
  const LINES_TO_CLAMP = 3;

  // reactive state
  let singleParaTag = ref();
  let charScoping = ref();
  let firstTruncated = ref(-1);
  const baseHTML = "This is a multi-line paragraph with multiple sentence in a single `p` tag. <br> 2nd line This is a multi-line paragraph with multiple sentence in a single `p` tag.<br>3rd line This is a multi-line paragraph with multiple sentence in a single `p` tag.<br> 4th";

  onMounted(() => {
    // hacky ver
    const splitHTML = baseHTML.split(NEW_LINE_DELIMITER);
    const crimpedTitle = splitHTML[1];
    singleParaTag.value.title = crimpedTitle;

    // OMG maths . . .  send help
    const newLineIndecies: number[] = [];
    let running = 0;
    splitHTML.forEach(el => {
      running = running + el.length;
      newLineIndecies.push(running)
    });

    const fontSize = singleParaTag.value.computedStyleMap().get('font-size').value || 16;
    const width = singleParaTag.value.getBoundingClientRect().width;

    const myuu = calculateMyuu(fontSize, charScoping.value.getBoundingClientRect().width, charScoping.value.innerText.length);
    const size = calculateCPL(fontSize, myuu ,width);

    // drop 10 chars as we will never have exactly the full line due to word-wrap
    const truncationCharStart = (size - 10) * LINES_TO_CLAMP;

    for (let i = 0; i < newLineIndecies.length; i++){
      if (newLineIndecies[i] >= truncationCharStart){
        firstTruncated.value = i;
        break;
      }
    }

  });

  function generateTitle(index: number){
    let retval = '';
    const splitHTML = baseHTML.split(NEW_LINE_DELIMITER);
    retval = (splitHTML.splice(index)).join("\n");
    return retval;
  }

  function calculateMyuu(fontSize: number, lineWidth: number, charCount: number){
    console.debug(`Calculating Myuu: \n\tFontSize: ${fontSize}px\n\tLineWidth: ${lineWidth}\n\tCharCount: ${charCount}`);
    return (fontSize / (lineWidth / charCount));
  };

  function calculateCPL(fontSize: number, charConstant: number, tagWidth: number){
    console.debug(`Calculating CPL: \n\tFontSize: ${fontSize}px\n\tMyuu: ${charConstant}\n\tElementWidth: ${tagWidth}`);
    return (tagWidth / (fontSize / charConstant));
  };
</script>

<template>
  <section class="text-white text-left w-[80dvw] md:w-1/2 pb-5">
    <h2 class="text-xl">
      Issue:
    </h2>
    <p class="indent-5">
      Line-clamp truncations are relativly simple now but how can popovers be limited by removing full sentence that are already shown.
    </p>
    <h2 class="text-xl">
      Details:
    </h2>
    <p class="indent-5">
      Not knowing where in the text the truncation starts and if it is after an entire sentence or not is the problem
    </p>
    <h2 class="text-xl">
      Logic:
    </h2>
    <div>
      <p> class="indent-5">We can split on the new line delimiter and roll a <Highlight content="p" /> tag per row, at this we can also dynamically set the <Highlight content="title" /> to a join of all remaining rows texts<br>only requirement here is to know the following core piece of information:</p>
      <ul>
        <li class="list-disc list-inside">
          How many chars are expected to be displayed before truncation<Highlight content="Calcualte CPL" />
        </li>
        <li class="list-disc list-inside">
          What is the actual delimiter string for new lines <Highlight content="definable" />
        </li>
      </ul>
    </div>
  </section>
  <section class="flex flex-col w-fit gap-y-4 pb-10 px-5">
    <article class="overflow-hidden max-w-[0px]">
      <div
        ref="charScoping"
        class="-z-10 whitespace-nowrap w-fit"
        v-html="baseHTML.split(NEW_LINE_DELIMITER).join()"
      ></div>
    </article>
    <article>
      <h2>1 Single Paragraph tag, no hover</h2>
      <div class="border-orange-500 border-dashed border rounded line-clamp-3">
        <p class="max-w-[20rem] ">
          This is a multi-line paragraph with multiple sentence in a single `p` tag. <br>This is a multi-line paragraph with multiple sentence in a single `p` tag. This is a multi-line paragraph with multiple sentence in a single `p` tag.
        </p>
      </div>
    </article>
    <article>
      <h2>1 Single Paragraph tag, hover via JS cull 1st sentence</h2>
      <div class="border-orange-500 border-dashed border rounded line-clamp-3">
        <p
          ref="singleParaTag"
          class="max-w-[20rem]"
          v-html="baseHTML"
        ></p>
      </div>
    </article>
    <article>
      <h2>2 Seperate Paragraph tags, only 2nd para has hover,<br> no consideration for 3rd or 4th paragraph</h2>
      <div class="border-orange-500 border-dashed border rounded line-clamp-3">
        <p class="max-w-[20rem]">
          This is a multi-line paragraph with a single sentence in a `p` tag.
        </p>
        <p
          class="max-w-[20rem]"
          title="This is the 2nd sentence multi-line paragraph with a single sentence in a `p` tag."
        >
          This is the 2nd sentence multi-line paragraph with a single sentence in a `p` tag.
        </p>
      </div>
    </article>
    <article>
      <h2>N Separate Paragraph tags, only 2nd para has hover of all other <Highlight content="Complete" /></h2>
      <div class="border-orange-500 border-dashed border rounded line-clamp-3">
        <template
          v-for="line, index in baseHTML.split(NEW_LINE_DELIMITER)"
          :key="`2para_section__${index}`"
        >
          <p
            class="max-w-[20rem]"
            :title="index >= firstTruncated ? generateTitle(index) : ''"
            v-html="line"
          ></p>
        </template>
      </div>
    </article>
    <article>
      <h2>FullText</h2>
      <div class="border-orange-500 border-dashed border rounded">
        <p v-html="baseHTML"></p>
      </div>
    </article>
  </section>
</template>