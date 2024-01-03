import {
  DefineComponent,
  ComponentOptionsMixin,
  VNodeProps,
  AllowedComponentProps,
  ComponentCustomProps,
  ExtractPropTypes,
} from 'vue'
declare const _default: DefineComponent<
  {
    msg: {
      type: StringConstructor
      required: boolean
      default: string
    }
  },
  () => JSX.Element,
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  VNodeProps & AllowedComponentProps & ComponentCustomProps,
  Readonly<
    ExtractPropTypes<{
      msg: {
        type: StringConstructor
        required: boolean
        default: string
      }
    }>
  >,
  {
    msg: string
  },
  {}
>
export default _default
