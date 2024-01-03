import Card from '@mumu-ui/card'
import Foo from '@mumu-ui/foo'
import type { App } from 'vue'
import '../scss/index.scss'

const components = [Foo, Card] // components

// 全局动态添加组件
const install = (app: App): void => {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}

export default {
  install,
}
