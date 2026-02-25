"""
Принимает заявки с сайта и отправляет уведомление в Telegram.
"""

import json
import os
import urllib.request
import urllib.parse


def send_telegram(message: str) -> bool:
    token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID", "")
    if not token or not chat_id:
        return False

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    data = json.dumps({"chat_id": chat_id, "text": message, "parse_mode": "HTML"}).encode()
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    try:
        urllib.request.urlopen(req, timeout=5)
        return True
    except Exception:
        return False


def handler(event: dict, context) -> dict:
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": cors_headers, "body": json.dumps({"error": "Method not allowed"})}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    message_text = body.get("message", "").strip()
    form_type = body.get("form_type", "lead")

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Имя и телефон обязательны"}),
        }

    if form_type == "callback":
        tg_text = (
            f"📞 <b>Запрос обратного звонка</b>\n\n"
            f"👤 Имя: {name}\n"
            f"📱 Телефон: {phone}"
        )
        if message_text:
            tg_text += f"\n💬 Сообщение: {message_text}"
    else:
        tg_text = (
            f"⚡ <b>Новая заявка с сайта ElectroRide</b>\n\n"
            f"👤 Имя: {name}\n"
            f"📱 Телефон: {phone}"
        )
        if message_text:
            tg_text += f"\n💬 Интерес: {message_text}"

    sent = send_telegram(tg_text)

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True, "notified": sent}),
    }
