<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$inData = getRequestInfo();

$id = 0;
$first_name = "";
$last_name = "";

$conn = new mysqli("localhost", "dba", "dbapass", "contact_manager");

if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    // Fix SQL query for user authentication
    $stmt = $conn->prepare("SELECT id FROM users WHERE username=? AND password=?");
    $stmt->bind_param("ss", $inData["username"], $inData["password"]);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        returnWithInfo ($row['id']);
    } else {
        returnWithError("No Records Found");
    }

    $stmt->close();
    $conn->close();
}

function getRequestInfo() {
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson($obj) {
    header('Content-type: application/json');
    echo $obj;
    }

function returnWithError($err) {
	$retValue = '{"id":0, "first_name":"","last_name":"","error":"' . $err .'"}';
    	sendResultInfoAsJson($retValue);
}

function returnWithInfo($id) {
    $retValue = '{"id":' . $id . ',"error":""}';
    sendResultInfoAsJson($retValue);
}



?>
