import { defineComponent } from 'vue'
import { cardProps } from './types'

const NAME = 'mumu-card'

export default defineComponent({
  name: NAME,
  props: cardProps,
  setup(props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        <div>mumu-card</div>
      </div>
    )
  },
})
