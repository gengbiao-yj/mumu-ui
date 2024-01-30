import type { Ref } from 'vue'

export const getPreviewImg = (_list: any[], i: number) => {
  if (_list && Array.isArray(_list) && _list.length > 0) {
    return _list[i]
  } else {
    return { title: '', url: '' }
  }
}

// 图片居中
export const centerJustification = (
  imageRef: Ref<HTMLImageElement>,
  previewRef: Ref<HTMLDivElement>
) => {
  const { offsetWidth: imgWidth, offsetHeight: imgHeight } = imageRef.value
  const { offsetWidth: refWidth, offsetHeight: refHeight } = previewRef.value
  imageRef.value.style.top = (refHeight - imgHeight - 100) / 2 + 'px'
  imageRef.value.style.left = (refWidth - imgWidth) / 2 + 'px'
}
