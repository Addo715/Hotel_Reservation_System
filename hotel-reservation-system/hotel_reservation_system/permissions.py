from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff and request.user.is_superuser

class IsReceptionist(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff and not request.user.is_superuser

class IsCustomer(permissions.BasePermission):
    def has_permission(self, request, view):
        return not request.user.is_staff

class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.is_staff or getattr(obj, 'guest', None) == request.user

class IsOwnerOrAdminOrReceptionist(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True
        return getattr(obj, 'guest', None) == request.user
