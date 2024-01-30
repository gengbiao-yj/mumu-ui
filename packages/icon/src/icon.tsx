import { defineComponent, ExtractPropTypes } from 'vue'
import { IconProps } from './types'
import { Icon } from '@iconify/vue'

const NAME = 'mumu-icon'
export type IconPropsType = ExtractPropTypes<typeof IconProps>

// NOTE: @iconify/vue 支持 onLoad 函数，封装 icon 待补充
export default defineComponent({
  name: NAME,
  props: IconProps,
  setup(props) {
    // console.log(props, context)
    return () => (
      <Icon {...props} class={NAME} icon={props.icon}>
        icon
      </Icon>
    )
  },
})
