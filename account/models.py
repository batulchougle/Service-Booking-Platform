from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from .manager import UserManager
from django.utils.timezone import now
import uuid
from rest_framework_simplejwt.tokens import RefreshToken



class User(AbstractBaseUser,PermissionsMixin):
    id = models.BigAutoField(primary_key=True, editable=False) 
    email=models.EmailField(max_length=255, unique=True, verbose_name=_("Email Address"))
    name=models.CharField(max_length=255, verbose_name=_("Name"))
    username=models.CharField(max_length=100,unique=True, verbose_name=_("Username"))
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_verified=models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    

    USERNAME_FIELD="email"

    REQUIRED_FIELDS=["name","username"]

    objects=UserManager()

    def __str__(self):
        return (self.email)
    @property
    def get_name(self):
        return (self.name)
    @property
    def get_username(self): 
        return (self.username)
    
    def tokens(self):
        refresh=RefreshToken.for_user(self)
        return {
            'refresh':str(refresh),
            'access':str(refresh.access_token)

        }
        

class OneTimePassword(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE)
    code=models.CharField(max_length=6, unique=True)

    def __str__(self):
        return f"{self.user.name}-passcode"
    
class Services(models.Model):
    id = models.BigAutoField(primary_key=True, editable=False) 
    name=models.CharField(max_length=255, verbose_name=_("Name"))
    icon=models.ImageField(upload_to='service_icons/',null=True,blank=True)
    def __str__(self):
        return (self.name)   

class Enquiry(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    service=models.ForeignKey(Services, on_delete=models.CASCADE)
    name=models.CharField(max_length=255, verbose_name=_("Name"))
    contact=models.IntegerField()
    message=models.TextField(verbose_name=_("Message"))
    created_at = models.DateTimeField(auto_now_add=True)
    attended=models.BooleanField(default=False)

    def __str__(self):
        return f"Enquiry by {self.user.name} for {self.service.name}"
    
class Booking(models.Model):
    STATUS_CHOICES=[
        ('pending','Pending'),
        ('confirmed','Confirmed'),
        ('cancelled','Cancelled'),
        ('completed','Completed'),
        ('refunded','Refunded'),
        ('paid','Paid'),
    ]    
    PAYMENT_CHOICES = [
        ('Cash', 'Cash Payment'),
        ('Online', 'Online Payment')
    ]

    id = models.BigAutoField(primary_key=True, editable=False)
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    service=models.ForeignKey(Services,on_delete=models.CASCADE)
    reciept=models.ImageField(upload_to='reciepts/',null=True,blank=True)
    service_date=models.DateTimeField(default=now,blank=True, null=True)
    complaint_no=models.CharField(max_length=20, unique=True, blank=True)
    payment_id=models.CharField(max_length=100,blank=True,null=True)
    ser_payment_id=models.CharField(max_length=100,blank=True,null=True)
    amount=models.DecimalField(max_digits=10,decimal_places=2,default=50.00)
    status=models.CharField(max_length=20, choices=STATUS_CHOICES,default='pending')
    payment_method = models.CharField(max_length=20, choices=PAYMENT_CHOICES, default='Cash')
    created_at=models.DateTimeField(default=now)
    contact=models.IntegerField(null=True,blank=True)
    address=models.CharField(max_length=200, null=True, blank=True)
    city=models.CharField(max_length=20, null=True, blank=True)
    service_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    worker_name=models.CharField(max_length=255, verbose_name=_("Name"),null=True, blank=True)
    worker_contact=models.IntegerField(null=True,blank=True)

    

    def save(self, *args, **kwargs):
        if not self.complaint_no:
            self.complaint_no="CMP-" + str(uuid.uuid4().hex[:10]).upper()
        super().save(*args, **kwargs)    
    
    def __str__(self):
        return f"{self.user.name} - {self.service.name} - {self.complaint_no}"
    

class Feedback(models.Model):
    service=models.ForeignKey(Services,on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    feedback=models.CharField(max_length=1000)
    def __str__(self):
        return (self.feedback)                     
    





