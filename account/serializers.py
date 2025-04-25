
from rest_framework import serializers
from .models import User, Services, Enquiry, Booking, Feedback
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken, TokenError


class UserRegisterSerializer(serializers.ModelSerializer):
    password= serializers.CharField(max_length=68, min_length=6, write_only= True)
    password2=serializers.CharField(max_length=68, min_length=6, write_only= True)

    class Meta:
        model=User
        fields=['email','name','username','password','password2']

    def validate(self, attrs):
        password=attrs.get('password','')
        password2=attrs.get('password2','')
        username = attrs.get('username')
        email=attrs.get('email')

        errors={}

        if password != password2:
            errors["password"]="Passwords did not match"
            
        if User.objects.filter(username=username).exists():
            errors["username"]= "This username is already taken."
            
        if User.objects.filter(email=email).exists():
            errors["email"]="You already have an account.Try to login using your email id and password"
        if errors:
            raise serializers.ValidationError(errors)    
        return attrs
        
    def create(self, validated_data):
        user=User.objects.create_user(
        email=validated_data['email'],
        name=validated_data.get('name'),
        username=validated_data.get('username'),
        password=validated_data.get('password')

        )
        return user
    
class LoginSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    password=serializers.CharField(max_length=68,write_only=True)
    email=serializers.EmailField(max_length=255)
    name=serializers.CharField(max_length=255,read_only=True)
    username=serializers.CharField(max_length=255,read_only=True)
    access_token=serializers.CharField(max_length=255,read_only=True)
    refresh_token=serializers.CharField(max_length=255,read_only=True)

    class Meta:
        model=User
        fields=['password','email','name','username','access_token','refresh_token','id']


    def validate(self,attrs):
         email=attrs.get('email') 
         password=attrs.get('password')
         request=self.context.get('request')
         errors={}
         user=authenticate(request,email=email,password=password)
         if not user:
             errors["email"]="Invalid credentials try again"
         if not user.is_verified:
            errors["email"]="Email address not verified"
         if errors:
            raise serializers.ValidationError(errors)    
         user_tokens=user.tokens()

         return {
             'id': user.id,
             'email':user.email,
             'name': user.get_name,
             'username': user.get_username,
              'access_token':str(user_tokens.get('access')),
              'refresh_token':str(user_tokens.get('refresh')),
            
         }
    
class LogoutUserSerializer(serializers.Serializer):
    refresh_token=serializers.CharField()

    default_error_messages={
        'bad_token':('token is invalid or has expired')
    }

    def validate(self,attrs):
        self.token=attrs.get('refresh_token')
        return attrs
    
    def save(self,**kwargs):
        try:
          token=RefreshToken(self.token)
          token.blacklist()
          
        except TokenError:
            return self.fail('bad_token') 
        
class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = ['id','name','icon']    

class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model= Enquiry
        fields='__all__'

class BookingSerializer(serializers.ModelSerializer):
    service_date=serializers.SerializerMethodField()
    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ('complaint_no','payment_id','reciept') 
    def get_service_date(self, obj):
        return obj.service_date.strftime('%Y-%m-%d %H:%M')          

class UserBookingSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(source='service.name', read_only=True)
    service_date=serializers.SerializerMethodField()
    class Meta:
        model=Booking
        fields= ['service_name', 'status', 'created_at', 'complaint_no','service_date','reciept','service','id','worker_name','worker_contact','payment_method','service_amount'] 
        extra_kwargs = {'created_at': {'write_only': True}} 

    def get_service_date(self, obj):
        return obj.service_date.strftime('%Y-%m-%d %H:%M')      


class FeedbackSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True) 
    class Meta:
        model=Feedback
        fields = '__all__'
        read_only_fields = ['user']








         