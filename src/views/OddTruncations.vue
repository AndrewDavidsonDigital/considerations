<script setup>
  import { onMounted, ref } from 'vue'
  import Highlight from '../components/Highlight.vue';

  const NEW_LINE_DELIMITER = "<br>";
  const LINES_TO_CLAMP = 3;

  // reactive state
  let singleParaTag = ref();
  let charScoping = ref();
  let firstTruncated = ref(-1);
  const baseHTML = "This is a multi-line paragraph with multiple sentense in a single `p` tag. <br> 2nd line This is a multi-line paragraph with multiple sentense in a single `p` tag.<br>3rd line This is a multi-line paragraph with multiple sentense in a single `p` tag.<br> 4th";

  onMounted(() => {
    // hacky ver
    const splitHTML = baseHTML.split(NEW_LINE_DELIMITER);
    const crimpedTitle = splitHTML[1];
    singleParaTag.value.title = crimpedTitle;

    // OMG maths . . .  send help
    const newLineIndecies = [];
    let running = 0;
    splitHTML.forEach(el => {
      running = running + el.length;
      newLineIndecies.push(running)
    });

    const fontSize = singleParaTag.value.computedStyleMap().get('font-size').value || 16;
    const width = singleParaTag.value.getBoundingClientRect().width;

    const myu = calculateMyuu(fontSize, charScoping.value.getBoundingClientRect().width, charScoping.value.innerText.length);
    const size = calculateCPL(fontSize, myu ,width);

    // drop 10 chars as we will never have exactly the full line due to word-wrap
    const truncationCharStart = (size - 10) * LINES_TO_CLAMP;

    for (let i = 0; i < newLineIndecies.length; i++){
      if (newLineIndecies[i] >= truncationCharStart){
        firstTruncated.value = i;
        break;
      }
    }

  });

  function generateTitle(index){
    let retval = '';
    const splitHTML = baseHTML.split(NEW_LINE_DELIMITER);
    retval = (splitHTML.splice(index)).join("\n");
    return retval;
  }

  function calculateMyuu(fontSize, lineWidth, charCount){
    console.debug(`Calculating Myuu: \n\tFontSize: ${fontSize}px\n\tLineWidth: ${lineWidth}\n\tCharCount: ${charCount}`);
    return (fontSize / (lineWidth / charCount));
  };

  function calculateCPL(fontSize, charConstant, tagWidth){
    console.debug(`Calculating CPL: \n\tFontSize: ${fontSize}px\n\tMyuu: ${charConstant}\n\tElementWidth: ${tagWidth}`);
    return (tagWidth / (fontSize / charConstant));
  };
</script>

<template>
  <section class="text-white text-left w-1/2 pb-5">
    <h2 class="text-xl">Issue: </h2>
    <p class="indent-5">Line-clamp truncations are relativly simple now but how can popovers be limited by removing full sentense that are already shown.</p>
    <h2 class="text-xl">Details: </h2>
    <p class="indent-5">Not knowing where in the text the truncation starts and if it is after an entire sentense or not is the problem</p>
    <h2 class="text-xl">Logic: </h2>
    <p class="indent-5">We can split on the new line delimiter and roll a <Highlight content="p"/> tag per row, at this we can also dynamically set the <Highlight content="title"/> to a join of all remaining rows texts<br>only requirement here is to know the following core piece of information:<ul>
      <li class="list-disc list-inside">How many chars are expected to be displayed before truncation<Highlight content="Calcualte CPL"/></li>
      <li class="list-disc list-inside">What is the actual delimiter string for new lines <Highlight content="definable"/></li>
    </ul></p>
  </section>
  <section class="flex flex-col w-fit gap-y-4 pb-10">
    <article class="overflow-hidden max-w-[0px]">
      <div class="-z-10 whitespace-nowrap w-fit" v-html="baseHTML.split(NEW_LINE_DELIMITER).join()" ref="charScoping"></div>
    </article>
    <article>
      <h2>1 Single Paragraph tag, no hover</h2>
      <div class="border-orange-500 border-dashed border rounded line-clamp-3">
        <p class="max-w-[20rem] ">This is a multi-line paragraph with multiple sentense in a single `p` tag. <br>This is a multi-line paragraph with multiple sentense in a single `p` tag. This is a multi-line paragraph with multiple sentense in a single `p` tag. </p>
      </div>
    </article>
    <article>
      <h2>1 Single Paragraph tag, hover via JS cull 1st sentense</h2>
      <div class="border-orange-500 border-dashed border rounded line-clamp-3">
        <p class="max-w-[20rem]" ref="singleParaTag" v-html="baseHTML"></p>
      </div>
    </article>
    <article>
      <h2>2 Seperate Paragraph tags, only 2nd para has hover,<br> no consideration for 3rd or 4th paragraph</h2>
      <div class="border-orange-500 border-dashed border rounded line-clamp-3">
        <p class="max-w-[20rem]">This is a multi-line paragraph with a single sentense in a `p` tag.</p>
        <p class="max-w-[20rem]" title="This is the 2nd sentense multi-line paragraph with a single sentense in a `p` tag.">This is the 2nd sentense multi-line paragraph with a single sentense in a `p` tag.</p>
      </div>
    </article>
    <article>
      <h2>N Seperate Paragraph tags, only 2nd para has hover of all other <Highlight content="Complete"/></h2>
      <div class="border-orange-500 border-dashed border rounded line-clamp-3">
        <template v-for="line, index in baseHTML.split(NEW_LINE_DELIMITER)">
          <p class="max-w-[20rem]" v-html="line" :title="index >= firstTruncated ? generateTitle(index) : ''"></p>
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