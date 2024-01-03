import Card from './src/card'
import { App } from 'vue'

Card.install = (app: App): void => {
  // 注册组件
  app.component(Card.name, Card)
}

export default Card
