<?php
$client_id = 'YOUR_CLIENT_ID';
$client_secret = 'YOUR_CLIENT_SECRET';
$redirect_uri = 'https://yourdomain.com/callback.php';
$code = $_GET['code'];

$token_url = 'https://discord.com/api/oauth2/token';
$data = array(
    'client_id' => $client_id,
    'client_secret' => $client_secret,
    'grant_type' => 'authorization_code',
    'code' => $code,
    'redirect_uri' => $redirect_uri
);

$options = array(
    'http' => array(
        'header'  => "Content-Type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    )
);

$context  = stream_context_create($options);
$response = file_get_contents($token_url, false, $context);
$token = json_decode($response, true);

$user_url = 'https://discord.com/api/users/@me';
$options = array(
    'http' => array(
        'header' => "Authorization: Bearer " . $token['access_token'] . "\r\n"
    )
);

$context  = stream_context_create($options);
$response = file_get_contents($user_url, false, $context);
$user = json_decode($response, true);

// Save user information in the session or database
session_start();
$_SESSION['user'] = $user;

// Redirect to the homepage
header('Location: index.html');
exit();
?>