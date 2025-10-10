from django.urls import path
from .views import AdminDashboardView, CustomerDashboardView

urlpatterns = [
    path('admin/', AdminDashboardView.as_view(), name='admin-dashboard'),
    path('customer/', CustomerDashboardView.as_view(), name='customer-dashboard'),
]
