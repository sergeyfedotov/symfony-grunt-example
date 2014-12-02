<?php
namespace AppBundle\Twig\Extension;

/**
 * Class CombinedAssetsExtension
 * @package AppBundle\Twig\Extension
 * @author Sergey Fedotov <sergey89@gmail.com>
 */
class CombinedAssetsExtension extends \Twig_Extension
{
    /**
     * @var array
     */
    protected $assets = array();

    /**
     * @param array $assets
     * @param bool $debug
     */
    public function __construct(array $assets, $debug)
    {
        foreach ($assets as $type => $combined) {
            foreach ($combined as $name => $files) {
                $this->assets[$type][$name] = (array)($debug ? $files['input'] : $files['output']);
            }
        }
    }

    /**
     * @return array
     */
    public function getGlobals()
    {
        return array('assets' => $this->assets);
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'combined_assets';
    }
}
