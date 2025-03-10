<?php

    $inData = getRequestInfo();
    error_log("DEBUG userId: " . $inData["userId"]);
    error_log("DEBUG firstName: " . $inData["first_name"]);
    error_log("DEBUG lastName: " . $inData["last_name"]);
    error_log("DEBUG email: " . $inData["email"]);

    // ✅ Check if userId is missing or invalid before proceeding
    if (!isset($inData["userId"]) || empty($inData["userId"])) {
        returnWithError("Missing user ID");
        exit();  // Stop further execution
    }

    $conn = new mysqli("localhost", "dba", "dbapass", "contact_manager");
    
    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else
    {
        $stmt = $conn->prepare("SELECT id FROM contacts WHERE userid = ? AND email = ?");
        $stmt->bind_param("is", $inData["userId"], $inData["email"]);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            returnWithError("Contact already exists");
            exit();
        }
        $stmt->close();
        $stmt = $conn->prepare("INSERT INTO contacts (userid, first_name, last_name, email) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("isss", $inData["userId"], $inData["first_name"], $inData["last_name"], $inData["email"]);
        
        if ($stmt->execute()) 
        {
            returnWithSuccess("Contact added successfully");
        } 
        else 
        {
            returnWithError("Failed to add contact");
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
