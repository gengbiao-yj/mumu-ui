;(function (e, t) {
  typeof exports == 'object' && typeof module < 'u'
    ? (module.exports = t(require('vue')))
    : typeof define == 'function' && define.amd
    ? define(['vue'], t)
    : ((e = typeof globalThis < 'u' ? globalThis : e || self),
      (e['mumu-ui'] = t(e.Vue)))
})(this, function (e) {
  'use strict'
  const t = { msg: { type: String, required: !1, default: '' } },
    c = (o) => {
      console.log('test log: ', o)
    },
    i = 'mumu-foo',
    n = e.defineComponent({
      name: i,
      props: t,
      setup(o, s) {
        console.log(o, s)
        const l = () => {
          console.log('点击按钮测试', o.msg), c(o.msg)
        }
        return () =>
          e.createVNode('div', { class: i }, [
            e.createVNode('h1', null, [e.createTextVNode('mumu-ui Foo')]),
            e.createVNode('p', { class: i + '__description' }, [
              e.createTextVNode('msg is: '),
              o.msg,
            ]),
            e.createVNode(
              e.resolveComponent('el-button'),
              { type: 'primary', onClick: l },
              { default: () => [e.createTextVNode('点击我')] }
            ),
          ])
      },
    })
  n.install = (o) => {
    o.component(n.name, n)
  }
  const u = '',
    d = [n]
  return {
    install: (o) => {
      d.forEach((s) => {
        o.component(s.name, s)
      })
    },
  }
})
