<?php
$container->setParameter('assets_version', dechex(filemtime(__DIR__ . '/assets.json')));
$container->setParameter('assets', json_decode(file_get_contents(__DIR__ . '/assets.json'), true));

