<?php
// variable pour la connexion (ici pour le test)
$dbName = "db_test";
$dbHost = "localhost";
$dsn = "mysql:dbname=$dbName;host=$dbHost;charset=utf8";
$username = 'root';
$password = '';

const SQL_INSERT = "INSERT INTO message (title,content,dest,is_prioritaire) VALUES(:title,:content,:dest,:is_prioritaire);";
const SQL_GET_MESSAGES = "SELECT * FROM message;";

// Connexion à la base de données
try{
    $db = new PDO($dsn,$username,$password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
}catch (PDOException $e){
    echo $e->getMessage();
}

// Appel depuis POST : on enregistre un nouveau message
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $title = filter_input(INPUT_POST, 'title', FILTER_SANITIZE_SPECIAL_CHARS);
    $content = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS);
    $dest = filter_input(INPUT_POST, 'dest', FILTER_SANITIZE_SPECIAL_CHARS);
    $prio = filter_input(INPUT_POST, 'isPriority', FILTER_VALIDATE_BOOLEAN);

    $stmt = $db->prepare(SQL_INSERT);
    $stmt->execute([
        'title' => $title,
        'content' => $content,
        'dest' => $dest,
        'is_prioritaire' => $prio,
    ]);

// Appel depuis GET : On recupere les messages
}elseif ($_SERVER['REQUEST_METHOD'] === 'GET'){
    $stmt = $db->query(SQL_GET_MESSAGES);
    $messages = $stmt->fetchAll();
    echo json_encode($messages);
}