<?php
require_once('vendor/autoload.php');
$client = new \GuzzleHttp\Client();
session_start();
function data_requester($link, $client) {
    $data = $client->request('GET', "https://api.themoviedb.org/3/$link", [
    'headers' => [
        'Authorization' => 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWFkZTEwNjNlM2EwZGYyNmQ5NzgwYTZlYjA5NzQ4MCIsIm5iZiI6MTcxOTQyMzQwMy4yMjMxMzIsInN1YiI6IjY2N2FhMjZjYTUwYmFmNTEwMDE1OTY5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LjJbl4DxxSw-r6n9uwBohQmjxK0DLth0Hkxx_TBKqJs',
        'accept' => 'application/json',
    ],
    ]);
    $data = json_decode($data->getBody());
    $data = $data->results;
    return $data;
}
$action = (int) $_GET["action"] ?? 0;
$item;
if (isset($_GET["item"])) {
    $item = $_GET["item"];
    $item = urldecode($item);
    $item = json_decode($item);
}
$type = (int) isset($_GET["type"]) ? $_GET["type"] : 0;
$require_awnser = [];
$link;
switch ($action) {
    case 0:
        $require_awnser = [
            "err" => "Bad Request",
            "err_code" => 404
        ];
        break;
    case 1:
        $require_awnser = data_requester("movie/popular?language=en-US&page=1", $client);
        break;
    case 2:
        $require_awnser = data_requester("movie/top_rated?language=en-US&page=1", $client);
        break;
    case 3:
        $require_awnser = data_requester("tv/popular?language=en-US&page=1", $client);
        break;
    case 4:
        $require_awnser = data_requester("tv/top_rated?language=en-US&page=1", $client);
        break;
    case 5:
        if (isset($_SESSION["data"]["fav"][$type])) {
            $require_awnser = json_decode($_SESSION["data"]["fav"][$type]);
        } else {
            $require_awnser = [
                "err" => "Empty State",
                "err_code" => 204 // codigo empty state
            ];
        }
        break;
    case 6:
        if (isset($_SESSION["data"]["watch_list"][$type])) {
            $require_awnser = json_decode($_SESSION["data"]["watch_list"][$type]);
        } else {
            $require_awnser = [
                "err" => "Empty State",
                "err_code" => 204 // codigo empty state
            ];
        }
        break;
    case 7:
        $_SESSION["data"]["fav"][$type] = [json_encode($item), $item->id];
        break;
    case 8:
        $_SESSION["data"]["watch_list"][$type] = [json_encode($item), $item->id];
        break;
    case 9:
        foreach ($_SESSION["data"]["fav"][$type] as $data) {
            $data = json_decode($data);
        }
}
print_r(json_encode($require_awnser));