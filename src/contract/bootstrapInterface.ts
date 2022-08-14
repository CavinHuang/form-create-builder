import { Form } from "../core/form";

export abstract class BootstrapInterface
{
    /**
     * 初始化
     *
     * @param Form $form
     * @return void
     */
    abstract init(form: Form): void;
}