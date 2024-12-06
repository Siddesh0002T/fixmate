import Sidebar from "@/components/Sidebar";
import { FiHome, FiSettings, FiUser, FiBriefcase } from 'react-icons/fi';
import Footer from "@/components/Footer";

export default function Home() {
  const menuItems = [
    { label: 'Home', icon: <FiHome />, link: '/dashboard/home' },
    { label: 'Profile', icon: <FiUser />, link: '/dashboard/profile' },
    { label: 'Bookings', icon: <FiBriefcase />, link: '/dashboard/bookings' },
    { label: 'Settings', icon: <FiSettings />, link: '/dashboard/settings' },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar menuItems={menuItems} />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <br /><br /><br />
        <h1 className="text-2xl font-semibold">Dashboard Home</h1>
        <p className="mt-4 text-lg text-gray-600">
          Welcome to your dashboard! Here you can manage your profile, bookings, and settings.
        </p>

        {/* Your additional content */}
        <div className="mt-8">
          <h2 className="text-xl font-medium text-gray-800">Overview</h2>
          <div className="mt-4 bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold">Key Metrics</h3>
            <p className="mt-2 text-sm text-gray-500">This section can include various stats like user activity, bookings, etc.</p>
            {/* Example content */}
            <div className="mt-4 flex space-x-4">
              <div className="bg-blue-100 p-4 rounded-md">
                <p className="text-lg font-medium">Bookings</p>
                <p className="text-2xl font-bold text-blue-600">45</p>
              </div>
              <div className="bg-green-100 p-4 rounded-md">
                <p className="text-lg font-medium">Profile Updates</p>
                <p className="text-2xl font-bold text-green-600">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer or extra sections */}
        <br />
        <hr />
      <Footer/>
      </div>
    </div>
  );
}
