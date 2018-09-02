<?php

require_once __DIR__ . '/../bootstrap.php';

$request = new \App\Request();
$response = new App\Response();
$segment = (object)$request->json('segment');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    $response->json();
}

if (is_null($segment)) {
    $response->json(['error' => 'Segment missing'], 400);
}

$sessionFile = __DIR__ . '/../storage/sessions.json';

if (!file_exists($sessionFile)) {
    file_put_contents($sessionFile, '{}');
}

$sessions = json_decode(file_get_contents($sessionFile));

$sessionId = $segment->sessionId;
$segmentId = $segment->id;

unset($segment->sessionId);

if (!property_exists($sessions, $sessionId)) {
    $sessions->{$sessionId} = [$segment];

    file_put_contents($sessionFile, json_encode($sessions, JSON_PRETTY_PRINT));

    $response->json(['success' => true]);
}

foreach ($sessions->{$sessionId} as $s) {
    if ($s->id === $segmentId) {
        $response->json(['error' => 'Segment exists'], 400);
        break;
    }
}

array_push($sessions->{$sessionId}, $segment);

file_put_contents($sessionFile, json_encode($sessions, JSON_PRETTY_PRINT));

$response->json(['success' => true]);
