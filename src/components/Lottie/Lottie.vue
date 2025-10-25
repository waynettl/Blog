<template>
  <div id="Lottie" ref="container" :class="className"></div>
</template>

<script lang="ts" setup>
import {
  ref,
  computed,
  watch,
  nextTick,
  withDefaults,
  onBeforeUnmount
} from "vue"
import lottie, { AnimationItem } from "lottie-web"
import { nanoid } from "nanoid"
import { IProps } from "@/components/Lottie/types"

const props = withDefaults(defineProps<IProps>(), {
  width: "100px",
  height: "100px"
})
const emits = defineEmits<{
  mouseenter: [instance: AnimationItem]
  mouseleave: [instance: AnimationItem]
}>()

const className = computed(() => {
  return `Lottie-${nanoid()}`
})
const container = ref<HTMLDivElement>()
const instance = ref<AnimationItem>()

function getAssetUrl(filename: string): string {
  return new URL(`../../assets/lottie/creations/${filename}`, import.meta.url)
    .href
}
function mouseenter() {
  instance.value?.play()
  emits("mouseenter", instance.value as AnimationItem)
}
function mouseleave() {
  instance.value?.pause()
  emits("mouseleave", instance.value as AnimationItem)
}

watch(
  () => props,
  () => {
    nextTick(() => {
      if (container.value) {
        instance.value = lottie.loadAnimation({
          container: container.value,
          path: props.path ?? getAssetUrl(`${props.fileName}.json`),
          loop: true,
          autoplay: true,
          ...props.options
        })

        if (!instance.value?.autoplay) {
          container.value.addEventListener("mouseenter", mouseenter)
          container.value.addEventListener("mouseleave", mouseleave)
        }
      }
    })
  },
  {
    immediate: true
  }
)

onBeforeUnmount(() => {
  container.value?.removeEventListener("mouseenter", mouseenter)
  container.value?.removeEventListener("mouseleave", mouseleave)
  instance.value?.destroy()
})

defineExpose({ instance })
</script>

<style lang="scss">
#Lottie {
  display: inline-flex;
  width: v-bind("props.width");
  height: v-bind("props.height");
}
</style>
