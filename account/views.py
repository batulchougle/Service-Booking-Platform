
from rest_framework.generics import GenericAPIView
from .serializers import UserRegisterSerializer, LoginSerializer,LogoutUserSerializer, ServicesSerializer, EnquirySerializer, BookingSerializer, UserBookingSerializer, FeedbackSerializer
from rest_framework.response import Response
from rest_framework import status, generics, viewsets, permissions
from .utility import send_code_to_user
from .models import OneTimePassword,User, Services, Enquiry, Booking, Feedback
from rest_framework.permissions import IsAuthenticated
import json
from django.shortcuts import  get_object_or_404
import razorpay
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt


class RegisterUserView(GenericAPIView):
    serializer_class=UserRegisterSerializer

    def post(self,request):
        user_data=request.data
        serializer=self.serializer_class(data=user_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user=serializer.data
            send_code_to_user(user['email'])
            return Response({'data':user, 'message':f"hi {user['name']} thanks for sigining up a passcode has been sent to verify your email"},status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class VerifyUserEmail(GenericAPIView):
    def post(self,request):
        otpcode=request.data.get('otp')
        try:
            user_code_obj=OneTimePassword.objects.get(code=otpcode)
            user = user_code_obj.user
            if not user.is_verified:
                user.is_verified=True
                user.save()
                return Response({'message':'account email verified successfully'},status=status.HTTP_200_OK)
            return Response({'message':'code is invalid, user already verified'}, status=status.HTTP_204_NO_CONTENT)
          
        except OneTimePassword.DoesNotExist:
            return Response({'message':'invalid otp'},status=status.HTTP_404_NOT_FOUND)
        

class LoginUserView(GenericAPIView):
    serializer_class=LoginSerializer
    def post(self,request): 
        serializer=self.serializer_class(data=request.data, context={'request':request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class LogoutUserView(GenericAPIView):
        serializer_class=LogoutUserSerializer    
        permission_classes=[IsAuthenticated]
        def post(self,request) :
            serializer=self.serializer_class(data=request.data)  
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        

class ServicesListView (generics.ListCreateAPIView):
        queryset = Services.objects.all()
        serializer_class = ServicesSerializer

class EnquiryView(viewsets.ModelViewSet):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer
    permission_classes = [permissions.IsAuthenticated]
    def perform_create(self, serializer):
        serializer.save(user=self.request.user) 

client=razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)) 

class BookingViewSet(viewsets.ModelViewSet):
    queryset=Booking.objects.all()
    serializer_class=BookingSerializer
    permission_classes=[IsAuthenticated]

    def create_payment_order(self,request):
        user=request.user
        service_id=request.data.get('service')
        service_date=request.data.get('service_date')
        contact=request.data.get('contact')
        address=request.data.get('address')
        city=request.data.get('city')
        booking=Booking.objects.create(user=user,service_id=service_id,status='pending',service_date=service_date,contact=contact,address=address,city=city)
        order_amount=int(booking.amount*100)
        order_currency="INR"
        
        razorpay_order=client.order.create(
            {"amount":order_amount, "currency":order_currency,"payment_capture":"1"}
        )
        
        booking.payment_id=razorpay_order['id']
        booking.save()

        
        return Response({
        "order_id": razorpay_order['id'],
        "amount": order_amount,  
        "currency": order_currency,
        "complaint_number": booking.complaint_no,
        "booking_id":booking.id
         }, status=status.HTTP_201_CREATED)
    
    @csrf_exempt
    def verify_payment(self,request):
        if request.method == "POST":
            try:
               data = json.loads(request.body)
            except json.JSONDecodeError as e:
                return Response({"message": "Invalid JSON", "error": str(e)}, status=400)

            payment_id = data.get("razorpay_payment_id")
            order_id = data.get("razorpay_order_id")
            signature = data.get("razorpay_signature")
            
        params_dict = {
                "razorpay_payment_id": payment_id,
                "razorpay_order_id": order_id,
                "razorpay_signature": signature
            }

        try:
            client.utility.verify_payment_signature(params_dict)
            booking = Booking.objects.get(payment_id=order_id)
            payment_details = client.payment.fetch(payment_id)
            paid_amount = int(payment_details["amount"]) / 100
            if paid_amount == 50.00:  
                    booking.payment_status = True
                    booking.status = "confirmed"
                    booking.save()

                    return Response({"message": "Payment Successful!"}, status=200)
            else:
                    return Response({"message": "Incorrect Payment Amount!"}, status=400)
        except Exception as e:
              return Response({"message": "Payment Verification Failed!","message": str(e)}, status=400)
        
class SelectPaymentMethod(viewsets.ModelViewSet):
    queryset=Booking.objects.all()
    serializer_class=BookingSerializer
    permission_classes=[IsAuthenticated]
    def select_method(self,request):
         booking_id=self.request.data.get('booking_id')
         booking = get_object_or_404(Booking, id=booking_id)
         payment_method = request.data.get('payment_method')
         if payment_method not in ['Cash', 'Online']:
             return Response({"error": "Invalid payment method"}, status=400)
         booking.payment_method = payment_method
         booking.save()
         return Response(status=status.HTTP_200_OK)
                

class ServicePaymentView(viewsets.ModelViewSet):
    queryset=Booking.objects.all()
    serializer_class=BookingSerializer
    permission_classes=[IsAuthenticated]

    def create_payment(self,request):
         booking_id=self.request.data.get('booking_id')
         
         booking = get_object_or_404(Booking, id=booking_id)
         payment_method = booking.payment_method 

         if payment_method=='Online':
            order_amount=int(booking.service_amount*100)
            
            order_currency="INR"
                    
            razorpay_order=client.order.create(
                {"amount":order_amount, "currency":order_currency,"payment_capture":"1"}
            )
                    
            booking.ser_payment_id=razorpay_order['id']
            booking.save()
                    
            return Response({
            "order_id": razorpay_order['id'],
            "amount": order_amount,  
            "currency": order_currency,
            }, status=status.HTTP_201_CREATED)   
         
         else:
             return Response(status=status.HTTP_200_OK)
         
    @csrf_exempt
    def verify_payment(self,request):

        if request.method == "POST":
            try:
               data = json.loads(request.body)
               print("Received Payment Verification Request")  # Debugging
               print("Received Data:", data)  # Print incoming data

            except json.JSONDecodeError as e:
                print("error")
                return Response({"message": "Invalid JSON", "error": str(e)}, status=400)
            payment_id = data.get("razorpay_payment_id")
            order_id = data.get("razorpay_order_id")
            signature = data.get("razorpay_signature")
            
        params_dict = {
                "razorpay_payment_id": payment_id,
                "razorpay_order_id": order_id,
                "razorpay_signature": signature
            }
        try:
            client.utility.verify_payment_signature(params_dict)
            booking = Booking.objects.get(ser_payment_id=order_id)
            print(booking.ser_payment_id)
            payment_details = client.payment.fetch(payment_id)
            paid_amount = int(payment_details["amount"]) / 100
            if paid_amount == booking.service_amount:  
                    booking.payment_status = True
                    booking.status = "paid"
                    booking.save()
                    print(booking.status)
                    return Response({"message": "Payment Successful!"}, status=200)
            else:
                    return Response({"message": "Incorrect Payment Amount!"}, status=400)
        except Exception as e:
              return Response({"message": "Payment Verification Failed!","message": str(e)}, status=400)
        
class UserBookingView(generics.ListAPIView):
    serializer_class = UserBookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user=self.request.user
        return Booking.objects.filter(user=user).order_by('-created_at')    
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    

class AcceptFeedbackView(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]
    def perform_create(self, serializer):
        service_id = self.request.data.get("service") 
        service_instance = Services.objects.get(id=service_id)
        serializer.save(service=service_instance, user=self.request.user)
        return Response(status=status.HTTP_200_OK)

class DisplayFeedbackView(generics.ListAPIView):
    serializer_class = FeedbackSerializer
    def get_queryset(self):
       service_id = self.request.query_params.get("service")
       if not service_id:
            return Feedback.objects.none()
       service = Services.objects.get(id=service_id)
       return Feedback.objects.filter(service=service)
    def list(self, request, *args, **kwargs):
       queryset = self.get_queryset()
       serializer = self.get_serializer(queryset, many=True)
       return Response(serializer.data)
    














