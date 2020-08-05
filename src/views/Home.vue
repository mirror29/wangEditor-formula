<template>
  <div class="home">
    <h3>wangEditor with vue</h3>
    <div id="demo1"></div>
    <button type="button" class="btn" @click="getEditorData">获取当前内容</button>
    <h3>内容预览</h3>
    <textarea name="" id="" cols="170" rows="20" readonly v-model="editorData"></textarea>
  </div>
</template>

<script>

// 引入 wangEditor
import wangEditor from '@wangeditor-team/we-next'

export default {
  data() {
    return {
      editor: null,
      editorData: ''
    }
  },
  mounted() {
    const editor = new wangEditor(`#demo1`)

    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
       this.editorData = newHtml
    }

    // 创建编辑器
    editor.create()

    this.editor = editor
  },
  methods: {
    getEditorData() {
      // 通过代码获取编辑器内容
      let data = this.editor.txt.html()
      alert(data)
    }
  }
}
</script>

<style lang="scss">
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
