;(function (e, t) {
  typeof exports == 'object' && typeof module < 'u'
    ? (module.exports = t(require('vue')))
    : typeof define == 'function' && define.amd
    ? define(['vue'], t)
    : ((e = typeof globalThis < 'u' ? globalThis : e || self),
      (e['mumu-ui'] = t(e.Vue)))
})(this, function (e) {
  'use strict'
  const t = {},
    i = 'mumu-card',
    s = e.defineComponent({
      name: i,
      props: t,
      setup(o, n) {
        return (
          console.log(o, n),
          () =>
            e.createVNode('div', { class: i }, [
              e.createVNode('div', null, [e.createTextVNode('mumu-card')]),
            ])
        )
      },
    })
  s.install = (o) => {
    o.component(s.name, s)
  }
  const l = { msg: { type: String, required: !1, default: '' } },
    r = (o) => {
      console.log('test log: ', o)
    },
    d = 'mumu-foo',
    c = e.defineComponent({
      name: d,
      props: l,
      setup(o, n) {
        console.log(o, n)
        const a = () => {
          console.log('点击按钮测试', o.msg), r(o.msg)
        }
        return () =>
          e.createVNode('div', { class: d }, [
            e.createVNode('h1', null, [e.createTextVNode('mumu-ui Foo')]),
            e.createVNode('p', { class: d + '__description' }, [
              e.createTextVNode('msg is: '),
              o.msg,
            ]),
            e.createVNode(
              e.resolveComponent('el-button'),
              { type: 'primary', onClick: a },
              { default: () => [e.createTextVNode('点击我')] }
            ),
          ])
      },
    })
  c.install = (o) => {
    o.component(c.name, c)
  }
  const u = '',
    m = [c, s]
  return {
    install: (o) => {
      m.forEach((n) => {
        o.component(n.name, n)
      })
    },
  }
})
