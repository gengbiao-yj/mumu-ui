import type { Ref } from 'vue'
import { centerJustification } from './utils.ts'

const initPos = {
  x: 0, // 鼠标按下时的x坐标
  y: 0, // 鼠标按下时的y坐标
  offsetX: 0, // 鼠标按下时的previewRef的left值
  offsetY: 0, // 鼠标按下时的previewRef的top值
  width: 0, // 鼠标按下时的previewRef的width值
  height: 0, // 鼠标按下时的previewRef的height值
  resizeing: false, // 是否在调整尺寸
  draging: false, // 是否在拖动
  border: '', // 边框类型
}

// 设置窗口大小
export function UseWindowSize(
  previewRef: Ref<HTMLDivElement>,
  imageRef: Ref<HTMLImageElement>,
  isWindowMax: Ref<boolean>
) {
  // 设置窗口最大化
  const setWindowMax = (e: MouseEvent) => {
    e.stopPropagation()
    if (previewRef) {
      initPos.offsetX = previewRef.value.offsetLeft
      initPos.offsetY = previewRef.value.offsetTop
      initPos.width = previewRef.value.offsetWidth
      initPos.height = previewRef.value.offsetHeight
      isWindowMax.value = true
      previewRef.value.style.top = '0'
      previewRef.value.style.left = '0'
      previewRef.value.style.width = '100vw'
      previewRef.value.style.height = '100vh'
      centerJustification(imageRef, previewRef)
    }
  }
  // 设置窗口正常
  const setWindowNormal = (e: MouseEvent) => {
    e.stopPropagation()
    if (previewRef) {
      isWindowMax.value = false
      previewRef.value.style.top = `${initPos.offsetY}px`
      previewRef.value.style.left = `${initPos.offsetX}px`
      previewRef.value.style.width = `${initPos.width}px`
      previewRef.value.style.height = `${initPos.height}px`
      centerJustification(imageRef, previewRef)
    }
  }

  return {
    isWindowMax,
    setWindowMax,
    setWindowNormal,
  }
}

// 设置窗口拖动
export function UseWindowDrag(
  previewRef: Ref<HTMLDivElement>,
  isWindowMax: Ref<boolean>
) {
  // 窗口拖动中
  const refMouseMove = (e: MouseEvent) => {
    if (!isWindowMax.value && initPos.draging) {
      const { clientX: moveX, clientY: moveY } = e
      const { offsetX, offsetY } = initPos
      let left = moveX - initPos.x + offsetX
      let top = moveY - initPos.y + offsetY
      // 如果超出边界，重置为边界值
      if (left <= 0) left = 0
      if (top <= 0) top = 0
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const maxLeft = viewportWidth - previewRef.value.offsetWidth
      const maxTop = viewportHeight - previewRef.value.offsetHeight
      if (left >= maxLeft) left = maxLeft
      if (top >= maxTop) top = maxTop
      previewRef.value.style.left = `${left}px`
      previewRef.value.style.top = `${top}px`
    }
  }
  // 窗口拖动结束
  const refMouseUp = () => {
    if (!isWindowMax.value) {
      initPos.draging = false
      document.removeEventListener('mousemove', refMouseMove)
      document.removeEventListener('mouseup', refMouseUp)
    }
  }
  // 窗口拖动开始
  const refMouseDown = (e: MouseEvent) => {
    if (!isWindowMax.value) {
      initPos.x = e.clientX
      initPos.y = e.clientY
      initPos.offsetX = previewRef.value.offsetLeft
      initPos.offsetY = previewRef.value.offsetTop
      initPos.draging = true
      document.addEventListener('mousemove', refMouseMove)
      document.addEventListener('mouseup', refMouseUp)
    }
  }
  return {
    refMouseDown,
    refMouseMove,
    refMouseUp,
  }
}

// 设置窗口调整尺寸(边框拖拽)
export function UseResizeWindow(
  previewRef: Ref<HTMLDivElement>,
  imageRef: Ref<HTMLImageElement>,
  isWindowMax: Ref<boolean>
) {
  // 边框拖动中
  const borderMouseMove = (e: MouseEvent) => {
    if (!isWindowMax.value && initPos.resizeing) {
      const { clientX: moveX, clientY: moveY } = e
      const { offsetX, offsetY } = initPos
      const { width, height } = initPos
      const { innerWidth, innerHeight } = window

      const resizeTop = () => {
        const diffY = initPos.y - moveY > offsetY ? offsetY : initPos.y - moveY
        const _top = offsetY - diffY || 0
        const _height = height + diffY <= 600 ? 600 : height + diffY
        if (height + diffY >= 600) {
          previewRef.value.style.top = `${_top}px`
          previewRef.value.style.height = `${_height}px`
        }
      }

      const resizeRight = () => {
        let _width = width + moveX - initPos.x
        if (_width <= 800) _width = 800
        if (_width + offsetX >= innerWidth) _width = innerWidth - offsetX
        previewRef.value.style.width = `${_width}px`
      }

      const resizeBottom = () => {
        let _height = height + moveY - initPos.y
        if (_height <= 600) _height = 600
        if (_height + offsetY >= innerHeight) _height = innerHeight - offsetY
        previewRef.value.style.height = `${_height}px`
      }

      const resizeLeft = () => {
        const diffX = initPos.x - moveX > offsetX ? offsetX : initPos.x - moveX
        const _left = offsetX - diffX || 0
        const _width = width + diffX <= 800 ? 800 : width + diffX
        if (width + diffX >= 800) {
          previewRef.value.style.left = `${_left}px`
          previewRef.value.style.width = `${_width}px`
        }
      }

      switch (initPos.border) {
        case 't': {
          resizeTop()
          break
        }
        case 'r': {
          resizeRight()
          break
        }
        case 'b': {
          resizeBottom()
          break
        }
        case 'l': {
          resizeLeft()
          break
        }
        case 'tl': {
          resizeTop()
          resizeLeft()
          break
        }
        case 'tr': {
          resizeTop()
          resizeRight()
          break
        }
        case 'bl': {
          resizeBottom()
          resizeLeft()
          break
        }
        case 'br': {
          resizeBottom()
          resizeRight()
          break
        }
        default:
          break
      }
      centerJustification(imageRef, previewRef)
    }
  }
  // 边框拖动结束
  const borderMouseUp = () => {
    if (!isWindowMax.value) {
      initPos.resizeing = false
      document.removeEventListener('mousemove', borderMouseMove)
      document.removeEventListener('mouseup', borderMouseUp)
    }
  }
  // 边框拖动开始
  const borderMouseDown = (e: MouseEvent) => {
    e.stopPropagation()
    if (!isWindowMax.value) {
      initPos.x = e.clientX
      initPos.y = e.clientY
      initPos.offsetX = previewRef.value.offsetLeft
      initPos.offsetY = previewRef.value.offsetTop
      initPos.width = previewRef.value.offsetWidth
      initPos.height = previewRef.value.offsetHeight
      initPos.resizeing = true
      const target = e.target as HTMLElement
      if (target.className) {
        initPos.border = target.className.slice(-1)
      }
      document.addEventListener('mousemove', borderMouseMove)
      document.addEventListener('mouseup', borderMouseUp)
    }
  }
  // 角点拖动开始
  const cornerMouseDown = (e: MouseEvent) => {
    e.stopPropagation()
    if (!isWindowMax.value) {
      initPos.x = e.clientX
      initPos.y = e.clientY
      initPos.offsetX = previewRef.value.offsetLeft
      initPos.offsetY = previewRef.value.offsetTop
      initPos.width = previewRef.value.offsetWidth
      initPos.height = previewRef.value.offsetHeight
      initPos.resizeing = true
      const target = e.target as HTMLElement
      if (target.className) {
        initPos.border = target.className.slice(-2)
      }
      document.addEventListener('mousemove', borderMouseMove)
      document.addEventListener('mouseup', borderMouseUp)
    }
  }

  return {
    borderMouseDown,
    borderMouseMove,
    borderMouseUp,
    cornerMouseDown,
  }
}
