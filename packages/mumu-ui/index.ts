import Icon from '@mumu-ui/icon'
import ImagePreview from '@mumu-ui/image-preview'
import type { App } from 'vue'
import '../scss/index.scss'

const components = [ImagePreview, Icon] // components

// 全局动态添加组件
const install = (app: App): void => {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}

export default {
  install,
}
