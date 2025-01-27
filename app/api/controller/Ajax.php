<?php

namespace app\api\controller;

use think\Exception;
use think\exception\FileException;
use app\common\library\Upload;
use app\common\controller\Api;
use think\facade\Db;

class Ajax extends Api
{
    public function initialize()
    {
        parent::initialize();
    }

    public function upload()
    {
        $file = $this->request->file('file');
        try {
            $upload                = new Upload($file);
            $attachment            = $upload->upload(null, 0, 0);
            $attachment['fullurl'] = full_url($attachment['url']);
            unset($attachment['createtime'], $attachment['quote']);
        } catch (Exception | FileException $e) {
            $this->error($e->getMessage());
        }

        $this->success(__('File uploaded successfully'), [
            'file' => $attachment
        ]);
    }

    public function area()
    {
        $this->success('', get_area());
    }

    public function buildSuffixSvg()
    {
        $suffix     = $this->request->param('suffix', 'file');
        $background = $this->request->param('background');
        $content    = build_suffix_svg((string)$suffix, (string)$background);
        return response($content, 200, ['Content-Length' => strlen($content)])->contentType('image/svg+xml');
    }
}