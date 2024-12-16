"use client";

import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { FiHome, FiUser, FiSettings, FiBriefcase } from 'react-icons/fi';

const menuItems = [
  { label: 'Home', icon: <FiHome />, link: '/dashboard/home' },
  { label: 'Profile', icon: <FiUser />, link: '/dashboard/profile' },
  { label: 'Bookings', icon: <FiBriefcase />, link: '/dashboard/bookings' },
  { label: 'Settings', icon: <FiSettings />, link: '/dashboard/settings' },
];

const ProfilePage = () => {
  const [user, loading] = useAuthState(auth);
  const [profile, setProfile] = useState<any>({
    displayName: "",
    email: "",
    photoURL: "",
    age: "",
    phone: "",
    profession: "",
    experience: "",
    address: "",
    about: "",
  });
  const [completion, setCompletion] = useState(0);
  const router = useRouter();

  // Fetch user data from Firestore
  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile({ ...profile, ...docSnap.data() });
        } else {
          // If no profile, use Google account details as defaults
          setProfile({
            displayName: user.displayName || "",
            email: user.email || "",
            photoURL: user.photoURL || "",
            age: "",
            phone: "",
            profession: "",
            experience: "",
            address: "",
            about: "",
          });
        }
      };
      fetchProfile();
    }
  }, [user]);

  // Calculate profile completion percentage
  useEffect(() => {
    const filledFields = Object.values(profile).filter((field) => field !== "").length;
    const totalFields = Object.keys(profile).length;
    setCompletion(Math.round((filledFields / totalFields) * 100));
  }, [profile]);

  // Handle form submission
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "users", user.uid), profile);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Failed to save changes.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex">
      <Sidebar menuItems={menuItems} />
      <div className="flex-1 ml-64 p-6 bg-gray-100">
      <br /><br /><br />
      
        <h1 className="text-2xl font-semibold">Profile </h1>
        {/* Your page content here */}
        <div className="min-h-screen flex flex-col items-center bg-gray-100 py-12 px-6">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6 space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center space-x-4">
          <img
            src={profile.photoURL || "/default-avatar.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <p className="text-gray-800 font-bold">{profile.displayName}</p>
            <button
              className="text-sm text-blue-500 hover:underline"
              onClick={() => alert("Change your profile picture via Google account.")}
            >
              Change Profile Picture
            </button>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${completion}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">Profile Completion: {completion}%</p>

        {/* Profile Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              value={profile.displayName}
              onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={profile.email}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Age</label>
            <input
              type="number"
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Phone</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Profession</label>
            <input
              type="text"
              value={profile.profession}
              onChange={(e) => setProfile({ ...profile, profession: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Experience</label>
            <input
              type="text"
              value={profile.experience}
              onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Address</label>
            <input
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">About</label>
            <textarea
              value={profile.about}
              onChange={(e) => setProfile({ ...profile, about: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
<br /><br />
     
      </div>
    </div>
  );
};

export default ProfilePage;
