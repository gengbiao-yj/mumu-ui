import { defineComponent } from 'vue'
import { ImagePreviewProps } from './types'
import { bem, bm } from '@mumu-ui/utils'
import {
  WindowOperate,
  ImageOperate,
  PagingOperate,
} from './components/operatingButton.tsx'
import { BorderOperate } from './components/resizeWindow.tsx'

import { UseInit } from './useUtils/UseInit.ts'
import { UseWindowDrag } from './useUtils/UseWindowOperate.ts'
import { UseImageResize, UseImageDrag } from './useUtils/UseImageOperate.ts'

const NAME = 'mumu-image-preview'

export default defineComponent({
  name: NAME,
  props: ImagePreviewProps,
  emits: ['update:show'],
  setup(props, ctx) {
    // 初始化
    const { previewImg, previewRef, isWindowMax, imageRef, initIndex } =
      UseInit(props.list)
    // 窗口拖拽
    const { refMouseDown, refMouseMove, refMouseUp } = UseWindowDrag(
      previewRef,
      isWindowMax
    )
    // 图片操作
    const { zoomImg } = UseImageResize(imageRef, previewRef)
    const { imgMouseDown, imgMousemove, imgMouseup } = UseImageDrag(
      imageRef
      // previewRef
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
              <WindowOperate
                previewRef={previewRef}
                imageRef={imageRef}
                isWindowMax={isWindowMax}
                onClose={() => ctx.emit('update:show', false)}
              />
            </div>
            {/*图片展示区*/}
            <div
              class={bem('preview', 'body')}
              onWheel={(e) => e.preventDefault()}
            >
              <img
                ref={imageRef}
                src={url}
                onWheel={zoomImg}
                onMousedown={imgMouseDown}
                onMousemove={imgMousemove}
                onMouseup={imgMouseup}
              />
            </div>
            {/*图片操作区*/}
            <div class={bem('preview', 'footer')}>
              <ImageOperate
                imageRef={imageRef}
                previewRef={previewRef}
                url={url}
              />
            </div>
            {/*翻页操作*/}
            <PagingOperate
              initIndex={initIndex}
              previewImg={previewImg}
              list={props.list}
              imageRef={imageRef}
              previewRef={previewRef}
            />
            {/*边界调整*/}
            <BorderOperate
              previewRef={previewRef}
              imageRef={imageRef}
              isWindowMax={isWindowMax}
            />
          </div>
        )
      )
    }
  },
})
