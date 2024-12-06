"use client"; // Add this line at the top of your file

import { useState, useEffect } from 'react';
import Sidebar from "@/components/Sidebar";
import { FiHome, FiSettings, FiUser , FiBriefcase } from 'react-icons/fi';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function Profile() {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    about: '',
    address: '',
    profession: '', // Add profession field
    profilePic: '',
    isPublished: false,
  });
  const [file, setFile] = useState(null);
  const db = getDatabase();
  const storage = getStorage();

  const menuItems = [
    { label: 'Home', icon: <FiHome />, link: '/dashboard/home' },
    { label: 'Profile', icon: <FiUser  />, link: '/dashboard/profile' },
    { label: 'Bookings', icon: <FiBriefcase />, link: '/dashboard/bookings' },
    { label: 'Settings', icon: <FiSettings />, link: '/dashboard/settings' },
  ];

  useEffect(() => {
    const userRef = ref(db, 'users/userId'); // Replace 'userId' with the actual user ID
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUserData(data);
      }
    });
  }, [db]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTogglePublish = () => {
    setUserData((prevData) => ({ ...prevData, isPublished: !prevData.isPublished }));
  };

  const handleSaveChanges = async () => {
    if (file) {
      const storageReference = storageRef(storage, `profilePics/${file.name}`);
      await uploadBytes(storageReference, file);
      const downloadURL = await getDownloadURL(storageReference);
      userData.profilePic = downloadURL; // Update profilePic with the uploaded URL
    }

    // Save user data to Firebase
    const userRef = ref(db, 'users/userId'); // Replace 'userId' with the actual user ID
    await set(userRef, userData);
    alert('Profile updated successfully!');
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar menuItems={menuItems} />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="mt-4 text-lg text-gray-600">
          Manage your personal information and update your profile.
        </p>

        {/* Profile Information */}
        <div className="mt-8 bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-medium text-gray-800">Personal Information</h2>
          
          <div className="mt-4">
            {/* Profile Picture Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
              <input type="file" onChange={handleFileChange} className="mt-1 block w-full" />
              {userData.profilePic && <img src={userData.profilePic} alt="Profile" className="mt-2 w-24 h-24 rounded-full" />}
            </div>

            {/* Editable Fields */}
            {['fullName', 'email', 'phoneNumber', 'about', 'address', 'profession'].map((field) => (
              <div className="mb-4" key={field}>
                <label className="block text-sm font-medium text-gray-700">{field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</label>
                <input
                  type="text"
                  name={field}
                  value={userData[field]}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            ))}

            {/* Toggle for Profile Visibility */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Profile Visibility</label>
              <button
                onClick={handleTogglePublish}
                className={`mt-1 px-4 py-2 rounded-md ${userData.isPublished ? 'bg-green-600' : 'bg-red-600'} text-white`}
              >
                {userData.isPublished ? 'Unpublish Profile' : 'Publish Profile'}
              </button>
            </div>

            {/* Save Changes Button */}
            <div className="flex justify-end">
              <button onClick={handleSaveChanges} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Footer or additional sections */}
        <footer className="mt-8 text-center text-gray-500 text-sm">
          &copy; 2024 FixMate. All rights reserved.
        </footer>
      </div>
    </div>
  );
}