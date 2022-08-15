import { Form } from './../../core/form';
import { BootstrapInterface } from "../../contract";

export class ElementBootstrap implements BootstrapInterface
{

    public init(form: Form)
    {
        const dependScript = form.getDependScript();

        dependScript.splice(2, 0, ...[
            '<link href="https://unpkg.com/element-ui@2.12.0/lib/theme-chalk/index.css" rel="stylesheet">',
            '<script src="https://unpkg.com/element-ui@2.12.0/lib/index.js"></script>',
            '<script src="https://unpkg.com/@form-create/element-ui@1.0.20/dist/form-create.min.js"></script>',
        ]);

        form.setDependScript(dependScript);
    }
}