export const getPreviewImg = (_list: any[], i: number) => {
  if (_list && Array.isArray(_list) && _list.length > 0) {
    return _list[i]
  } else {
    return { title: '', url: '' }
  }
}
