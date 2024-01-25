import { ref } from 'vue'
import type { Ref } from 'vue'

export function UseWindowSize(previewRef: Ref<HTMLDivElement>) {
  const isWindowMax = ref(false)
  const initPos = {
    offsetX: 0,
    offsetY: 0,
  }
  const setWindowMax = () => {
    if (previewRef) {
      initPos.offsetX = previewRef.value.offsetLeft
      initPos.offsetY = previewRef.value.offsetTop
      isWindowMax.value = true
      previewRef.value.style.top = '0'
      previewRef.value.style.left = '0'
      previewRef.value.style.width = '100vw'
      previewRef.value.style.height = '100vh'
    }
  }

  const setWindowNormal = () => {
    if (previewRef) {
      isWindowMax.value = false
      previewRef.value.style.top = `${initPos.offsetY}px`
      previewRef.value.style.left = `${initPos.offsetX}px`
      previewRef.value.style.width = '800px'
      previewRef.value.style.height = '600px'
    }
  }

  return {
    isWindowMax,
    setWindowMax,
    setWindowNormal,
  }
}

export function UseWindowDrag(
  previewRef: Ref<HTMLDivElement>,
  isWindowMax: Ref<boolean>
) {
  const initPos = {
    x: 0,
    y: 0,
    offsetX: 0,
    offsetY: 0,
    draging: false,
  }

  const refMouseMove = (e: MouseEvent) => {
    if (!isWindowMax.value && initPos.draging) {
      const { clientX: moveX, clientY: moveY } = e
      const { offsetX, offsetY } = initPos
      const left = moveX - initPos.x + offsetX
      const top = moveY - initPos.y + offsetY
      console.log(left)
      previewRef.value.style.left = `${left}px`
      previewRef.value.style.top = `${top}px`
    }
  }

  const refMouseUp = () => {
    if (!isWindowMax.value) {
      initPos.draging = false
      document.removeEventListener('mousemove', refMouseMove)
      document.removeEventListener('mouseup', refMouseUp)
    }
  }

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
