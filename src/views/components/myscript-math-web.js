export default function(editor) {
  // panel 中需要用到的id
  const inputIFrameId = 'myscript_' + Math.ceil(Math.random() * 10)
  const btnOkId = 'myscript-btn' + Math.ceil(Math.random() * 10)

  const conf = {
    width: 900,
    height: 560,

    // panel 中可包含多个 tab
    tabs: [
      {
        // tab 的标题
        title: editor.i18next.t('menus.panelMenus.formula.手写公式'),
        // 模板
        tpl: `<div>
                  <iframe id="${inputIFrameId}" class="iframe" height="500px" width="100%" frameborder="0" scrolling="no" src="/myscriptMath/index.html"></iframe>
                  <div class="w-e-button-container">
                      <button id="${btnOkId}" class="right">
                          ${editor.i18next.t('确认插入')}
                      </button>
                  </div>
              </div>`,
        // 事件绑定
        events: [
          {
            selector: '#' + btnOkId,
            type: 'click',
            fn: () => {
              // 执行插入公式
              const node = document.getElementById(inputIFrameId)
              const latex = node.contentWindow.latex

              // 使用 editor.cmd.do  无法关闭弹窗
              // editor.cmd.do(
              //   "insertHTML",
              //   '<img class="formula" src="https://latex.codecogs.com/gif.latex?' +
              //     latex +
              //     '" data-latex="' +
              //     latex +
              //     '" />'
              // );

              editor.txt.append(
                '<img class="formula" src="https://latex.codecogs.com/gif.latex?' +
                  latex +
                  '" data-latex="' +
                  latex +
                  '" />'
              )

              // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
              return true
            }
          }
        ]
      } // tab end
    ] // tabs end
  }

  return conf
}
