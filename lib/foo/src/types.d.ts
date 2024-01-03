import { ExtractPropTypes } from 'vue'
export declare const fooProps: {
  msg: {
    type: StringConstructor
    required: boolean
    default: string
  }
}
export type FooProps = ExtractPropTypes<typeof fooProps>
