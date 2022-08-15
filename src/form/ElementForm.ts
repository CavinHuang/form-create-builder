import { ElementBootstrap } from "../ui/element/bootstrap";
import { Form } from "../core/form";

export class ElementForm extends Form
{
    public constructor(action = '', rule = [], config = [])
    {
      super(new ElementBootstrap(), action, rule, config);
    }
}