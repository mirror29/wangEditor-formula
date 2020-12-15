<template>
  <div class="home">
    <h3>WangEditor with vue</h3>
    <div id="demo1"></div>
    <button type="button" class="btn" @click="getEditorData">
      获取当前内容
    </button>
    <h3>内容预览</h3>
    <textarea
      name=""
      id=""
      cols="170"
      rows="20"
      readonly
      v-model="editorData"
    ></textarea>
  </div>
</template>

<script>
// 引入 wangEditor
import WangEditor from 'wangeditor'
import createKityformula from './components/kityformula'
import myscriptMath from './components/myscript-math-web'

export default {
  data () {
    return {
      editor: null,
      editorData: ''
    }
  },
  mounted () {
    const editor = new WangEditor('#demo1')

    // 配置菜单栏，删减菜单，调整顺序
    // editor.config.menus = ['bold', 'head', 'link', 'italic', 'underline']

    // 配置行高
    // editor.config.lineHeights = ['1', '1.15', '1.6', '2', '2.5', '3']

    // 获取必要的变量，这些在下文中都会用到
    const { $ } = WangEditor
    const { PanelMenu, Panel } = WangEditor

    class Kityformula extends PanelMenu {
      // 公式输入插件
      constructor (editors) {
        const $elem = WangEditor.$(
          `<div class="w-e-menu">
                  <i class="iconfont icongongshi" style="font-size:18px;"></i>
              </div>`
        )
        super($elem, editors)
      }

      // 菜单点击事件
      clickHandler () {
        // 做任何你想做的事情
        // 可参考【常用 API】文档，来操作编辑器
        const conf = createKityformula(editor)
        const panel = new Panel(this, conf)
        panel.create()
      }

      tryChangeActive () {}
    }

    class Myscript extends PanelMenu {
      // 公式手写插件
      constructor (editors) {
        const $elem = WangEditor.$(
          `<div class="w-e-menu">
                  <i class="iconfont iconshouxieban" style="font-size:18px;"></i>
              </div>`
        )
        super($elem, editors)
      }

      // 菜单点击事件
      clickHandler () {
        // 做任何你想做的事情
        // 可参考【常用 API】文档，来操作编辑器
        const conf = myscriptMath(editor)
        const panel = new Panel(this, conf)
        panel.create()
      }

      tryChangeActive () {}
    }

    // 注册菜单
    const kityformulaKey = 'kityformulaKey' // 菜单 key ，各个菜单不能重复
    editor.menus.extend('kityformulaKey', Kityformula)

    // 注册菜单
    const myscriptKey = 'myscriptKey' // 菜单 key ，各个菜单不能重复
    editor.menus.extend('myscriptKey', Myscript)

    // 将菜单加入到 editor.config.menus 中
    // 也可以通过配置 menus 调整菜单的顺序，参考【配置菜单】部分的文档
    editor.config.menus = editor.config.menus.concat(kityformulaKey)
    editor.config.menus = editor.config.menus.concat(myscriptKey)

    editor.config.uploadImgShowBase64 = true
    editor.config.uploadImgMaxLength = 5 // 一次最多上传 5 个图片

    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = newHtml => {
      this.editorData = newHtml
    }

    // 创建编辑器
    editor.create()
    this.editor = editor
  },
  methods: {
    getEditorData () {
      // 通过代码获取编辑器内容
      const data = this.editor.txt.html()
      alert(data)
    }
  },
  beforeDestroy () {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  }
}
</script>

<style lang="scss">
@import url("http://at.alicdn.com/t/font_2161824_78bvz3356e.css");

.home {
  width: 1200px;
  margin: auto;
  position: relative;
  .btn {
    position: absolute;
    right: 0;
    top: 0;
    padding: 5px 10px;
    cursor: pointer;
  }
  h3 {
    margin: 30px 0 15px;
  }
}
</style>
