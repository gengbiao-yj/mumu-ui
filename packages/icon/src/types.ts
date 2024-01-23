import { PropType } from 'vue'

export const IconProps = {
  icon: {
    type: String,
    default: 'ep:add-location',
  },
  inline: {
    type: Boolean,
    default: false,
  },
  width: {
    type: [Number, String],
    default: '24px',
  },
  height: {
    type: [Number, String],
    default: '24px',
  },
  color: String,
  'h-flip': {
    type: Boolean,
    default: false,
  },
  'v-flip': {
    type: Boolean,
    default: false,
  },
  flip: String as PropType<'horizontal,vertical' | 'horizontal' | 'vertical'>,
  /**
   * Rotate the icon by 90, 180, or 270 degrees.
   * Number values are 1 for 90 degrees, 2 for 180 degrees, 3 for 270 degrees.
   */
  rotate: Number,
}
