<?php

    $inData = getRequestInfo();

    $conn = new mysqli("localhost", "dba", "dbapass", "contact_manager");
    
    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else
    {
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
