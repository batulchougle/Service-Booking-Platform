import random
from django.core.mail import EmailMessage
from .models import User
from django.conf import settings
from .models import OneTimePassword

def generateOtp():
    otp=""
    for i in range(6):
        otp+=str(random.randint(1,9))
    return otp    

def send_code_to_user(email):
    Subject="One time passcode for email verification"
    otp_code=generateOtp()
    user=User.objects.get(email=email)
    current_site="Ease and Quick.com"
    email_body=f"Dear {user.name},\n\nThank you for signing up on {current_site} To verify your email, please use the OTP (One-Time Password) below:\n   🔑 Your OTP: {otp_code}\nPlease do not share it with anyone for security reasons.\nIf you did not request this OTP, please ignore this email.\n\nBest regards,\nEase and Quick Team"
        
    from_email=settings.EMAIL_HOST_USER

    OneTimePassword.objects.create(user=user, code=otp_code)
    d_email=EmailMessage(subject=Subject, body=email_body, from_email=from_email, to=[user.email])
    d_email.send(fail_silently=True)








