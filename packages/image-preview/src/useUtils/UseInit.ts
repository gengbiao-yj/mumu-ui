import { PreviewImgType } from '../types.ts'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { getPreviewImg } from './utils.ts'

export function UseInit(list = [] as PreviewImgType[]) {
  const initIndex = ref(0)
  const previewImg = ref<PreviewImgType>({
    title: '',
    url: '',
  })
  previewImg.value = getPreviewImg(list, initIndex.value)
  const previewRef = ref() as Ref<HTMLDivElement>
  const imageRef = ref() as Ref<HTMLImageElement>
  const isWindowMax = ref(false)

  return {
    initIndex,
    previewImg,
    previewRef,
    isWindowMax,
    imageRef,
  }
}
