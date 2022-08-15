const Elm = require('../dist/factory/element')
const ElementForm = require('../dist/form/ElementForm')

const action = '/save.php';
const method = 'POST';

const input = Elm.input('goods_name', '商品名称').required();
const textarea = Elm.textarea('goods_info', '商品简介');
const switchInput = Elm.switches('is_open', '是否开启').activeText('开启').inactiveText('关闭');

//创建表单
const form = (new ElementForm(action)).setMethod(method);

//添加组件
form.setRule([input, textarea]);
form.append(switchInput);

form.formData({
    'goods_name': 'goods_name123',
    'asdf' : 'asdfafd',
    'is_open' : '0'
}).setValue('goods_info', "asdf\r\nadfa");

//生成表单页面

console.log(form.view())