import { defineComponent } from 'vue'
import { fooProps } from './types'
import { testLog } from '@mumu-ui/utils'

const NAME = 'mumu-foo'

export default defineComponent({
  name: NAME,
  props: fooProps,
  setup(props, context) {
    console.log(props, context)
    const onBtnClick = () => {
      console.log('点击按钮测试', props.msg)
      testLog(props.msg)
    }
    return () => (
      <div class={NAME}>
        <h1>mumu-ui Foo</h1>
        <p class={NAME + '__description'}>msg is: {props.msg}</p>
        <el-button type="primary" onClick={onBtnClick}>
          点击我
        </el-button>
      </div>
    )
  },
})
