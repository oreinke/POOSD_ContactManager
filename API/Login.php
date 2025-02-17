<?php

$inData = getRequestInfo();

$conn = new mysqli("localhost", "dba", "dbapass", "contact_manager");
if ($conn->connect_error) 
{
    returnWithError($conn->connect_error);
} 
else
{
    $searchTerm = "%" . $inData["search"] . "%"; // Add wildcard for LIKE operator
    $userId = $inData["userid"];

    $stmt = $conn->prepare("SELECT id, first_name, last_name, email FROM contacts 
                            WHERE (first_name LIKE ? OR last_name LIKE ? OR email LIKE ?) 
                            AND userid = ?");
    
    $stmt->bind_param("sssi", $searchTerm, $searchTerm, $searchTerm, $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $searchResults = [];
    
    while ($row = $result->fetch_assoc()) 
    {
        $searchResults[] = [
            "id" => $row["id"],
            "firstName" => $row["first_name"],
            "lastName" => $row["last_name"],
            "email" => $row["email"]
        ];
    }
    
    if (count($searchResults) > 0) 
    {
        returnWithInfo($searchResults);
    } 
    else 
    {
        returnWithError("No Records Found");
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
    $retValue = ["results" => [], "error" => $err];
    sendResultInfoAsJson($retValue);
}

function returnWithInfo($searchResults)
{
    $retValue = ["results" => $searchResults, "error" => ""];
    sendResultInfoAsJson($retValue);
}

?>
