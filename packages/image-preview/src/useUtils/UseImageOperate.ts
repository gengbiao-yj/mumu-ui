import { centerJustification, getPreviewImg } from './utils.ts'
import type { Ref } from 'vue'
import type { PreviewImgType } from '../types.ts'

const initImage = {
  degree: 0, // 旋转角度,初始0，累加基数 45度
  scaleX: 1, // x轴翻转180度
  scaleY: 1, // y轴翻转180度
  rate: 1.2, // 基础缩放倍数，1.2倍
  x: 0, // 鼠标按下时的x坐标
  y: 0, // 鼠标按下时的y坐标
  offsetX: 0, // 鼠标按下时的imageRef的left值
  offsetY: 0, // 鼠标按下时的imageRef的top值
  draging: false, // 是否在拖动
}

// 旋转操作（旋转、缩放、翻转等）
export function UseImageResize(
  imageRef: Ref<HTMLImageElement>,
  previewRef: Ref<HTMLDivElement>
) {
  // 按钮缩放图片
  const imgZoomInOut = (type: number, isWheel = false) => {
    const img = imageRef.value
    const { offsetWidth: width, offsetHeight: height } = img
    const { offsetLeft: left, offsetTop: top } = img
    let _width = 0
    let _height = 0
    if (type > 0) {
      _width = width * initImage.rate
      _height = height * initImage.rate
    } else {
      _width = width / initImage.rate
      _height = height / initImage.rate
    }
    imageRef.value.style.width = _width + 'px'
    imageRef.value.style.height = _height + 'px'
    if (!isWheel) {
      imageRef.value.style.top = top - (_height - height) / 2 + 'px'
      imageRef.value.style.left = left - (_width - width) / 2 + 'px'
    }
    return {
      top: top - (_height - height) / 2,
      left: left - (_width - width) / 2,
    }
  }
  // 滚轮缩放图片
  const zoomImg = (e: WheelEvent & { wheelDelta?: number }) => {
    e.preventDefault()
    const {
      x: imgX,
      y: imgY,
      offsetWidth: imgW,
      offsetHeight: imgH,
    } = imageRef.value
    const delta = e.wheelDelta ? e.wheelDelta : -e.detail
    const { top, left } = imgZoomInOut(delta, true)
    const { x: wheelX, y: wheelY } = e
    const diffX = imgX + imgW / 2 - wheelX
    const diffY = imgY + imgH / 2 - wheelY
    const diffLeft = left + diffX * (initImage.rate - 1) * (delta > 0 ? 1 : -1)
    const diffTop = top + diffY * (initImage.rate - 1) * (delta > 0 ? 1 : -1)
    imageRef.value.style.top = diffTop + 'px'
    imageRef.value.style.left = diffLeft + 'px'
  }
  // 旋转图片
  const rotationImg = (direction: 1 | -1) => {
    initImage.degree += 45 * direction
    imageRef.value.style.transform = `rotate(${initImage.degree}deg) scale(${initImage.scaleX}, ${initImage.scaleY})`
  }
  // 翻转图片
  const scaleImg = (direction: 1 | -1) => {
    direction === 1 && (initImage.scaleX = initImage.scaleX === 1 ? -1 : 1)
    direction === -1 && (initImage.scaleY = initImage.scaleY === 1 ? -1 : 1)
    imageRef.value.style.transform = `rotate(${initImage.degree}deg) scale(${initImage.scaleX}, ${initImage.scaleY})`
  }
  // 图片原始尺寸
  const imageNativeSize = () => {
    const { naturalHeight, naturalWidth } = imageRef.value
    const { offsetHeight: refHeight, offsetWidth: refWidth } = previewRef.value
    imageRef.value.style.width = naturalWidth + 'px'
    imageRef.value.style.height = naturalHeight + 'px'
    imageRef.value.style.top = (refHeight - naturalHeight) / 2 + 'px'
    imageRef.value.style.left = (refWidth - naturalWidth) / 2 + 'px'
  }
  // 图片适应窗口尺寸 110 是窗口高度减去title、footer高度
  const imgFitWindow = () => {
    const { naturalHeight, naturalWidth } = imageRef.value
    const { offsetHeight: refHeight, offsetWidth: refWidth } = previewRef.value
    const rateW = naturalWidth / refWidth
    const rateH = naturalHeight / (refHeight - 100)
    const natureRate = naturalWidth / naturalHeight
    if (rateW > rateH) {
      imageRef.value.style.width = refWidth + 'px'
      imageRef.value.style.height = refWidth / natureRate + 'px'
    } else {
      imageRef.value.style.height = refHeight - 100 + 'px'
      imageRef.value.style.width = (refHeight - 100) * natureRate + 'px'
    }
    centerJustification(imageRef, previewRef)
  }

  // 下载图片
  const download = (url: string) => {
    const a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('download', '图片')
    a.setAttribute('target', '_blank')
    const clickEvent = document.createEvent('MouseEvents')
    clickEvent.initEvent('click', true, true)
    a.dispatchEvent(clickEvent)
  }
  return {
    rotationImg,
    scaleImg,
    zoomImg,
    imgZoomInOut,
    imageNativeSize,
    download,
    imgFitWindow,
  }
}

// 图片拖拽
export function UseImageDrag(
  imageRef: Ref<HTMLImageElement>
  // previewRef: Ref<HTMLDivElement>
) {
  const imgMousemove = (e: MouseEvent) => {
    if (!initImage.draging) return
    const { clientX: moveX, clientY: moveY } = e
    const { offsetX, offsetY } = initImage
    const left = moveX - initImage.x + offsetX
    const top = moveY - initImage.y + offsetY

    imageRef.value.style.left = `${left}px`
    imageRef.value.style.top = `${top}px`
  }
  const imgMouseup = () => {
    initImage.draging = false
    document.removeEventListener('mousemove', imgMousemove)
    document.removeEventListener('mouseup', imgMouseup)
  }
  const imgMouseDown = (e: MouseEvent) => {
    e.preventDefault()
    const { clientX, clientY } = e
    initImage.x = clientX
    initImage.y = clientY
    initImage.offsetX = imageRef.value.offsetLeft
    initImage.offsetY = imageRef.value.offsetTop
    initImage.draging = true
    document.addEventListener('mousemove', imgMousemove)
    document.addEventListener('mouseup', imgMouseup)
  }
  return {
    imgMouseDown,
    imgMousemove,
    imgMouseup,
  }
}

// 切换图片
export function UseImageSwitch(
  previewImg: Ref<PreviewImgType>,
  initIndex: Ref<number>,
  list: PreviewImgType[]
) {
  const pageUp = () => {
    initIndex.value = initIndex.value - 1
    if (initIndex.value < 0) initIndex.value = list.length - 1
    previewImg.value = getPreviewImg(list, initIndex.value)
  }
  const pageDown = () => {
    initIndex.value = initIndex.value + 1
    if (initIndex.value >= list.length) initIndex.value = 0
    previewImg.value = getPreviewImg(list, initIndex.value)
  }
  return {
    pageUp,
    pageDown,
  }
}
