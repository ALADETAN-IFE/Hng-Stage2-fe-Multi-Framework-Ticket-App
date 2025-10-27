<?php
// Initialize data directories and files

// Create directories if they don't exist
$dirs = ['data', 'cache', 'templates'];
foreach ($dirs as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
}

// Initialize users.json with demo user
$usersFile = 'data/users.json';
if (!file_exists($usersFile)) {
    $demoUser = [
        [
            'id' => 1,
            'name' => 'Demo User',
            'email' => 'demo@ticketstressed.com',
            'password' => 'password123'
        ]
    ];
    file_put_contents($usersFile, json_encode($demoUser, JSON_PRETTY_PRINT));
    echo "Created users.json with demo user\n";
} else {
    echo "users.json already exists\n";
}

// Initialize tickets.json
$ticketsFile = 'data/tickets.json';
if (!file_exists($ticketsFile)) {
    file_put_contents($ticketsFile, json_encode([], JSON_PRETTY_PRINT));
    echo "Created tickets.json\n";
} else {
    echo "tickets.json already exists\n";
}

echo "Initialization complete!\n";
echo "Demo credentials:\n";
echo "Email: demo@ticketstressed.com\n";
echo "Password: password123\n";
