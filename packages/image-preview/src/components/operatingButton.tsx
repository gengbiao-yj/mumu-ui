import { defineComponent, PropType } from 'vue'
import { bem, bm } from '@mumu-ui/utils'
import { UseWindowSize } from '../useUtils/UseWindowOperate.ts'
import type { Ref } from 'vue'

export const WindowOperate = defineComponent({
  name: 'WindowOperate',
  props: {
    previewRef: {
      type: Object as PropType<Ref<HTMLDivElement>>,
      required: true,
    },
  },
  setup(props) {
    const { previewRef } = props
    const { setWindowMax, setWindowNormal, isWindowMax } =
      UseWindowSize(previewRef)
    return () => (
      <>
        {/*最小、最大-缩回、关闭*/}
        <mumu-icon
          class={bm('preview', 'operatingBtn')}
          color="#f9f9f9"
          icon="ep:semi-select"
          width="16px"
          height="16px"
          onClick={setWindowNormal}
        />
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
        />
      </>
    )
  },
})

export const ImageOperate = defineComponent({
  name: 'ImageOperate',
  setup() {
    return () => (
      <>
        {/*放大、缩小*/}
        <mumu-icon
          class={bm('preview', 'operatingBtn')}
          color="#f9f9f9"
          icon="iconamoon:zoom-in-bold"
        />
        <mumu-icon
          class={bm('preview', 'operatingBtn')}
          color="#f9f9f9"
          icon="iconamoon:zoom-out-bold"
        />
        {/*右旋、左旋（15deg）*/}
        <mumu-icon
          class={bm('preview', 'operatingBtn')}
          color="#f9f9f9"
          icon="fa6-solid:rotate-right"
        />
        <mumu-icon
          class={bm('preview', 'operatingBtn')}
          color="#f9f9f9"
          icon="fa6-solid:rotate-left"
        />
        {/*原始大小、适应窗口*/}
        <mumu-icon
          class={bm('preview', 'operatingBtn')}
          color="#f9f9f9"
          icon="icon-park-outline:equal-ratio"
        />
        <mumu-icon
          class={bm('preview', 'operatingBtn')}
          color="#f9f9f9"
          icon="icon-park-outline:direction"
        />
        {/*垂直、水平翻转*/}
        <mumu-icon
          class={bm('preview', 'operatingBtn')}
          color="#f9f9f9"
          icon="uis:flip-v-alt"
        />
        <mumu-icon
          class={bm('preview', 'operatingBtn')}
          color="#f9f9f9"
          icon="uis:flip-h-alt"
        />
        {/*下载、比对*/}
        <mumu-icon
          class={bm('preview', 'operatingBtn')}
          color="#f9f9f9"
          icon="subway:cloud-download"
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

export const PagingOperate = defineComponent({
  name: 'PagingOperate',
  setup() {
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
        />
      </>
    )
  },
})

export const BorderOperate = defineComponent({
  name: 'BorderOperate',
  setup() {
    return () => (
      <>
        {/*边：上、右、下、左*/}
        <div class={bem('preview', 'border-t')}></div>
        <div class={bem('preview', 'border-r')}></div>
        <div class={bem('preview', 'border-b')}></div>
        <div class={bem('preview', 'border-l')}></div>
        {/*角：上左、上右、下右、下左*/}
        <div class={bem('preview', 'corner-tl')}></div>
        <div class={bem('preview', 'corner-tr')}></div>
        <div class={bem('preview', 'corner-br')}></div>
        <div class={bem('preview', 'corner-bl')}></div>
      </>
    )
  },
})
