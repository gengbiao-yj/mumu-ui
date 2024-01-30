import { defineComponent, PropType, Ref } from 'vue'
import { bem } from '@mumu-ui/utils'
import { UseResizeWindow } from '../useUtils/UseWindowOperate.ts'

export const BorderOperate = defineComponent({
  name: 'BorderOperate',
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
  setup(props) {
    const { previewRef, isWindowMax, imageRef } = props
    const { borderMouseDown, borderMouseUp, borderMouseMove, cornerMouseDown } =
      UseResizeWindow(previewRef, imageRef, isWindowMax)
    return () => (
      <>
        {/*边：上、右、下、左*/}
        <div
          class={bem('preview', 'border-t')}
          onMousedown={borderMouseDown}
          onMouseup={borderMouseUp}
          onMousemove={borderMouseMove}
        ></div>
        <div
          class={bem('preview', 'border-r')}
          onMousedown={borderMouseDown}
          onMouseup={borderMouseUp}
          onMousemove={borderMouseMove}
        ></div>
        <div
          class={bem('preview', 'border-b')}
          onMousedown={borderMouseDown}
          onMouseup={borderMouseUp}
          onMousemove={borderMouseMove}
        ></div>
        <div
          class={bem('preview', 'border-l')}
          onMousedown={borderMouseDown}
          onMouseup={borderMouseUp}
          onMousemove={borderMouseMove}
        ></div>
        {/*角：上左、上右、下右、下左*/}
        <div
          class={bem('preview', 'corner-tl')}
          onMousedown={cornerMouseDown}
          onMouseup={borderMouseUp}
          onMousemove={borderMouseMove}
        ></div>
        <div
          class={bem('preview', 'corner-tr')}
          onMousedown={cornerMouseDown}
          onMouseup={borderMouseUp}
          onMousemove={borderMouseMove}
        ></div>
        <div
          class={bem('preview', 'corner-br')}
          onMousedown={cornerMouseDown}
          onMouseup={borderMouseUp}
          onMousemove={borderMouseMove}
        ></div>
        <div
          class={bem('preview', 'corner-bl')}
          onMousedown={cornerMouseDown}
          onMouseup={borderMouseUp}
          onMousemove={borderMouseMove}
        ></div>
      </>
    )
  },
})
