<script setup lang="ts">
  import html2canvas from 'html2canvas';
  import { 
    ref,
    onMounted,
    computed,
    onUnmounted,
  } from 'vue'
  import { useDeviceStore } from "@/stores/device";
  import { dataURItoBlob } from "@/util/image";
  
  // reactive state
  let button_1 = ref<HTMLButtonElement>()
  let button_2 = ref<HTMLButtonElement>()
  let linkRef = ref<HTMLAnchorElement>()
  
  let canvasRef = ref<HTMLCanvasElement>()
  let canvasDomDestinationRef = ref<HTMLElement>()

  let htmlToCanvasRef = ref<HTMLElement>()

  let supportsClipboardAsync = ref(false)
  let supportsClipboardSync = ref(false)

  const deviceStore = useDeviceStore()


  supportsClipboardAsync.value = !!(navigator.clipboard);
  supportsClipboardSync.value = !!(new ClipboardEvent('copy'));

  
  const canSuppportClipboard = computed(() => {
    return supportsClipboardAsync.value || supportsClipboardSync.value
  })

  function copyToClipboard(useDynamic: boolean){
    if (deviceStore.isIos){
      return
    }
    if (useDynamic){
      (canvasDomDestinationRef.value?.children[canvasDomDestinationRef.value.children.length-1] as HTMLCanvasElement).toBlob((blob) => dumpToClipboardAsync(blob));
    }else{
      canvasRef.value?.toBlob((blob) => dumpToClipboardAsync(blob));
    }
  }

  async function copyFromClipboardIos(useDynamic: boolean){
    let dataUrl;
    if (useDynamic && canvasDomDestinationRef.value){
      dataUrl = (canvasDomDestinationRef.value.children[canvasDomDestinationRef.value.children.length-1] as HTMLCanvasElement).toDataURL();
    }else{
      dataUrl = canvasRef.value?.toDataURL();
    }

    if (!dataUrl){
      return;
    }

    const blobby = dataURItoBlob(dataUrl);
    await dumpToClipboardAsync(blobby);
  }

  async function dumpToClipboardAsync(blob: Blob | null){
    if (!blob) {
      return;
    }
    const data = [new ClipboardItem({ [blob.type]: blob })];
    await navigator.clipboard.write(data);
  }
  
  function saveAndDownload(useDynamic:boolean = false){
    let dataUrl;
    if (useDynamic){
      dataUrl = (canvasDomDestinationRef.value?.children[canvasDomDestinationRef.value.children.length-1] as HTMLCanvasElement).toDataURL();
    }else{
      dataUrl = canvasRef.value?.toDataURL();
    }
    if (!dataUrl || !(linkRef.value)) {
      return;
    }
    linkRef.value.href = dataUrl;
    linkRef.value.click();
    linkRef.value.href = '';
  }

  onUnmounted(() => {
    document.body.classList.remove("bg-default");
  });

  onMounted(() => {
    document.body.classList.add("bg-default");
    const ctx = canvasRef.value?.getContext("2d");
    console.log(ctx);
    if (!ctx) {
      return;
    }

    ctx.fillStyle = "green";
    ctx.fillRect(10, 10, 150, 100);

    html2canvas(document.querySelector("#htmlToCanvasRef") as HTMLCanvasElement).then(canvas => {
      canvasDomDestinationRef.value?.appendChild(canvas)
    });
  });

</script>
  
<template>
  <section
    id="htmlToCanvasRef"
    ref="htmlToCanvasRef"
    class="text-white text-left w-1/2 pb-5 bg-default"
  >
    <h3 class="text-lg text-orange-300-rgba">
      NOTE:
    </h3>
    <p class="indent-5">
      HTML2Canvas doesn't support `oklch` colour space
    </p>
    <h2 class="text-xl text-orange-300-rgba">
      Issue:
    </h2>
    <p class="indent-5">
      How can we share a html-5 canvas
    </p>
    <h2 class="text-xl text-orange-300-rgba">
      Details:
    </h2>
    <p class="indent-5">
      Need to find a way to save and download a html-5 canvas, or copy to the users clipboard
    </p>
    <h2 class="text-xl text-orange-300-rgba">
      Logic:
    </h2>
    <h3 class="text-lg text-orange-300-rgba">
      Clipboard:
    </h3>
    <p class="indent-5">
      Turn the canvas element into a BLOB asset and then turn said blob asset into a ClipboardItem
    </p>
    <h3 class="text-lg text-orange-300-rgba">
      Download:
    </h3>
    <p class="indent-5 word-break">
      Turn the canvas element into a DataURL (`data:image/png;base64,iVBORw0KGgoAAAANSUhEU...`) and then push said DataURL as the HREF of an anchor, click anchor, then clear anchor HREF
    </p>
    <br>  
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7ccf00"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="w-4 h-4 text-lime-500-rgba"
    ><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>
  </section>
  <section class="flex flex-col gap-y-2 text-white pb-5">
    <article class="flex gap-x-2 justify-around">
      <h2 class="text-xl text-orange-300-rgba">
        Is IOS?:
      </h2>
      <p class="indent-5">
        {{ deviceStore.isIos }}
      </p>      
    </article>
    <article class="flex gap-x-2 justify-around">
      <h2 class="text-xl text-orange-300-rgba">
        Is Clipboard (Write) Supported:
      </h2>
      <p class="indent-5">
        {{ supportsClipboardAsync }}
      </p>      
    </article>
    <article class="flex gap-x-2 justify-around">
      <h2 class="text-xl text-orange-300-rgba">
        Is Clipboard (Read) Supported:
      </h2>
      <p class="indent-5">
        {{ supportsClipboardSync }}
      </p>      
    </article>
  </section>
  <section class="flex flex-col gap-y-2 text-black pb-5">
    <article class="flex gap-x-2 justify-around">
      <button
        v-if="canSuppportClipboard"
        ref="button_1"
        class="px-2 bg-slate-400 rounded-md border-2 border-orange-400" 
        type="button"
        @click="copyToClipboard(false)"
        @touchend="copyFromClipboardIos(false)"
      >
        Clipbaord - Static
      </button>
      <button
        v-if="canSuppportClipboard"
        ref="button_2"
        class="px-2 bg-slate-400 rounded-md border-2 border-orange-400" 
        type="button"
        @click="copyToClipboard(true)"
        @touchend="copyFromClipboardIos(true)"
      >
        Clipbaord - Converted
      </button>
      <button 
        class="px-2 bg-slate-400 rounded-md border-2 border-orange-400" 
        type="button"
        @click="saveAndDownload(false)"
      >
        Download - Static
      </button>
      <button 
        class="px-2 bg-slate-400 rounded-md border-2 border-orange-400" 
        type="button"
        @click="saveAndDownload(true)"
      >
        Download - Converted
      </button>
    </article>
    <a
      ref="linkRef"
      download="download.png"
      class="hidden"
      aria-hidden="true"
    >_</a>
  </section>  
  <section class="md:w-[50vw] aspect-square flex flex-col mix-blend-lighten">
    <article class="flex justify-around items-center">
      Here be canvases
    </article>
    <article class="flex justify-around items-center">
      <div>
        Static
      </div>
      <div>
        Converted
      </div>
    </article>
    <article
      ref="canvasDomDestinationRef"
      class="flex gap-x-2 justify-around items-center"
    >
      <canvas ref="canvasRef"></canvas>
    </article>
  </section>
</template>

<style scoped scss>
  .word-break{
    word-break: break-word;
  }
  .text-orange-300-rgba {
    color: #ffb86a;
  }
  .text-lime-500-rgba {
    color: #7ccf00;
  }
</style>