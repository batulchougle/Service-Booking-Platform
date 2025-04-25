

# Register your models here.
from django.contrib import admin
from .models import User, Services, Enquiry, Booking, Feedback


admin.site.register(User)
admin.site.register(Services)

@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display=('user','service','name','contact','created_at','message','attended')
    list_filter = ('attended',)
    search_fields = ('user__name','service__name')

    actions = ['mark_as_attended']

    def mark_as_attended(self, request, queryset):
        queryset.update(attended=True)
    mark_as_attended.short_description = "Mark selected enquiries as attended"

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('user', 'service', 'complaint_no', 'status','city','address','contact','service_date','reciept','service_amount','payment_method','worker_name')
    list_filter = ('status',('worker_name', admin.EmptyFieldListFilter))
    

    search_fields = ('user__username', 'service__name')
    fields = ('user', 'service', 'complaint_no','status','city','address','contact','service_date','reciept','service_amount','worker_name','worker_contact')

    actions = ['mark_as_completed','mark_as_paid',]

    def mark_as_completed(self, request, queryset):
        queryset.update(status='completed')
    mark_as_completed.short_description = "Mark selected booking as completed"

    def mark_as_paid(self, request, queryset):
       queryset.update(status='paid')
    mark_as_paid.short_description = "Mark selected booking as paid"




@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display=('service','feedback','user') 
    search_fields = ('user__username', 'service__name')
    def has_delete_permission(self, request, obj=None):
       return False  
    








    
    
    
    

    
   
   
   





