<?php

namespace App;

class Request
{
    /**
     * Get JSON from client request.
     *
     * @param string $key
     * @param null $default
     * @return null
     */
    public function json($key, $default = null)
    {
        $request = json_decode(file_get_contents('php://input'), true);
        return isset($request[$key]) ? $request[$key] : $default;
    }
}
