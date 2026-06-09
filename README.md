A full-stack service booking and complaint management system built with Django REST Framework (backend) and React.js (frontend). The platform enables individuals, housing societies, hospitals, institutions, malls, and commercial complexes to easily book services, make payments, and track complaints.

# FEATURES:
 User Authentication – JWT-based authentication for customer login & signup.
 Service Booking – Customers can book services with date & time selection.
Payments –
₹50 booking charge on confirmation.
Option for Online Payment (via Razorpay) or Cash on Delivery (COD) after service completion.
Service provider (via Django Admin) sets the final amount → customer makes payment → receipt issued manually.
Complaint Management – Complaint number generation & real-time status updates (managed by service provider through Django Admin).
Feedback System – Customers can submit feedback and ratings after service completion.
Dashboard – Customers can track their bookings, complaints, and payments.
 Admin Management — Service providers use Django’s built-in admin (superuser) to manage bookings, complaints, and payments  

# USAGE FLOW:

1. Customer registers & logs in.
2. Customer selects date and time and books a service (₹50 booking charge) and complaint number is generated.
3. Service provider (via Django Admin) updates booking status also enters the final amount.
4. On service completion → service provider marks the booking as completed.
5. Customer chooses Online Payment (Razorpay) or Cash on Delivery (COD).
6. Service provider issues receipt manually after payment.
7. Customer submits feedback.

# TECH STACK:

Backend: Python, Django, Django REST Framework
Database: SQLite (default) 
Authentication: JWT (JSON Web Tokens)
Payment Gateway: Razorpay API integration
Frontend: React.js, Axios (for API calls)
Version Control: Git, GitHub 

# INSTALLATION & SETUP:

**Backend Setup (Django + DRF**):

#Clone repo
git clone https://github.com/batulchougle/Service-Booking-Platform.git
cd Service-Booking-Platform

#Create Virtual Environment
python -m venv venv
source venv/bin/activate        # Linux / macOS
venv\Scripts\activate           # Windows

#Install Dependencies
pip install -r requirements.txt

#Apply Migrations
python manage.py migrate

#Create superuser (for service provider / admin access)
python manage.py createsuperuser

#Start backend server
python manage.py runserver

**Frontend (React)**
cd frontend

#Install dependencies
npm install

#Start development server
npm start




