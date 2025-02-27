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
        // Return ALL contacts for that user
	    $stmt = $conn->prepare("SELECT id, first_name, last_name, email FROM contacts WHERE CONCAT_WS(' ', first_name, last_name, email) LIKE ? AND  userid = ?");

        $searchTerm = "%" . $inData["search"] . "%";
	$stmt->bind_param("si", $searchTerm, $inData["userId"]);
        //$stmt->bind_param("sssi", $searchTerm, $searchTerm, $searchTerm, $inData["userId"]);
        $stmt->execute();
        
        $result = $stmt->get_result();
       	$searchResults = array();

        while ($row = $result->fetch_assoc())
        {
           $searchResults[] = $row; 
        }
        
        if (count($searchResults) == 0)
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
        echo json_encode($obj);
    }
    
    function returnWithError($err)
    {
        //$retValue = array("results" => array(), "error" => $err);
	//sendResultInfoAsJson(json_encode($retValue));
	sendResultInfoAsJson(["results" => [], "error" => $err]);
    }
    
    function returnWithInfo($searchResults)
    {
        //$retValue = array("results" => $searchResults, "error" => "");
	//sendResultInfoAsJson(json_encode($retValue));
	sendResultInfoAsJson(["results" => $searchResults, "error" => ""]);
    }
    
?>

