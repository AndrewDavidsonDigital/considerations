<script setup>
import html2canvas from 'html2canvas';
import { 
  ref,
  onMounted,
} from 'vue'
  
  // reactive state
  let linkRef = ref(null)
  let canvasRef = ref(null)
  let canvasDomDestinationRef = ref(null)
  let htmlToCanvasRef = ref(null)
  let supportsClipboard = ref(false)

  supportsClipboard.value = !!(navigator.clipboard);


  function copyToClipboard(useDynamic = false){
    if (useDynamic){
      canvasDomDestinationRef.value.children[canvasDomDestinationRef.value.children.length-1].toBlob((blob) => dumpToClipboard(blob));
    }else{
      canvasRef.value.toBlob((blob) => dumpToClipboard(blob));
    }
  }

  function dumpToClipboard(blob){
    const item = new ClipboardItem({ "image/png": blob });
    navigator.clipboard.write([item]);
  }

  function saveAndDownload(useDynamic = false){
    let dataUrl;
    if (useDynamic){
      dataUrl = canvasDomDestinationRef.value.children[canvasDomDestinationRef.value.children.length-1].toDataURL();
    }else{
      dataUrl = canvasRef.value.toDataURL();
    }
    linkRef.value.href = dataUrl;
    linkRef.value.click();
    linkRef.value.href = '';
  }

  onMounted(() => {
    const ctx = canvasRef.value.getContext("2d");

    ctx.fillStyle = "green";
    ctx.fillRect(10, 10, 150, 100);

    html2canvas(document.querySelector("#htmlToCanvasRef")).then(canvas => {
      canvasDomDestinationRef.value.appendChild(canvas)
    });
  });

</script>
  
<template>
  <section ref="htmlToCanvasRef" id="htmlToCanvasRef" class="tw-text-white tw-text-left tw-w-1/2 tw-pb-5" style="background: #181818;">
    <h2 class="tw-text-xl tw-text-orange-300">Issue: </h2>
    <p class="tw-indent-5">How can we share a html-5 canvas</p>
    <h2 class="tw-text-xl tw-text-orange-300">Details: </h2>
    <p class="tw-indent-5">Need to find a way to save and download a html-5 canvas, or copy to the users clipboard</p>
    <h2 class="tw-text-xl tw-text-orange-300">Logic: </h2>
    <h3 class="tw-text-lg tw-text-orange-300">Clipboard: </h3>
    <p class="tw-indent-5">Turn the canvas element into a BLOB asset and then turn said blob asset into a ClipboardItem</p>
    <h3 class="tw-text-lg tw-text-orange-300">Download: </h3>
    <p class="tw-indent-5">Turn the canvas element into a DataURL (`data:image/png;base64,iVBORw0KGgoAAAANSUhEU...`) and then push said DataURL as the HREF of an anchor, click anchor, then clear anchor HREF</p>
  </section>
  <section class="tw-flex tw-flex-col tw-gap-y-2 tw-text-black tw-pb-5">
    <article class="tw-flex tw-gap-x-2 tw-justify-around">
      <button
        v-if="supportsClipboard"
        class="tw-px-2 tw-bg-slate-400 tw-rounded-md tw-border-2 tw-border-orange-400" 
        type="button"
        @click="copyToClipboard(false)">Clipbaord - Static</button>
      <button
        v-if="supportsClipboard"
        class="tw-px-2 tw-bg-slate-400 tw-rounded-md tw-border-2 tw-border-orange-400" 
        type="button"
        @click="copyToClipboard(true)">Clipbaord - Converted</button>
      <button 
        class="tw-px-2 tw-bg-slate-400 tw-rounded-md tw-border-2 tw-border-orange-400" 
        type="button"
        @click="saveAndDownload(false)">Download - Static</button>
      <button 
        class="tw-px-2 tw-bg-slate-400 tw-rounded-md tw-border-2 tw-border-orange-400" 
        type="button"
        @click="saveAndDownload(true)">Download - Converted</button>
    </article>
    <a ref="linkRef" download="download.png" class="tw-hidden"></a>
  </section>  
  <section class="md:tw-w-[50vw] tw-aspect-square tw-flex tw-flex-col tw-mix-blend-lighten">
    <article class="tw-flex tw-justify-around tw-items-center">
    Here be canvases
    </article>
    <article class="tw-flex tw-justify-around tw-items-center">
      <div>
        Static
      </div>
      <div>
        Converted
      </div>
    </article>
    <article ref="canvasDomDestinationRef" class="tw-flex tw-gap-x-2 tw-justify-around tw-items-center">
      <canvas ref="canvasRef"></canvas>
    </article>  
  </section>
</template>