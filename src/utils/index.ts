import { FormComponentInterface, CustomComponentInterface } from '../contract';

export class Util
{
    public static isComponent($component: any)
    {
        return $component instanceof CustomComponentInterface || $component instanceof FormComponentInterface;
    }
}