import Icon from './src/icon'
import { App } from 'vue'

Icon.name = 'mumu-icon'

Icon.install = (app: App): void => {
  // 注册组件
  app.component(Icon.name, Icon)
}

export default Icon
