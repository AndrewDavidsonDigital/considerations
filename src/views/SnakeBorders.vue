<script setup lang="ts">
  import Highlight from '../components/Highlight.vue';
  import img from '../assets/snake-border/example.png';

</script>

<template>
  <section class="text-white text-left w-1/2 pb-5">
    <h2 class="text-xl">
      Issue:
    </h2>
    <p class="indent-5">
      Borders are usually very <Highlight content="boring" /> so when i saw this `snake` border effect i needed to work out how it works.
    </p>
    <h2 class="text-xl">
      Example:
    </h2>
    <span class="indent-5">
      <img 
        :src="img"
        alt="example of the component we desire to replicate" 
      >
    </span>
    <h2 class="text-xl">
      Logic:
    </h2>
    <p class="indent-5">
      The logic here is fairly simple, we have an element, pseudo or otherwise, that is ever-so slightly larger (border size) than the content its sitting under. This allows its background-colour to bleed over into the upper component. As we are using the Background css var we have access to gradients due background being defined using <Highlight :content='`"<image>"`' /> instead of <Highlight :content='`"<color>"`' />
    </p>
  </section>
  <section class="flex flex-col gap-y-8 justify-start h-[150%] mt-20 w-full px-5">
    <div 
      class="
        grid md:grid-cols-[3fr_1fr] gap-10
        max-w-[1000px] mx-auto
      "
    >
      <div 
        class="
          bg-slate-800
          rounded-xl
          border-2 border-transparent
          relative

          snake-border
        "
      >
        <div 
          class="
            p-10 
            -m-0.5
            rounded-md
            flex flex-col gap-4
            
            particle-blurs
          "
        >
          <article 
            class="
              relative
              after:absolute after:w-[95%] after:h-8 after:bottom-0
              after:bg-gradient-to-t after:from-slate-800 after:to-transparent
            "
          >
            <blockquote class="max-h-36 overflow-y-scroll scrollbar pr-10 pb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
            </blockquote>
          </article>
          <div class="flex gap-2">
            <div class="bg-emerald-400 rounded-full aspect-square h-8 my-auto"></div>
            <a 
              class="h-fit my-auto"
              href="https://www.linkedin.com/in/andrew-davidson-digital/"
            >Andrew Davidson</a>
            <p class="h-fit my-auto">
              Technical Lead, Melbourne Australia
            </p>
          </div>
        </div>
      </div>
      <div class="flex md:flex-col justify-center gap-4">
        <article 
          class="
            flex flex-col
            partial-indent
          "
        >
          <h2 class="text-xl">
            3 Offers
          </h2>
          <p>
            Received after using GreatFrontEnd
          </p>
        </article>
        <article 
          class="
            flex flex-col
            partial-indent
          "
        >
          <h2 class="text-xl">
            10% increase
          </h2>
          <p>
            Remuneration Package
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>

  .scrollbar::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  }
  .scrollbar::-webkit-scrollbar-thumb {
    background-color: var(--color-slate-700);
    border-radius: var(--radius-lg);
  }
  .scrollbar::-webkit-scrollbar {
      @apply w-[0.5em];
  }


  @property --color-transparent{
    syntax: "<color>";
    initial-value: oklch(0% 0 0 / 0);
    inherits: false;
  }

  @property --gradient-angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
  }

  @keyframes rotation {
    0%   { --gradient-angle: 0deg; }
    100% { --gradient-angle: 360deg; }
  }

  /* add track */
  .snake-border::before{
    background: var(--color-slate-700);
  }
  /* add gradient colour, as we are using conic we will need to backfill with transparency */
  .snake-border::after {
    background: conic-gradient(
      from var(--gradient-angle),

      var(--color-transparent),
      var(--color-transparent),
      var(--color-transparent),
      var(--color-transparent),
      var(--color-transparent),
      var(--color-transparent),
      var(--color-transparent),
      var(--color-transparent),
      var(--color-transparent),
      var(--color-transparent),
      var(--color-transparent),
      var(--color-transparent),
      var(--color-transparent),
      var(--color-transparent),
      var(--color-transparent),
      var(--color-transparent),
      var(--color-transparent),
      var(--color-transparent),
      var(--color-transparent),

      var(--color-emerald-500),
      var(--color-amber-400)
    );
    animation: rotation 20s linear infinite;
  }
  /* create our placement for both the track and runner */
  .snake-border::before,
  .snake-border::after {
    position: absolute;
    inset: calc(var(--spacing) * -1);
    content:"";
    border-radius: inherit;
    z-index: -1;
  }

  .partial-indent {
    margin-left: calc(var(--spacing) * 4);
    --indent-height: 33%;
    @apply relative;
  }

  .partial-indent::before{
    position: absolute;
    border-radius: inherit;
    content:"";
    z-index: -1;
    
    background: var(--color-slate-600);
    top: 33%;
    left: calc(var(--spacing) * -4);
    width: calc(var(--spacing) * 0.5);
    height: var(--indent-height);
  }

  .particle-blurs {
    @apply overflow-clip;
    @apply relative;
    z-index: 1;
  }

  
  .particle-blurs::before,
  .particle-blurs::after {
    @apply absolute;
    @apply overflow-clip;
    @apply rounded-full;
    
    aspect-ratio: 16/9;
    height: calc(var(--spacing) * 32);
    content: '';
    z-index: 1;

    --tw-blur: blur(var(--blur-lg) /* 16px */);
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  
  .particle-blurs::before{
    top: calc(var(--spacing) * -4);
    left: calc(var(--spacing) * -8);
  }
  .particle-blurs::after {
    bottom: calc(var(--spacing) * -8);
    right: calc(var(--spacing) * -8);
  }
  
</style>