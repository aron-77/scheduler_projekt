<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="login.css">
    <title>MyScheduler</title>
</head>
<body>
    <div class="wrapper">
        <h1>Bejelentkezés</h1>
        <form id="form" action="login.php" method="POST">            
            <div class="input-box">
                <label for="email">E-mail:</label>
                <input type="email" name="email" id="email-input" required="" />
            </div>
            <div class="input-box">
                <label for="password">Jelszó:</label>
                <input type="password" name="password" id="password-input" required="" />
            </div>
            <div class="remember-forget">
                <label ><input type="checkbox">Jelszó megjegyzése</label> 
                <a href="#">Elfelejtette jelszavát?</a>
            </div>
            <input name="login" id="loginButton" type="submit" class="button" value="Belépés" />
            <div class="register-link">
                <p>Nincs még fiókod? <a href="register.html">Regizstrálj!</a> </p>
            </div>
        </form>
    </div>
    <script src="validacio.js"></script>
</body>
</html>