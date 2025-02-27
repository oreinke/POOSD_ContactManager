<?php

    $inData = getRequestInfo();

    $conn = new mysqli("localhost", "dba", "dbapass", "contact_manager");
    
    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else
    {
        $stmt = $conn->prepare("UPDATE contacts SET first_name=?, last_name=?, email=? WHERE id=? AND userid=?");
        $stmt->bind_param("sssii", $inData["first_name"], $inData["last_name"], $inData["email"], $inData["id"], $inData["userId"]);
        
        if ($stmt->execute()) 
        {
            returnWithSuccess("Contact updated successfully");
        } 
        else 
        {
            returnWithError("No matching contact found or update failed");
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
