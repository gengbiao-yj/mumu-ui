import { defineComponent, onMounted, nextTick } from 'vue'
import { bem, bm } from '@mumu-ui/utils'
import { UseWindowSize } from '../useUtils/UseWindowOperate.ts'
import { UseImageResize, UseImageSwitch } from '../useUtils/UseImageOperate.ts'
import type { Ref, PropType } from 'vue'
import type { PreviewImgType } from '../types.ts'

// 窗口操作
export const WindowOperate = defineComponent({
  name: 'WindowOperate',
  props: {
    previewRef: {
      type: Object as PropType<Ref<HTMLDivElement>>,
      required: true,
    },
    imageRef: {
      type: Object as PropType<Ref<HTMLImageElement>>,
      required: true,
    },
    isWindowMax: {
      type: Object as PropType<Ref<boolean>>,
      required: true,
    },
  },
  emits: ['close'],
  setup(props, ctx) {
    const { previewRef, isWindowMax, imageRef } = props
    const { setWindowMax, setWindowNormal } = UseWindowSize(
      previewRef,
      imageRef,
      isWindowMax
    )
    return () => (
      <>
        {/*最小 icon="ep:semi-select"、最大-缩回、关闭*/}
        {!isWindowMax.value && (
          <mumu-icon
            class={bm('preview', 'operatingBtn')}
            color="#f9f9f9"
            icon="mingcute:fullscreen-fill"
            width="16px"
            height="16px"
            onClick={setWindowMax}
          />
        )}
        {isWindowMax.value && (
          <mumu-icon
            class={bm('preview', 'operatingBtn')}
            color="#f9f9f9"
            icon="mingcute:fullscreen-exit-fill"
            width="16px"
            height="16px"
            onClick={setWindowNormal}
          />
        )}
        <mumu-icon
          class={bm('preview', 'operatingBtn')}
          color="#f9f9f9"
          icon="ep:close-bold"
          width="16px"
          height="16px"
          onClick={() => ctx.emit('close')}
        />
      </>
    )
  },
})
// 图片操作
export const ImageOperate = defineComponent({
  name: 'ImageOperate',
  props: {
    imageRef: {
      type: Object as PropType<Ref<HTMLImageElement>>,
      required: true,
    },
    previewRef: {
      type: Object as PropType<Ref<HTMLDivElement>>,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { imageRef, previewRef } = props
    const {
      rotationImg,
      scaleImg,
      imgZoomInOut,
      imageNativeSize,
      download,
      imgFitWindow,
    } = UseImageResize(imageRef, previewRef)

    onMounted(imgFitWindow)
    return () => (
      <>
        {/*放大、缩小*/}
        <mumu-icon
          class={bm('preview', 'operatingBtn')}
          color="#f9f9f9"
          icon="iconamoon:zoom-in-bold"
          onClick={() => imgZoomInOut(1)}
        />
        <mumu-icon
          class={bm('preview', 'operatingBtn')}
          color="#f9f9f9"
          icon="iconamoon:zoom-out-bold"
          onClick={() => imgZoomInOut(-1)}
        />
        {/*右旋、左旋（15deg）*/}
        <mumu-icon
          class={bm('preview', 'operatingBtn')}
          color="#f9f9f9"
          icon="fa6-solid:rotate-right"
          onClick={() => rotationImg(1)}
        />
        <mumu-icon
          class={bm('preview', 'operatingBtn')}
          color="#f9f9f9"
          icon="fa6-solid:rotate-left"
          onClick={() => rotationImg(-1)}
        />
        {/*原始大小、适应窗口*/}
        <mumu-icon
          class={bm('preview', 'operatingBtn')}
          color="#f9f9f9"
          icon="icon-park-outline:equal-ratio"
          onClick={imageNativeSize}
        />
        <mumu-icon
          class={bm('preview', 'operatingBtn')}
          color="#f9f9f9"
          icon="icon-park-outline:direction"
          onClick={imgFitWindow}
        />
        {/*垂直、水平翻转*/}
        <mumu-icon
          class={bm('preview', 'operatingBtn')}
          color="#f9f9f9"
          icon="uis:flip-v-alt"
          onClick={() => scaleImg(1)}
        />
        <mumu-icon
          class={bm('preview', 'operatingBtn')}
          color="#f9f9f9"
          icon="uis:flip-h-alt"
          onClick={() => scaleImg(-1)}
        />
        {/*下载、比对*/}
        <mumu-icon
          class={bm('preview', 'operatingBtn')}
          color="#f9f9f9"
          icon="subway:cloud-download"
          onClick={() => download(props.url)}
        />
        <mumu-icon
          class={bm('preview', 'operatingBtn')}
          color="#f9f9f9"
          icon="icon-park-twotone:copy"
        />
      </>
    )
  },
})
// 分页操作
export const PagingOperate = defineComponent({
  name: 'PagingOperate',
  props: {
    list: {
      type: Array as PropType<PreviewImgType[]>,
      required: true,
    },
    previewImg: {
      type: Object as PropType<Ref<PreviewImgType>>,
      required: true,
    },
    initIndex: {
      type: Object as PropType<Ref<number>>,
      required: true,
    },
    imageRef: {
      type: Object as PropType<Ref<HTMLImageElement>>,
      required: true,
    },
    previewRef: {
      type: Object as PropType<Ref<HTMLDivElement>>,
      required: true,
    },
  },
  setup(props) {
    const { list, initIndex, previewImg, imageRef, previewRef } = props
    const { pageUp, pageDown } = UseImageSwitch(previewImg, initIndex, list)
    const { imgFitWindow } = UseImageResize(imageRef, previewRef)

    const getLastImag = () => {
      pageUp()
      nextTick(imgFitWindow)
    }
    const getNextImage = () => {
      pageDown()
      nextTick(imgFitWindow)
    }
    return () => (
      <>
        {/*上一页、下一页*/}
        <mumu-icon
          class={[
            bem('preview', 'paging'),
            bem('preview', 'paging', 'up'),
            bm('preview', 'operatingBtn'),
          ]}
          color="#f9f9f9"
          icon="iconamoon:arrow-left-2-light"
          width="50px"
          height="50px"
          onClick={getLastImag}
        />
        <mumu-icon
          class={[
            bem('preview', 'paging'),
            bem('preview', 'paging', 'down'),
            bm('preview', 'operatingBtn'),
          ]}
          color="#f9f9f9"
          icon="iconamoon:arrow-right-2-light"
          width="50px"
          height="50px"
          onClick={getNextImage}
        />
      </>
    )
  },
})
