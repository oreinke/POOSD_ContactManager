<?php

    $inData = getRequestInfo();

    $conn = new mysqli("localhost", "dba", "dbapass", "contact_manager");
    
    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else
    {
        $stmt = $conn->prepare("DELETE FROM contacts WHERE id=? AND userid=?");
        $stmt->bind_param("ii", $inData["id"], $inData["userId"]);
        $stmt->execute();
        
        if ($stmt->affected_rows > 0) 
        {
            returnWithSuccess("Contact deleted successfully");
        } 
        else 
        {
            returnWithError("No matching contact found or deletion failed");
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

