import $ from "jquery";
import { formulaIcon } from "../../assets/icon/svg-icon.ts";

class MyKityFormulaMenu {
  constructor() {
    this.title = "编辑公式";
    this.iconSvg = formulaIcon;
    this.tag = "button";
    this.showModal = true;
    this.modalWidth = 900;
    this.modalHeight = 600;
  }

  // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
  isActive(editor) {
    return false;
  }

  // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
  getValue(editor) {
    return "";
  }

  // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
  isDisabled(editor) {
    return false;
  }
  // 点击菜单时触发的函数
  exec(editor, value) {
    // Modal menu ，这个函数不用写，空着即可
  }

  // 弹出框 modal 的定位：1. 返回某一个 SlateNode； 2. 返回 null （根据当前选区自动定位）
  getModalPositionNode(editor) {
    return null; // modal 依据选区定位
  }

  // 定义 modal 内部的 DOM Element
  getModalContentElem(editor) {
    // panel 中需要用到的id
    const inputIFrameId = "kityformula_" + Math.ceil(Math.random() * 10);
    const btnOkId = "kityformula-btn" + Math.ceil(Math.random() * 10);

    const $content = $(`
    <div>
      <iframe id="${inputIFrameId}" class="iframe" height="500px" width="100%" frameborder="0" scrolling="no" src="/kityformula/index.html"></iframe>
    </div>`);
    const $button = $(
      `<button id="${btnOkId}" class="right" style='margin: 5px 0'>
        确认插入
      </button>`
    );
    $content.append($button);

    $button.on("click", () => {
      // 执行插入公式
      const node = document.getElementById(inputIFrameId);
      const kfe = node.contentWindow.kfe;

      kfe.execCommand("get.image.data", function(data) {
        // 获取base64
        // console.log(data.img);
      });

      let latex = kfe.execCommand("get.source");
      latex = latex.replace(/\s/g, ""); // 去掉空格

      const formulaNode = {
        type: "paragraph",
        children: [
          {
            type: "formula",
            value: latex,
            children: [
              {
                text: "",
              },
            ],
          },
        ],
      };
      editor.insertNode(formulaNode);
      editor.hidePanelOrModal();
    });

    return $content[0]; // 返回 DOM Element 类型

    // PS：也可以把 $content 缓存下来，这样不用每次重复创建、重复绑定事件，优化性能
  }
}
const menuConf = {
  key: "kityFormula", // menu key ，唯一。注册之后，需通过 toolbarKeys 配置到工具栏
  factory() {
    return new MyKityFormulaMenu();
  },
};

export default menuConf;
