import { defineComponent } from 'vue'
import { imagePreviewProps } from './types'
import { bem } from '@mumu-ui/utils'

const NAME = 'mumu-image-preview'

export default defineComponent({
  name: NAME,
  props: imagePreviewProps,
  setup(props, context) {
    console.log(props, context)
    return () => (
      <div class={bem('preview')}>
        <div class={bem('preview', 'header')}>header</div>
        <div class={bem('preview', 'body')}>body</div>
        <div class={bem('preview', 'footer')}>footer</div>
      </div>
    )
  },
})
