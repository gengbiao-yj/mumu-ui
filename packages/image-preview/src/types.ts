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
  list: {
    type: Array as PropType<PreviewImgType[]>,
    default: [] as PreviewImgType[],
  },
}

export type ImagePreviewPropsType = ExtractPropTypes<typeof ImagePreviewProps>
