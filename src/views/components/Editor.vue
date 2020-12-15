<template>
  <div class="home">
    <!-- 公式编辑器组件 -->
    <div id="wang-editor"></div>
    <!-- <button
      type="button"
      class="btn"
      @click="getEditorData"
    >
      获取当前内容
    </button> -->
    <!-- <h3>内容预览</h3>
    <textarea
      id=""
      v-model="editorData"
      name=""
      cols="170"
      rows="20"
      readonly
    ></textarea> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// 引入 wangEditor
import WangEditor from "wangeditor";
import createKityformula from "./kityformula";
import myscriptMath from "./myscript-math-web";

@Component({ components: {} })
export default class Home extends Vue {
  @Prop() private msg!: string;

  private data = "";
  editor: any = null;
  editorData = "";
  content = "";

  private mounted() {
    const editor = new WangEditor(`#editor`);

    // 配置菜单栏，删减菜单，调整顺序
    // editor.config.menus = ['bold', 'head', 'link', 'italic', 'underline']

    // 配置行高
    // editor.config.lineHeights = ['1', '1.15', '1.6', '2', '2.5', '3']

    // 获取必要的变量，这些在下文中都会用到
    const { $ } = WangEditor;
    const { PanelMenu, Panel } = WangEditor;

    class Kityformula extends PanelMenu {
      // 公式输入插件
      constructor(editors: any) {
        const $elem = WangEditor.$(
          `<div class="w-e-menu">
                  <i class="iconfont icongongshi" style="font-size:18px;"></i>
              </div>`
        );
        super($elem, editors);
      }
      // 菜单点击事件
      clickHandler() {
        // 做任何你想做的事情
        // 可参考【常用 API】文档，来操作编辑器
        const conf = createKityformula(editor);
        const panel = new Panel(this, conf);
        panel.create();
      }

      tryChangeActive() {}
    }

    class Myscript extends PanelMenu {
      // 公式手写插件
      constructor(editors: any) {
        const $elem = WangEditor.$(
          `<div class="w-e-menu">
                  <i class="iconfont iconshouxieban" style="font-size:18px;"></i>
              </div>`
        );
        super($elem, editors);
      }
      // 菜单点击事件
      clickHandler() {
        // 做任何你想做的事情
        // 可参考【常用 API】文档，来操作编辑器
        const conf = myscriptMath(editor);
        const panel = new Panel(this, conf);
        panel.create();
      }

      tryChangeActive() {}
    }

    // 注册菜单
    const menuKey = "kityformulaKey"; // 菜单 key ，各个菜单不能重复
    editor.menus.extend("kityformulaKey", Kityformula);

    // 注册菜单
    const menuKey2 = "myscriptKey"; // 菜单 key ，各个菜单不能重复
    editor.menus.extend("myscriptKey", Myscript);

    // 将菜单加入到 editor.config.menus 中
    // 也可以通过配置 menus 调整菜单的顺序，参考【配置菜单】部分的文档
    editor.config.menus = editor.config.menus.concat(menuKey);
    editor.config.menus = editor.config.menus.concat(menuKey2);

    editor.config.uploadImgShowBase64 = true;
    editor.config.uploadImgMaxLength = 5; // 一次最多上传 5 个图片

    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml: any) => {
      this.editorData = newHtml;
    };

    this.editor = editor;

    // 关闭粘贴样式的过滤
    this.editor.config.pasteFilterStyle = false;
    // 自定义处理粘贴的文本内容
    editor.config.pasteTextHandle = function (pasteStr) {
        // 对粘贴的文本进行处理，然后返回处理后的结果
        return pasteStr + '巴拉巴拉'
    }
    // this.editor.config.pasteTextHandle = function(content) {
    //   console.log(content)
    //   // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
    //   if (this.content != content) {
    //     this.content = content;
    //     var str = content;
    //     str = str.replace(/<xml>[\s\S]*?<\/xml>/gi, "");
    //     str = str.replace(/<style>[\s\S]*?<\/style>/gi, "");
    //     str = str.replace(/<\/?[^>]*>/g, "");
    //     str = str.replace(/[ | ]*\n/g, "\n");
    //     str = str.replace(/&nbsp;/gi, "");
    //     console.log(str);
    //     return str;
    //   }
    // };

    // 创建编辑器
    editor.create();
  }

  private getEditorData() {
    // 通过代码获取编辑器内容
    let data = this.editor.txt.html();
    alert(data);
  }
}
</script>

<style scoped lang="scss">
@import url("http://at.alicdn.com/t/font_2161824_78bvz3356e.css");
.home {
  width: 100%;
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
  textarea {
    width: 100%;
  }
}
</style>
