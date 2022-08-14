import { CustomComponentInterface } from "./customComponentInterface";

export abstract class FormComponentInterface extends CustomComponentInterface
{
    constructor($field: string, $title: any) {
      super();
    }
}