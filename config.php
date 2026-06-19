<?php
// Конфигурация бота
define('BOT_TOKEN', 'YOUR_BOT_TOKEN_HERE'); // Токен от @BotFather
define('WEB_APP_URL', 'https://your-domain.com/index.html'); // URL вашего мини-приложения

// Функция для отправки запросов к Telegram API
function sendTelegramRequest($method, $data = []) {
    $url = "https://api.telegram.org/bot" . BOT_TOKEN . "/" . $method;
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
    $result = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($result, true);
}
?>
