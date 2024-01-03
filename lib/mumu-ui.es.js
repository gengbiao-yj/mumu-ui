import {
  defineComponent as a,
  createVNode as e,
  createTextVNode as t,
  resolveComponent as r,
} from 'vue'
const i = {},
  m = 'mumu-card',
  s = /* @__PURE__ */ a({
    name: m,
    props: i,
    setup(o, n) {
      return (
        console.log(o, n),
        () =>
          e(
            'div',
            {
              class: m,
            },
            [e('div', null, [t('mumu-card')])]
          )
      )
    },
  })
s.install = (o) => {
  o.component(s.name, s)
}
const d = {
    msg: {
      type: String,
      required: !1,
      default: '',
    },
  },
  p = (o) => {
    console.log('test log: ', o)
  },
  l = 'mumu-foo',
  c = /* @__PURE__ */ a({
    name: l,
    props: d,
    setup(o, n) {
      console.log(o, n)
      const u = () => {
        console.log('点击按钮测试', o.msg), p(o.msg)
      }
      return () =>
        e(
          'div',
          {
            class: l,
          },
          [
            e('h1', null, [t('mumu-ui Foo')]),
            e(
              'p',
              {
                class: l + '__description',
              },
              [t('msg is: '), o.msg]
            ),
            e(
              r('el-button'),
              {
                type: 'primary',
                onClick: u,
              },
              {
                default: () => [t('点击我')],
              }
            ),
          ]
        )
    },
  })
c.install = (o) => {
  o.component(c.name, c)
}
const g = [c, s],
  f = (o) => {
    g.forEach((n) => {
      o.component(n.name, n)
    })
  },
  v = {
    install: f,
  }
export { v as default }
