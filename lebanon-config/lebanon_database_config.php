<?php
// //config/database_config.php

$host = getenv('DB_HOST_LB');
$username = getenv('DB_USER_LB');
$password = getenv('DB_PASSWORD_LB');
$database = getenv('DB_NAME_LB');


$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>