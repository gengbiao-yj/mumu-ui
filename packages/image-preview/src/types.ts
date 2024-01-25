import { ExtractPropTypes, PropType } from 'vue'

export type PreviewImgType = {
  title?: string
  url: string
}
export const ImagePreviewProps = {
  show: {
    type: Boolean,
    default: false,
  },
  list: Array as PropType<PreviewImgType[]>,
}

export type ImagePreviewPropsType = ExtractPropTypes<typeof ImagePreviewProps>
