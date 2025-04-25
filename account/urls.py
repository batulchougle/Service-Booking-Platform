from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from .views import RegisterUserView, VerifyUserEmail,LoginUserView,LogoutUserView,ServicesListView,EnquiryView,BookingViewSet,UserBookingView, AcceptFeedbackView,DisplayFeedbackView,ServicePaymentView,SelectPaymentMethod
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'enquiries', EnquiryView)

urlpatterns = [
    
    path('signup/', RegisterUserView.as_view(), name='signup'),
    path('verify-email/',VerifyUserEmail.as_view(),name='verify'),
    path('login/',LoginUserView.as_view(), name='login'),
    path('logout/',LogoutUserView.as_view(),name='logout'),
    path('token/refresh/',TokenRefreshView.as_view(), name='refresh-token'),
    path('services/', ServicesListView.as_view(), name='service-list'),
    path('enquire-now/',include(router.urls)),
    path('book-service/',BookingViewSet.as_view({'post':'create'}),name='book-service'),
    path('payments/create-order/',BookingViewSet.as_view({'post':'create_payment_order'}),name='create-payment-order'),
    path('payments/verify-payment/',BookingViewSet.as_view({'post':'verify_payment'}),name='verify-payment'),
    path('user/bookings/', UserBookingView.as_view(), name='user-bookings'),  
    path('accept/feedback/', AcceptFeedbackView.as_view({'post':'create'}), name='accept-feedback'),
    path('display/feedbacks/', DisplayFeedbackView.as_view(), name='display-feedback'), 
    path('service/payment/',ServicePaymentView.as_view({'post':'create_payment'}),name='create-payment'),
    path('verify/payment/',ServicePaymentView.as_view({'post':'verify_payment'}),name='verify-service-payment'),
    path('select/payment/method/',SelectPaymentMethod.as_view({'post':'select_method'}),name='select-method'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)