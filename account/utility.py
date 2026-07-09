import random
import requests
from .models import User
from django.conf import settings
from .models import OneTimePassword

def generateOtp():
    otp=""
    for i in range(6):
        otp+=str(random.randint(1,9))
    return otp    
def send_code_to_user(email):
    subject = "One time passcode for email verification"
    otp_code = generateOtp()
    user = User.objects.get(email=email)
    current_site = "Ease and Quick.com"
    email_body = f"Dear {user.name},\n\nThank you for signing up on {current_site} To verify your email, please use the OTP (One-Time Password) below:\n   🔑 Your OTP: {otp_code}\nPlease do not share it with anyone for security reasons.\nIf you did not request this OTP, please ignore this email.\n\nBest regards,\nEase and Quick Team"

    OneTimePassword.objects.create(user=user, code=otp_code)

    try:
        requests.post(
            "https://api.brevo.com/v3/smtp/email",
            headers={
                "api-key": settings.BREVO_API_KEY,
                "Content-Type": "application/json",
            },
            json={
                "sender": {"email": settings.EMAIL_HOST_USER, "name": "Ease and Quick"},
                "to": [{"email": user.email}],
                "subject": subject,
                "textContent": email_body,
            },
            timeout=10,
        )
    except requests.exceptions.RequestException:
        pass
