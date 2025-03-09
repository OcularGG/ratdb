// In your route definitions
<Route
  path="/admin/*"
  element={
    <ProtectedRoute requiredPermission="view_admin_dashboard">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>