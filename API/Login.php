<?php
header('Access-Control-Allow-Origin: *');
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
    $stmt = $conn->prepare("SELECT id, name, password  FROM users WHERE username=? AND password=?");
    $stmt->bind_param("ss", $inData["username"], $inData["password"]);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
	    /*$id = $row['id'];
	    $first_name = $row['name'];
	    $last_name = ""; 
	    returnWithInfo($id, $first_name, $last_name); */
	    returnWithInfo($row['id'], $row['name']);
    } else {
        returnWithError("Incorrect Username or Password");
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
	//$retValue = '{"id":0, "first_name":"","last_name":"","error":"' . $err .'"}';
	$retValue = '{"id":0,"name":"","error":"' . $err . '"}';
    	sendResultInfoAsJson($retValue);
}

function returnWithInfo($id, $first_name, $last_name) {
	//$retValue = '{"id":' . $id . ',"first_name":"' . $first_name . '","last_name":"' . $last_name . '","error":""}';
	$retValue = '{"id":' . $id . ',"name":"' . $name . '","error":""}';;
    sendResultInfoAsJson($retValue);
}



?>
