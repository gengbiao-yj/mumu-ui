import ImagePreview from './src/image-preview'
import { App } from 'vue'

ImagePreview.install = (app: App): void => {
  // 注册组件
  app.component(ImagePreview.name, ImagePreview)
}

export default ImagePreview
