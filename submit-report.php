<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $turnstileSecret = 'YOUR_SECRET_KEY';
    $turnstileResponse = $_POST['cf-turnstile-response'];
    
    // Verify the Turnstile response
    $response = file_get_contents("https://challenges.cloudflare.com/turnstile/v0/siteverify?secret=$turnstileSecret&response=$turnstileResponse");
    $responseKeys = json_decode($response, true);

    if ($responseKeys['success']) {
        // Process the form data
        $rat = $_POST['rat'];
        $knownAliases = $_POST['knownAliases'];
        $discords = $_POST['discord'];
        $discordDisplayName = $_POST['discordDisplayName'];
        $currentGuild = $_POST['currentGuild'];
        $previousGuilds = $_POST['previousGuilds'];
        $dateOfIncident = $_POST['dateOfIncident'];
        $incidentType = $_POST['incidentType'];
        $incidentReport = $_POST['incidentReport'];
        $loss = $_POST['loss'];
        $server = $_POST['server'];
        $evidence = $_FILES['evidence'];

        // Save the form data to the database or send an email,