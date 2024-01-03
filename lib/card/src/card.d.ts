import {
  DefineComponent,
  ComponentPropsOptions,
  ComponentOptionsMixin,
  VNodeProps,
  AllowedComponentProps,
  ComponentCustomProps,
  ExtractPropTypes,
  ComponentObjectPropsOptions,
} from 'vue'
declare const _default: DefineComponent<
  Readonly<
    ComponentPropsOptions<{
      [x: string]: unknown
    }>
  >,
  () => JSX.Element,
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  VNodeProps & AllowedComponentProps & ComponentCustomProps,
  | readonly string[]
  | Readonly<
      ExtractPropTypes<
        Readonly<
          ComponentObjectPropsOptions<{
            [x: string]: unknown
          }>
        >
      >
    >,
  | {
      [x: number]: string
    }
  | {},
  {}
>
export default _default
