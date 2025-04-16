<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'

// reactive state
  let ad_1 = ref<HTMLDivElement>()
  let ad_2 = ref<HTMLDivElement>()
  let observer = ref<IntersectionObserver>();
  let fps = ref(60);

  interface IAdConfig {
    maxHeight: number | 0;
    minHeight: number;
  }
  interface IScrollConfig {
    top: number;
    bottom: number;
    startTimestamp: number;
  }

  let ad_1_config = ref<IAdConfig>({ 
    maxHeight: 0,
    minHeight: 1,
  })

  let scrollConfig = ref<IScrollConfig>({
    top: 0,
    bottom: 0,
    startTimestamp: -1,
  })

  const _interval = computed(() => (1000 / fps.value).toFixed(2));


  function resolveMaxHeight(config: IAdConfig){
    const totalScrollArea = scrollConfig.value.top - scrollConfig.value.bottom
    const percentComplete = Math.min(((scrollConfig.value.top - config.maxHeight) / totalScrollArea), 100)
    return percentComplete
  }

  onMounted(() => {
    const allComputedStyles = ad_1.value?.computedStyleMap();
    if (allComputedStyles){
      // iterate thru the map of all the properties and values, adding a <dt> and <dd> for each
      ad_1_config.value.maxHeight = Number(allComputedStyles.get('height')) || 0;
      // for (const [prop, val] of allComputedStyles) {
      //   if (prop === 'height'){
      //     ad_1_config.value.maxHeight = val[0].value;
      //   }
      // }
      // define observer
      let options = {
        rootMargin: '-40% 0% -40% 0%',
      }
      observer.value = new IntersectionObserver((entries, observer) => observerCallback(entries, observer), options);
      
      observer.value.observe(ad_1.value as  HTMLElement);
    
      const gap = Math.abs(-40)
      const topper = window.innerHeight * (gap /100)
      const bottomout = window.innerHeight - window.innerHeight * (gap /100)
      scrollConfig.value.bottom = Number(topper.toFixed(0))
      scrollConfig.value.top = Number(bottomout.toFixed(0))
    }
  })

  function observerCallback(entries: IntersectionObserverEntry[], _observer: IntersectionObserver){
    if (entries[0].isIntersecting){
      console.log('entering: ')
      scrollConfig.value.startTimestamp = Date.now()
    } else {
      console.log('leaving: ')
    }
  }

  defineExpose({
    ad_1,
    ad_1_config,
    resolveMaxHeight,
  })
</script>

<template>
  <section class="text-white text-left w-1/2 pb-5">
    <h2 class="text-xl">Issue: </h2>
    <p class="indent-5">How do they Work: <em>How do paralax image reveal adds even work?</em></p>
    <h2 class="text-xl">Details: </h2>
    <p class="indent-5">Been seeing these scroll reveal paralax image adds that are z-index'd underneath the content and revealed on scroll</p>
    <h2 class="text-xl">Logic: </h2>
    <p class="indent-5">TBD</p>
  </section>
  <section class="w-1/2 flex flex-col">
    <p>1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet libero nunc. Sed auctor tortor nec mi vulputate, a ultricies libero maximus. Pellentesque suscipit aliquet hendrerit. Donec at vehicula neque, a semper erat. Nunc a lorem et nibh consectetur ultrices et et erat. In fringilla sem eu ligula pulvinar pellentesque. Sed ipsum lectus, dapibus vel elit egestas, tincidunt vestibulum diam. Nullam porttitor arcu vitae odio luctus, id pretium quam hendrerit. Praesent pulvinar bibendum augue, facilisis dapibus metus rutrum non.</p>
    <p>2. Fusce sed ullamcorper dolor. Aenean eu diam sed diam faucibus consectetur. Donec eu eleifend neque. In et tincidunt sem, tempus consequat massa. Vestibulum cursus arcu sit amet rhoncus condimentum. Ut auctor ullamcorper felis a pulvinar. Mauris ac augue nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla libero urna, faucibus vitae tellus eu, molestie vulputate tellus. Aenean est massa, pulvinar ut justo non, hendrerit scelerisque eros. Ut ultricies justo a ligula aliquet, ac volutpat nunc lacinia. Ut a ultricies nulla. Curabitur sed ex non ex hendrerit viverra. Etiam dictum tincidunt purus, ac volutpat nunc euismod vel.</p>
    <p>3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet libero nunc. Sed auctor tortor nec mi vulputate, a ultricies libero maximus. Pellentesque suscipit aliquet hendrerit. Donec at vehicula neque, a semper erat. Nunc a lorem et nibh consectetur ultrices et et erat. In fringilla sem eu ligula pulvinar pellentesque. Sed ipsum lectus, dapibus vel elit egestas, tincidunt vestibulum diam. Nullam porttitor arcu vitae odio luctus, id pretium quam hendrerit. Praesent pulvinar bibendum augue, facilisis dapibus metus rutrum non.</p>
    <p>4. Fusce sed ullamcorper dolor. Aenean eu diam sed diam faucibus consectetur. Donec eu eleifend neque. In et tincidunt sem, tempus consequat massa. Vestibulum cursus arcu sit amet rhoncus condimentum. Ut auctor ullamcorper felis a pulvinar. Mauris ac augue nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla libero urna, faucibus vitae tellus eu, molestie vulputate tellus. Aenean est massa, pulvinar ut justo non, hendrerit scelerisque eros. Ut ultricies justo a ligula aliquet, ac volutpat nunc lacinia. Ut a ultricies nulla. Curabitur sed ex non ex hendrerit viverra. Etiam dictum tincidunt purus, ac volutpat nunc euismod vel.</p>
    <article 
      ref="ad_1" 
      class="h-24 w-full bg-fix bg-[url('/airship.jpg')]"></article>
    <p>5. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet libero nunc. Sed auctor tortor nec mi vulputate, a ultricies libero maximus. Pellentesque suscipit aliquet hendrerit. Donec at vehicula neque, a semper erat. Nunc a lorem et nibh consectetur ultrices et et erat. In fringilla sem eu ligula pulvinar pellentesque. Sed ipsum lectus, dapibus vel elit egestas, tincidunt vestibulum diam. Nullam porttitor arcu vitae odio luctus, id pretium quam hendrerit. Praesent pulvinar bibendum augue, facilisis dapibus metus rutrum non.</p>
    <article ref="ad_2"></article>
    <p>6. Fusce sed ullamcorper dolor. Aenean eu diam sed diam faucibus consectetur. Donec eu eleifend neque. In et tincidunt sem, tempus consequat massa. Vestibulum cursus arcu sit amet rhoncus condimentum. Ut auctor ullamcorper felis a pulvinar. Mauris ac augue nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla libero urna, faucibus vitae tellus eu, molestie vulputate tellus. Aenean est massa, pulvinar ut justo non, hendrerit scelerisque eros. Ut ultricies justo a ligula aliquet, ac volutpat nunc lacinia. Ut a ultricies nulla. Curabitur sed ex non ex hendrerit viverra. Etiam dictum tincidunt purus, ac volutpat nunc euismod vel.</p>
    <p>7. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet libero nunc. Sed auctor tortor nec mi vulputate, a ultricies libero maximus. Pellentesque suscipit aliquet hendrerit. Donec at vehicula neque, a semper erat. Nunc a lorem et nibh consectetur ultrices et et erat. In fringilla sem eu ligula pulvinar pellentesque. Sed ipsum lectus, dapibus vel elit egestas, tincidunt vestibulum diam. Nullam porttitor arcu vitae odio luctus, id pretium quam hendrerit. Praesent pulvinar bibendum augue, facilisis dapibus metus rutrum non.</p>
    <p>8. Fusce sed ullamcorper dolor. Aenean eu diam sed diam faucibus consectetur. Donec eu eleifend neque. In et tincidunt sem, tempus consequat massa. Vestibulum cursus arcu sit amet rhoncus condimentum. Ut auctor ullamcorper felis a pulvinar. Mauris ac augue nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla libero urna, faucibus vitae tellus eu, molestie vulputate tellus. Aenean est massa, pulvinar ut justo non, hendrerit scelerisque eros. Ut ultricies justo a ligula aliquet, ac volutpat nunc lacinia. Ut a ultricies nulla. Curabitur sed ex non ex hendrerit viverra. Etiam dictum tincidunt purus, ac volutpat nunc euismod vel.</p>
    <p>9. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet libero nunc. Sed auctor tortor nec mi vulputate, a ultricies libero maximus. Pellentesque suscipit aliquet hendrerit. Donec at vehicula neque, a semper erat. Nunc a lorem et nibh consectetur ultrices et et erat. In fringilla sem eu ligula pulvinar pellentesque. Sed ipsum lectus, dapibus vel elit egestas, tincidunt vestibulum diam. Nullam porttitor arcu vitae odio luctus, id pretium quam hendrerit. Praesent pulvinar bibendum augue, facilisis dapibus metus rutrum non.</p>
    <p>10. Fusce sed ullamcorper dolor. Aenean eu diam sed diam faucibus consectetur. Donec eu eleifend neque. In et tincidunt sem, tempus consequat massa. Vestibulum cursus arcu sit amet rhoncus condimentum. Ut auctor ullamcorper felis a pulvinar. Mauris ac augue nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla libero urna, faucibus vitae tellus eu, molestie vulputate tellus. Aenean est massa, pulvinar ut justo non, hendrerit scelerisque eros. Ut ultricies justo a ligula aliquet, ac volutpat nunc lacinia. Ut a ultricies nulla. Curabitur sed ex non ex hendrerit viverra. Etiam dictum tincidunt purus, ac volutpat nunc euismod vel.</p>
    <section class="h-60"></section>
  </section>
</template>
