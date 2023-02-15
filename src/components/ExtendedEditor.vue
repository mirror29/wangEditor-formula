<script setup>
// import { h } from 'snabbdom'
import { onBeforeUnmount, ref, shallowRef } from 'vue'
// import { IButtonMenu } from '@wangeditor/core'
import { Boot } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

// 测试：第三方插件
// import withCtrlEnter from '@wangeditor/plugin-ctrl-enter'
// Boot.registerPlugin(withCtrlEnter)

// // 测试：多语言
// i18nChangeLanguage('en')

// // 测试：注册 renderElem
// function renderElemFn(elem, children) {
//     const vnode = h('div', {}, children) // type: 'paragraph' 节点，即渲染为 <p> 标签
//     return vnode
// }
// const renderElemConf = {
//     type: 'paragraph', // 节点 type ，重要！！！
//     renderElem: renderElemFn,
// }
// Boot.registerRenderElem(renderElemConf)

// // 测试：注册插件
// function withCtrlEnter(editor) {
//     const { insertBreak } = editor

//     setTimeout(() => {
//         // beforeInput 事件不能识别 ctrl+enter ，所以自己绑定 DOM 事件
//         const { $textArea } = DomEditor.getTextarea(newEditor)
//         $textArea.on('keydown', e => {
//             const isCtrl = e.ctrlKey || e.metaKey
//             if (e.keyCode === 13 && isCtrl) {
//                 // ctrl+enter 触发换行
//                 editor.insertBreak()
//             }
//         })
//     })

//     const newEditor = editor
//     newEditor.insertBreak = () => {
//         const e = window.event
//         const isCtrl = e.ctrlKey || e.metaKey
//         // 只有 ctrl 才能换行
//         if (isCtrl) {
//             insertBreak()
//         }
//     }
//     return newEditor
// }
// Boot.registerPlugin(withCtrlEnter)

// 测试：注册 button menu
class MyButtonMenu {
    constructor() {
        this.title = 'menu1',
        this.tag = 'button'
    }
    getValue() { return '' }
    isActive() { return false }
    isDisabled() { return false }
    exec(editor) {
        console.log(editor)
        alert('menu1 exec')
    }
}
const menuConf = {
  key: 'my-menu-1', // menu key ，唯一。注册之后，需通过 toolbarKeys 配置到工具栏
  factory() {
    return new MyButtonMenu()
  },
}
Boot.registerMenu(menuConf)
console.log(1111111111)


// 编辑器实例，必须用 shallowRef ，重要！
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello&nbsp;world</p>')

// 编辑器配置
const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {
        insertImage: {
            checkImage(src) {
                console.log('image src', src)
                if (src.indexOf("http") !== 0) {
                    return "图片网址必须以 http/https 开头";
                }
                return true;
            },
        },
    }
}

// 工具栏配置
const toolbarConfig = {
    // toolbarKeys: ['headerSelect', 'bold', 'my-menu-1'],
    // excludeKeys: [],
    insertKeys: {
        index: 0,
        keys: 'my-menu-1'
    }
}

// 编辑器回调函数
const handleCreated = (editor) => {
    console.log("created", editor);

    editorRef.value = editor // 记录 editor 实例，重要！

    // window.editor = editor // 临时测试使用，用完删除
}
const handleChange = (editor) => {
    console.log("change:", editor.children);
}
const handleDestroyed = (editor) => {
    console.log('destroyed', editor)
}
const handleFocus = (editor) => {
    console.log('focus', editor)
}
const handleBlur = (editor) => {
    console.log('blur', editor)
}
const customAlert = (info, type) => {
    alert(`【自定义提示】${type} - ${info}`)
}
const customPaste = (editor, event, callback) => {
    console.log('ClipboardEvent 粘贴事件对象', event)

    // 自定义插入内容
    editor.insertText('xxx')

    // 返回值（注意，vue 事件的返回值，不能用 return）
    callback(false) // 返回 false ，阻止默认粘贴行为
    // callback(true) // 返回 true ，继续默认的粘贴行为
}

// 及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return

    // 销毁，并移除 editor
    editor.destroy()
})

const getHtml = () => {
    const editor = editorRef.value
    if (editor == null) return

    console.log(editor.getHtml())
}
</script>

<template>
    <div>
        <button @click="getHtml">获取 html</button>
    </div>
    <div style="border: 1px solid #ccc">
        <!-- 工具栏 -->
        <Toolbar
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            style="border-bottom: 1px solid #ccc"
        />
        <!-- 编辑器 -->
        <Editor
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            @onChange="handleChange"
            @onCreated="handleCreated"
            @onDestroyed="handleDestroyed"
            @onFocus="handleFocus"
            @onBlur="handleBlur"
            @customAlert="customAlert"
            @customPaste="customPaste"
            style="height: 500px"
        />
    </div>
</template>

<style src="@wangeditor/editor/dist/css/style.css"></style>
