import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { FiHome, FiSettings, FiUser, FiBriefcase } from 'react-icons/fi';

export default function JoinProfessional() {
  const menuItems = [
    { label: 'Home', icon: <FiHome />, link: '/dashboard/home' },
    { label: 'Profile', icon: <FiUser />, link: '/dashboard/profile' },
    { label: 'Tasks', icon: <FiBriefcase />, link: '/dashboard/tasks' },
    { label: 'Settings', icon: <FiSettings />, link: '/dashboard/settings' },
  ];

  return (
    <div className="">
  

<Sidebar menuItems={menuItems}/>
     <Footer/>
    </div>
  );
}

