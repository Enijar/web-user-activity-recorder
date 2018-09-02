<?php

namespace App;

class Response
{
    /**
     * Send JSON response to client.
     *
     * @param array $data
     * @param int $status
     */
    public function json($data = [], $status = 200)
    {
        header('Content-Type: application/json');
        http_response_code($status);
        echo json_encode($data);
        exit;
    }
}
