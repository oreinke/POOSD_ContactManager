<?php
session_start();
session_unset();
session_destroy();

header('Content-type: application/json');
echo json_encode(["message" => "Logged out successfully"]);
?>

