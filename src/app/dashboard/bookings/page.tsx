import Sidebar from "@/components/Sidebar";
import { FiHome, FiSettings, FiUser, FiBriefcase } from 'react-icons/fi';

export default function Bookings() {
  const menuItems = [
    { label: 'Home', icon: <FiHome />, link: '/dashboard/home' },
    { label: 'Profile', icon: <FiUser />, link: '/dashboard/profile' },
    { label: 'Bookings', icon: <FiBriefcase />, link: '/dashboard/bookings' },
    { label: 'Settings', icon: <FiSettings />, link: '/dashboard/settings' },
  ];

  return (
    <div className="">
  

<Sidebar menuItems={menuItems}/>
<div className="flex-1 ml-64 p-6">
  <br /><br /><br />
        <h1 className="text-2xl font-semibold">Bookings</h1>
        {/* Your page content here */}
<br /><br />
      
      </div>
    </div>
  );
}

