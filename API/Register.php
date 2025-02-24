<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$inData = getRequestInfo();

$conn = new mysqli("localhost", "dba", "dbapass", "contact_manager");

if ($conn->connect_error) 
{
    returnWithError($conn->connect_error);
} 
else 
{
    // Check if username already exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE username=?");
    $stmt->bind_param("s", $inData["username"]);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0)
    {
        returnWithError("Username already taken");
        $stmt->close();
        $conn->close();
        exit();
    }
    
    $stmt->close();

    // Insert new user
    $stmt = $conn->prepare("INSERT INTO users (username, password, name, email) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $inData["username"], $inData["password"],  $inData["name"], $inData["email"]);
    
    if ($stmt->execute()) 
    {
        returnWithSuccess("User registered successfully");
    } 
    else 
    {
        returnWithError("Registration failed");
    }

    $stmt->close();
    $conn->close();
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson($obj)
{
    header('Content-type: application/json');
    echo $obj;
}

function returnWithError($err)
{
    $retValue = '{"results":[],"error":"' . $err . '"}';
    sendResultInfoAsJson($retValue);
}

function returnWithSuccess($msg)
{
    $retValue = '{"results":[],"message":"' . $msg . '"}';
    sendResultInfoAsJson($retValue);
}

?>

