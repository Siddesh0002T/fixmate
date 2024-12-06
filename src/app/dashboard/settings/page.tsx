// app/dashboard/settings/page.tsx
import Sidebar from '@/components/Sidebar';
import { FiHome, FiUser, FiSettings, FiBriefcase } from 'react-icons/fi';

const menuItems = [
  { label: 'Home', icon: <FiHome />, link: '/dashboard/home' },
  { label: 'Profile', icon: <FiUser />, link: '/dashboard/profile' },
  { label: 'Bookings', icon: <FiBriefcase />, link: '/dashboard/bookings' },
  { label: 'Settings', icon: <FiSettings />, link: '/dashboard/settings' },
];

const SettingsPage = () => {
  return (
    <div className="flex">
      <Sidebar menuItems={menuItems} />
      <div className="flex-1 ml-64 p-6">
      <br /><br /><br />
      
        <h1 className="text-2xl font-semibold">Settings</h1>
        {/* Your page content here */}
<br /><br />
     
      </div>
    </div>
  );
};

export default SettingsPage;
