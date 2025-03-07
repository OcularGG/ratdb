<?php
$client_id = 'YOUR_CLIENT_ID';
$redirect_uri = 'https://yourdomain.com/callback.php';
$scope = 'identify email';

header('Location: https://discord.com/api/oauth2/authorize?client_id=' . $client_id . '&redirect_uri=' . urlencode($redirect_uri) . '&response_type=code&scope=' . urlencode($scope));
exit();
?>