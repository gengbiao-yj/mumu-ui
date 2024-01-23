import {
  defineComponent as m,
  createVNode as n,
  createTextVNode as s,
  resolveComponent as a,
} from 'vue'
const i = {
    msg: {
      type: String,
      required: !1,
      default: '',
    },
  },
  u = (o) => {
    console.log('test log: ', o)
  },
  l = 'mumu-foo',
  t = /* @__PURE__ */ m({
    name: l,
    props: i,
    setup(o, e) {
      console.log(o, e)
      const c = () => {
        console.log('点击按钮测试', o.msg), u(o.msg)
      }
      return () =>
        n(
          'div',
          {
            class: l,
          },
          [
            n('h1', null, [s('mumu-ui Foo')]),
            n(
              'p',
              {
                class: l + '__description',
              },
              [s('msg is: '), o.msg]
            ),
            n(
              a('el-button'),
              {
                type: 'primary',
                onClick: c,
              },
              {
                default: () => [s('点击我')],
              }
            ),
          ]
        )
    },
  })
t.install = (o) => {
  o.component(t.name, t)
}
const r = [t],
  d = (o) => {
    r.forEach((e) => {
      o.component(e.name, e)
    })
  },
  f = {
    install: d,
  }
export { f as default }
