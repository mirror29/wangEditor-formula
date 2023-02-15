class MyButtonMenu {
  constructor() {
    (this.title = "menu12222"), (this.tag = "button");
  }
  getValue() {
    return "";
  }
  isActive() {
    return false;
  }
  isDisabled() {
    return false;
  }
  exec(editor) {
    console.log(editor);
    alert("menu1 exec");
  }
}
const menuConf = {
  key: "my-menu-1", // menu key ，唯一。注册之后，需通过 toolbarKeys 配置到工具栏
  factory() {
    return new MyButtonMenu();
  },
};

export default menuConf;
