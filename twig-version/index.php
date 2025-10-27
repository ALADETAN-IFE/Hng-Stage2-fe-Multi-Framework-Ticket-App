<?php
require_once 'vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

// Start session
session_start();

// Initialize Twig
$loader = new FilesystemLoader(__DIR__ . '/templates');
$twig = new Environment($loader, [
    'cache' => __DIR__ . '/cache',
    'debug' => true
]);

// Route handling
$route = $_SERVER['REQUEST_URI'] ?? '/';
$route = parse_url($route, PHP_URL_PATH);

// Remove query string and normalize path
$route = rtrim($route, '/') ?: '/';

// Serve static assets
if (strpos($route, '/assets/') === 0) {
    $assetPath = __DIR__ . $route;
    if (file_exists($assetPath)) {
        $mimeType = mime_content_type($assetPath);
        header('Content-Type: ' . $mimeType);
        readfile($assetPath);
        exit;
    }
}

// Helper: data file helpers
function data_path($name) {
    return __DIR__ . '/data/' . $name;
}

function load_json($filename) {
    $path = data_path($filename);
    if (!file_exists($path)) {
        return [];
    }
    $content = file_get_contents($path);
    return json_decode($content, true) ?: [];
}

function save_json($filename, $data) {
    $path = data_path($filename);
    // Ensure data directory exists
    if (!is_dir(dirname($path))) {
        mkdir(dirname($path), 0755, true);
    }
    file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT));
}

// Handle routes
switch ($route) {
    case '/':
        echo $twig->render('landing.twig');
        break;
    
    case '/auth/login':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Handle login
            $email = $_POST['email'] ?? '';
            $password = $_POST['password'] ?? '';
            
            // Simple authentication check
            $users = load_json('users.json');
            $user = null;
            
            foreach ($users as $u) {
                if ($u['email'] === $email && $u['password'] === $password) {
                    $user = $u;
                    break;
                }
            }
            
            if ($user) {
                $_SESSION['user'] = $user;
                header('Location: /dashboard');
                exit;
            } else {
                $error = 'Invalid credentials';
                echo $twig->render('login.twig', ['error' => $error]);
            }
        } else {
            echo $twig->render('login.twig');
        }
        break;
    
    case '/auth/signup':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Handle signup
            $name = $_POST['name'] ?? '';
            $email = $_POST['email'] ?? '';
            $password = $_POST['password'] ?? '';
            
            $users = load_json('users.json');
            
            // Check if email exists
            foreach ($users as $u) {
                if ($u['email'] === $email) {
                    $error = 'Email already exists';
                    echo $twig->render('signup.twig', ['error' => $error]);
                    exit;
                }
            }
            
            // Create new user
            $newUser = [
                'id' => time(),
                'name' => $name,
                'email' => $email,
                'password' => $password
            ];
            
            $users[] = $newUser;
            save_json('users.json', $users);
            
            $_SESSION['user'] = $newUser;
            header('Location: /dashboard');
            exit;
        } else {
            echo $twig->render('signup.twig');
        }
        break;
    
    case '/dashboard':
        if (!isset($_SESSION['user'])) {
            header('Location: /auth/login');
            exit;
        }
        
    // Load tickets
    $tickets = load_json('tickets.json');
        
        // Calculate stats
        $stats = [
            'total' => count($tickets),
            'open' => count(array_filter($tickets, fn($t) => $t['status'] === 'open')),
            'in_progress' => count(array_filter($tickets, fn($t) => $t['status'] === 'in_progress')),
            'closed' => count(array_filter($tickets, fn($t) => $t['status'] === 'closed'))
        ];
        
        echo $twig->render('dashboard.twig', [
            'user' => $_SESSION['user'],
            'stats' => $stats
        ]);
        break;
    
    case '/tickets':
        if (!isset($_SESSION['user'])) {
            header('Location: /auth/login');
            exit;
        }
        
        // Handle ticket CRUD
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $action = $_POST['action'] ?? '';
            
            if ($action === 'create') {
                $tickets = load_json('tickets.json');
                
                $newTicket = [
                    'id' => time(),
                    'title' => $_POST['title'],
                    'description' => $_POST['description'],
                    'status' => $_POST['status'],
                    'priority' => $_POST['priority'],
                    'createdBy' => $_SESSION['user']['name'],
                    'createdAt' => date('Y-m-d H:i:s'),
                    'updatedAt' => date('Y-m-d H:i:s')
                ];
                
                $tickets[] = $newTicket;
                save_json('tickets.json', $tickets);
                
                header('Location: /tickets');
                exit;
            } elseif ($action === 'delete') {
                $tickets = load_json('tickets.json');
                $tickets = array_filter($tickets, fn($t) => $t['id'] != $_POST['id']);
                save_json('tickets.json', array_values($tickets));
                
                header('Location: /tickets');
                exit;
            }
        }
        
    $tickets = load_json('tickets.json');
        echo $twig->render('tickets.twig', [
            'user' => $_SESSION['user'],
            'tickets' => $tickets
        ]);
        break;
    
    case '/logout':
        session_destroy();
        header('Location: /');
        exit;
        break;
    
    default:
        http_response_code(404);
        echo $twig->render('404.twig');
        break;
}
