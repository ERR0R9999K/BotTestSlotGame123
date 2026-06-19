<?php
require_once 'config.php';

// Получаем входящие данные от Telegram
$content = file_get_contents("php://input");
$update = json_decode($content, true);

// Проверяем, есть ли сообщение
if (isset($update['message'])) {
    $message = $update['message'];
    $chat_id = $message['chat']['id'];
    $user_id = $message['from']['id'];
    $username = $message['from']['username'] ?? 'Пользователь';
    $first_name = $message['from']['first_name'] ?? '';
    $text = $message['text'] ?? '';
    
    // Обработка команды /start
    if ($text == '/start') {
        // Приветственное сообщение
        $welcome_text = "👋 Привет, $first_name!\n" .
                       "Ваш ID: $user_id\n\n" .
                       "Нажми на кнопку ниже, чтобы открыть мини-приложение!";
        
        // Создаем кнопку для открытия мини-приложения
        $keyboard = [
            'inline_keyboard' => [
                [
                    [
                        'text' => '🎮 Открыть мини-приложение',
                        'web_app' => ['url' => WEB_APP_URL]
                    ]
                ]
            ]
        ];
        
        $data = [
            'chat_id' => $chat_id,
            'text' => $welcome_text,
            'reply_markup' => json_encode($keyboard),
            'parse_mode' => 'HTML'
        ];
        
        // Отправляем сообщение
        sendTelegramRequest('sendMessage', $data);
    }
    
    // Обработка данных из мини-приложения (если пользователь отправил)
    if (isset($message['web_app_data'])) {
        $web_app_data = $message['web_app_data']['data'];
        $data = json_decode($web_app_data, true);
        
        if ($data) {
            $response_text = "✅ Получены данные из мини-приложения!\n" .
                            "👤 Имя: " . $data['name'] . "\n" .
                            "🆔 ID: " . $data['user_id'] . "\n" .
                            "📸 Фото: " . $data['photo'];
            
            sendTelegramRequest('sendMessage', [
                'chat_id' => $chat_id,
                'text' => $response_text
            ]);
        }
    }
}

// Если это callback от кнопки (если нужно)
if (isset($update['callback_query'])) {
    $callback = $update['callback_query'];
    $chat_id = $callback['message']['chat']['id'];
    $callback_data = $callback['data'];
    
    // Отвечаем на callback
    sendTelegramRequest('answerCallbackQuery', [
        'callback_query_id' => $callback['id'],
        'text' => 'Обработка...'
    ]);
}

// Логируем для отладки
file_put_contents('log.txt', date('Y-m-d H:i:s') . " - " . $content . "\n", FILE_APPEND);
?>
