import { defineComponent } from 'vue'
import { ImagePreviewProps } from './types'
import { bem, bm } from '@mumu-ui/utils'
import {
  WindowOperate,
  ImageOperate,
  PagingOperate,
  BorderOperate,
} from './components/operatingButton.tsx'
import { UseInit } from './useUtils/UseInit.ts'
import { UseWindowDrag, UseWindowSize } from './useUtils/UseWindowOperate.ts'

const NAME = 'mumu-image-preview'

export default defineComponent({
  name: NAME,
  props: ImagePreviewProps,
  setup(props, context) {
    console.log(props, context)

    // 初始化
    const { previewImg, previewRef } = UseInit(props.list)
    // 窗口拖拽
    const { isWindowMax } = UseWindowSize(previewRef)
    const { refMouseDown, refMouseMove, refMouseUp } = UseWindowDrag(
      previewRef,
      isWindowMax
    )

    return () => {
      const { title, url } = previewImg.value
      return (
        props.show && (
          <div ref={previewRef} class={bem('preview')}>
            {/*窗口操作区*/}
            <div
              class={bem('preview', 'header')}
              onMousedown={refMouseDown}
              onMousemove={refMouseMove}
              onMouseup={refMouseUp}
            >
              <span class={bm('preview', 'title')}>{title}</span>
              <WindowOperate previewRef={previewRef} />
            </div>
            {/*图片展示区*/}
            <div class={bem('preview', 'body')}>
              <img src={url} />
            </div>
            {/*图片操作区*/}
            <div class={bem('preview', 'footer')}>
              <ImageOperate />
            </div>
            {/*翻页操作*/}
            <PagingOperate />
            {/*边界调整*/}
            <BorderOperate />
          </div>
        )
      )
    }
  },
})
