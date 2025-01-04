import Sidebar from '@/components/Sidebar';
import { FiHome, FiUser, FiSettings, FiBriefcase } from 'react-icons/fi';

const menuItems = [
  { label: 'Home', icon: <FiHome />, link: '/dashboard/home' },
  { label: 'Profile', icon: <FiUser />, link: '/dashboard/profile' },
  { label: 'Bookings', icon: <FiBriefcase />, link: '/dashboard/bookings' },
  { label: 'Settings', icon: <FiSettings />, link: '/dashboard/settings' },
];

const SettingsPage = () => {
  // Assuming you have a userId and current status in your app (from the user profile or session)
  const userId = "userIdHere"; // Replace with the actual user ID
  const currentStatus = 1; // Replace with the actual status (1 for online, 0 for offline)

  return (
    <div className="flex">
      <Sidebar menuItems={menuItems} />
      <div className="flex-1 ml-64 p-6">
        <br /><br /><br />
        <h1 className="text-2xl font-semibold">Settings</h1>
        <br /><br />
        
        {/* Status Toggle Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">User Status</h2>
         
        </div>
        
        {/* Your other settings content here */}
      </div>
    </div>
  );
};

export default SettingsPage;
