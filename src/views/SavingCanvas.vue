<script setup>
import html2canvas from 'html2canvas';
import { 
  ref,
  onMounted,
  onUnmounted,
  computed,
} from 'vue'
import { useDeviceStore } from "@/stores/device.js"
import { dataURItoBlob } from "@/util/image.js"
  
  // reactive state
  let button_1 = ref(null)
  let button_2 = ref(null)
  let linkRef = ref(null)
  let canvasRef = ref(null)
  let canvasDomDestinationRef = ref(null)
  let htmlToCanvasRef = ref(null)
  let supportsClipboardAsync = ref(false)
  let supportsClipboardSync = ref(false)
  const deviceStore = useDeviceStore()


  supportsClipboardAsync.value = !!(navigator.clipboard);
  supportsClipboardSync.value = !!(new ClipboardEvent('copy'));

  
  const canSuppportClipboard = computed(() => {
    return supportsClipboardAsync.value || supportsClipboardSync.value
  })

  function copyToClipboard(useDynamic){
    if (deviceStore.isIos){
      return
    }
    if (useDynamic){
      canvasDomDestinationRef.value.children[canvasDomDestinationRef.value.children.length-1].toBlob((blob) => dumpToClipboardAsync(blob));
    }else{
      canvasRef.value.toBlob((blob) => dumpToClipboardAsync(blob));
    }
  }

  async function copyFromClipboardIos(useDynamic){
    let dataUrl;
    if (useDynamic){
      dataUrl = canvasDomDestinationRef.value.children[canvasDomDestinationRef.value.children.length-1].toDataURL();
    }else{
      dataUrl = canvasRef.value.toDataURL();
    }
    const blobby = dataURItoBlob(dataUrl);
    await dumpToClipboardAsync(blobby);
  }

  async function dumpToClipboardAsync(blob){
    const data = [new ClipboardItem({ [blob.type]: blob })];
    await navigator.clipboard.write(data);
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
    <p class="tw-indent-5 tw-word-break">Turn the canvas element into a DataURL (`data:image/png;base64,iVBORw0KGgoAAAANSUhEU...`) and then push said DataURL as the HREF of an anchor, click anchor, then clear anchor HREF</p>
    <br>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tw-w-4 tw-h-4 tw-text-lime-500"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>
  </section>
  <section class="tw-flex tw-flex-col tw-gap-y-2 tw-text-white tw-pb-5">
    <article class="tw-flex tw-gap-x-2 tw-justify-around">
      <h2 class="tw-text-xl tw-text-orange-300">Is IOS?: </h2>
      <p class="tw-indent-5">{{deviceStore.isIos}}</p>      
    </article>
    <article class="tw-flex tw-gap-x-2 tw-justify-around">
      <h2 class="tw-text-xl tw-text-orange-300">Is Clipboard (Write) Supported: </h2>
      <p class="tw-indent-5">{{supportsClipboardAsync}}</p>      
    </article>
    <article class="tw-flex tw-gap-x-2 tw-justify-around">
      <h2 class="tw-text-xl tw-text-orange-300">Is Clipboard (Read) Supported: </h2>
      <p class="tw-indent-5">{{supportsClipboardSync}}</p>      
    </article>
  </section>
  <section class="tw-flex tw-flex-col tw-gap-y-2 tw-text-black tw-pb-5">
    <article class="tw-flex tw-gap-x-2 tw-justify-around">
      <button
        v-if="canSuppportClipboard"
        ref="button_1"
        class="tw-px-2 tw-bg-slate-400 tw-rounded-md tw-border-2 tw-border-orange-400" 
        type="button"
        @click="copyToClipboard(false)"
        @touchend="copyFromClipboardIos(false)">Clipbaord - Static</button>
      <button
        v-if="canSuppportClipboard"
        ref="button_2"
        class="tw-px-2 tw-bg-slate-400 tw-rounded-md tw-border-2 tw-border-orange-400" 
        type="button"
        @click="copyToClipboard(true)"
        @touchend="copyFromClipboardIos(true)">Clipbaord - Converted</button>
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

<style scoped scss>
  .tw-word-break{
    word-break: break-word;
  }
</style>