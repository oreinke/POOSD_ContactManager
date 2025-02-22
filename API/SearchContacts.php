<?php

    $inData = getRequestInfo();
    
    $searchResults = "";
    $searchCount = 0;

    $conn = new mysqli("localhost", "dba", "dbapass", "contact_manager");
    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else
    {
        $stmt = $conn->prepare("SELECT id, first_name, last_name, email FROM contacts 
                                WHERE (first_name LIKE ? OR last_name LIKE ? OR email LIKE ?) 
                                AND userid = ?");
        
        $searchTerm = "%" . $inData["search"] . "%";
        $stmt->bind_param("sssi", $searchTerm, $searchTerm, $searchTerm, $inData["userId"]);
        $stmt->execute();
        
        $result = $stmt->get_result();
        
        while ($row = $result->fetch_assoc())
        {
           $searchResults[] = $row; 
        }
        
        if ($searchCount == 0)
        {
            returnWithError("No Records Found");
        }
        else
        {
            returnWithInfo($searchResults);
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
    
    function returnWithInfo($searchResults)
    {
        $retValue = '{"results":[' . $searchResults . '],"error":""}';
        sendResultInfoAsJson($retValue);
    }
    
?>

