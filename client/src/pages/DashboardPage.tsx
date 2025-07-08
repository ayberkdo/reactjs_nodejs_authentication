import { useAuthStore } from "../store/authStore";
import { Button } from "../components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/Card";
import { User, LogOut, Shield } from "lucide-react";

export const DashboardPage = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary-600" />
              <h1 className="ml-3 text-xl font-semibold text-gray-900">
                Auth Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user?.name}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Profile Information
              </CardTitle>
              <User className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-lg font-semibold">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-lg font-semibold">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Role</p>
                  <p className="text-lg font-semibold capitalize">
                    {user?.role}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Member Since
                  </p>
                  <p className="text-lg font-semibold">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                Edit Profile
              </Button>
              <Button className="w-full" variant="outline">
                Change Password
              </Button>
              <Button className="w-full" variant="outline">
                Account Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">API Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Authentication</span>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Session</span>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">Valid</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
