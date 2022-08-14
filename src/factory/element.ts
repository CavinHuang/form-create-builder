import { Form } from "../core/form";
import { Base } from "./base";

abstract class Elm extends Base
{
    /**
     * 创建表单
     *
     * @param string action
     * @param array rule
     * @param array config
     * @return Form
     * @throws FormBuilderException
     */
    public static createForm(action = '', rule = [], config = [])
    {
        return Form.elm(action, rule, config);
    }
}