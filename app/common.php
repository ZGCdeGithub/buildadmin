<?php
// 应用公共文件

if (!function_exists('path_is_writable')) {
    /**
     * 检查目录/文件是否可写
     * @param $path
     * @return bool
     */
    function path_is_writable($path): bool
    {
        if (DIRECTORY_SEPARATOR == '/' && @ini_get('safe_mode') == false) {
            return is_writable($path);
        }

        if (is_dir($path)) {
            $path = rtrim($path, '/') . '/' . md5(mt_rand(1, 100) . mt_rand(1, 100));
            if (($fp = @fopen($path, 'ab')) === false) {
                return false;
            }

            fclose($fp);
            @chmod($path, 0777);
            @unlink($path);

            return true;
        } elseif (!is_file($path) || ($fp = @fopen($path, 'ab')) === false) {
            return false;
        }

        fclose($fp);
        return true;
    }
}

if (!function_exists('__')) {
    function __(string $name, array $vars = [], string $lang = '')
    {
        if (is_numeric($name) || !$name) {
            return $name;
        }
        return \think\facade\Lang::get($name, $vars, $lang);
    }
}