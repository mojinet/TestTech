<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
            integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous"></script>
    <script src="script.js" defer></script>
    <title>Messagerie</title>
</head>
<body>
    <div id="main-wrapper">
        <!-- Overlay -->
        <div id="overlay" class="hidden"></div>

        <!-- Message -->
        <div id="confirm-message" class="hidden message-pop">Votre Message est envoyée !</div>
        <div id="error-message" class="hidden message-pop">Vous n'avez pas remplis tout les champs !</div>

        <!-- Pop up -->
        <div id="message-wrapper" class="hidden">
            <h2>Ecrire un nouveau message</h2>
            <form action="" method="post">
                <input type="text" name="titre" id="titre" placeholder="Le titre..." required>
                <textarea type="text" name="message" id="message" placeholder="Le message..." required></textarea>
                <label for="destinataire">Destinataire</label>
                <select id="destinataire" required>
                    <option value="Jean">Jean</option>
                    <option value="Marc">Marc</option>
                    <option value="Bill">Bill</option>
                    <option value="Franck">Franck</option>
                    <option value="Michel">Michel</option>
                </select><br>
                <div class="checkbox-grp">
                    <input type="checkbox" name="prioritaire" id="prioritaire">
                    <label for="prioritaire">Message prioritaire</label>
                </div>
                <div class="btn-group">
                    <input type="submit" value="Envoyer" id="submit">
                    <input type="submit" value="Annuler" id="cancel">
                </div>
            </form>
        </div>

        <!-- Menu -->
        <div id="lateral-bar">
            <h1>Messagerie</h1>
            <hr><br>
            <a href="#" id="newMessage">✍️ Nouveau Message</a>
        </div>

        <!-- Main -->
        <main id="main">
            <h2>Listes des messages</h2>
            <ul id="messages"></ul>
        </main>
    </div>
</body>
</html>