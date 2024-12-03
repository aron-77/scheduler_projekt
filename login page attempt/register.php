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
    <header>
        <div class="wrapper">
            <h1>Regisztráció</h1>
            <p id="error-message"></p>
            <form id="form">
                
                <div class="input-box">
                    <input type="text" name="nev" id="name-input" placeholder="Név">
                </div>
                <div class="input-box">
                    <input type="email" name="email" id="email-input" placeholder="Email">
                </div>
                <div class="input-box">
                    <input type="password" name="password" id="password-input" placeholder="Jelszó">
                </div>
                <div class="input-box">
                    <input type="password" name="re_password" id="re-password-input" placeholder="Jelszó megismétlése">
                </div>
                
                <div class="login-link">
                    <p>Van már fiókod? <a href="login.html">Jelentkezz be!</a></p>
                </div>
                <button type="submit" class="button">Regisztráció</button>
            </form>
        </div>
    </header>
    <script src="validacio.js"></script>
</body>
</html>