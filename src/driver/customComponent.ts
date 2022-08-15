import { CustomComponentInterface } from "../contract";

/**
 * 自定义组件
 * Class CustomComponent
 */
class CustomComponent implements CustomComponentInterface
{
    // use BaseRule;
    // use ChildrenRule;
    // use EmitRule;
    // use PropsRule;
    // use ValidateRule;
    // use CallPropsRule;
    // use ControlRule;

    protected static $propsRule = [];

    protected $defaultProps = [];

    protected $appendRule = [];

    /**
     * CustomComponent constructor.
     * @param null|string $type
     */
    public function __construct($type = null)
    {
        $this->setRuleType(is_null($type) ? $this->getComponentName() : $type)->props($this->defaultProps);
    }

    public function __toString()
    {
        return $this->toJson();
    }

    public function __invoke()
    {
        return $this->build();
    }

    public function toJson()
    {
        return json_encode($this->build());
    }

    protected function getComponentName()
    {
        return lcfirst(basename(str_replace('\\', '/', get_class($this))));
    }

    public function appendRule($name, $value)
    {
        $this->appendRule[$name] = $name == 'props' ? (object)$value : $value;
        return $this;
    }

    public function getRule()
    {
        return array_merge(
            $this->parseBaseRule(),
            $this->parseEmitRule(),
            $this->parsePropsRule(),
            $this->parseValidateRule(),
            $this->parseChildrenRule(),
            $this->parseControlRule()
        );
    }

    public function build()
    {
        return $this->appendRule + $this->getRule();
    }

    public function jsonSerialize()
    {
        return $this->build();
    }

    public function offsetExists($offset)
    {
        return isset($this->props[$offset]);
    }

    public function offsetGet($offset)
    {
        return $this->props[$offset];
    }

    public function offsetSet($offset, $value)
    {
        $this->props[$offset] = $value;
    }

    public function offsetUnset($offset)
    {
        unset($this->props[$offset]);
    }
}