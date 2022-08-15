export class InputFactory
{
    /**
     * input输入框组件
     *
     * @param string field
     * @param string title
     * @param string value
     * @param string type
     * @return Input
     */
    public static input(field: string, title: string, value = '', type = Input.TYPE_TEXT)
    {
        input = new Input(field, title, (string)value);
        return input->type(type);
    }

    /**
     * text 类型输入框
     *
     * @param string field
     * @param string title
     * @param string value
     * @return Input
     */
    public static text(field, title, value = '')
    {
        return self.input(field, title, value);
    }

    /**
     * password 类型输入框
     *
     * @param string field
     * @param string title
     * @param string value
     * @return Input
     */
    public static password(field, title, value = '')
    {
        return self.input(field, title, value, Input.TYPE_PASSWORD);
    }

    /**
     * textarea 类型输入框
     *
     * @param string field
     * @param string title
     * @param string value
     * @return Input
     */
    public static textarea(field, title, value = '')
    {
        return self.input(field, title, value, Input.TYPE_TEXTAREA);
    }

    /**
     * url 类型输入框
     *
     * @param string field
     * @param string title
     * @param string value
     * @return Input
     */
    public static url(field, title, value = '')
    {
        return self.input(field, title, value, Input.TYPE_URL);
    }

    /**
     * email 类型输入框
     *
     * @param string field
     * @param string title
     * @param string value
     * @return Input
     */
    public static email(field, title, value = '')
    {
        return self.input(field, title, value, Input.TYPE_EMAIL);
    }

    /**
     * date 类型输入框
     *
     * @param string field
     * @param string title
     * @param string value
     * @return Input
     */
    public static idate(field, title, value = '')
    {
        return self.input(field, title, value, Input.TYPE_DATE);
    }
}