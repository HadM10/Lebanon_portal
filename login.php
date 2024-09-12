<?php
include('headers.php');
// No need for db_connection.php since we are using environment variables for authentication

require_once __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;

// Load environment variables from .env file
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Retrieve environment variables for admin credentials
$ansarUsername = $_ENV['ANSAR_USERNAME']; // Use $_ENV to get environment variables
$ansarPassword = $_ENV['ANSAR_PASSWORD'];
$lebanonUsername = $_ENV['LEBANON_USERNAME'];
$lebanonPassword = $_ENV['LEBANON_PASSWORD'];

// Default response for invalid request method
$response = array('status' => 'error', 'message' => 'Invalid request method');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    // Check if credentials are provided
    if (!empty($username) && !empty($password)) {
        // Check credentials for Ansar Admin
        if ($username === $ansarUsername && $password === $ansarPassword) {
            session_start();
            session_regenerate_id(true); // Regenerate session ID to prevent session fixation
            $_SESSION['user_id'] = 1; // Set a fixed user ID for the Ansar admin
            $_SESSION['login_time'] = time();  // Set login timestamp
            $_SESSION['user_role'] = 'ansar'; // Set user role to 'ansar'

            $response = array('status' => 'success', 'message' => 'Sign in successfully', 'user_role' => 'ansar');
        }
        // Check credentials for Lebanon Admin
        elseif ($username === $lebanonUsername && $password === $lebanonPassword) {
            session_start();
            session_regenerate_id(true); // Regenerate session ID to prevent session fixation
            $_SESSION['user_id'] = 1; // Set a fixed user ID for the Lebanon admin
            $_SESSION['login_time'] = time();  // Set login timestamp
            $_SESSION['user_role'] = 'lebanon'; // Set user role to 'lebanon'

            $response = array('status' => 'success', 'message' => 'Sign in successfully', 'user_role' => 'lebanon');
        } else {
            $response = array('status' => 'error', 'message' => 'Invalid credentials');
        }
    } else {
        $response = array('status' => 'error', 'message' => 'Missing credentials');
    }
} else {
    $response = array('status' => 'error', 'message' => 'Invalid request method');
}

// Send response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>