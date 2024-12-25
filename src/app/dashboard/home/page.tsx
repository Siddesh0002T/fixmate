"use client";

import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/utils/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
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
    likes: 0,       // For like count
    views: 0,       // For profile views
    rating: 0,      // For rating
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
            likes: 0,
            views: 0,
            rating: 0,
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

  // Increment like count
  const handleLike = async () => {
    try {
      const newLikes = profile.likes + 1;
      setProfile((prevProfile) => ({ ...prevProfile, likes: newLikes }));
      await updateDoc(doc(db, "users", user.uid), { likes: newLikes });
    } catch (error) {
      console.error("Error updating like count: ", error);
    }
  };

  // Increment profile views
  const incrementViewCount = async () => {
    try {
      const newViews = profile.views + 1;
      setProfile((prevProfile) => ({ ...prevProfile, views: newViews }));
      await updateDoc(doc(db, "users", user.uid), { views: newViews });
    } catch (error) {
      console.error("Error updating view count: ", error);
    }
  };

  // Handle rating submission
  const handleRating = async (newRating: number) => {
    try {
      setProfile((prevProfile) => ({ ...prevProfile, rating: newRating }));
      await updateDoc(doc(db, "users", user.uid), { rating: newRating });
    } catch (error) {
      console.error("Error updating rating: ", error);
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
        
        <h1 className="text-2xl font-semibold">Profile</h1>

        {/* Profile Card with Like Count, Views, and Rating */}
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

            {/* Like and View Counts */}
            <div className="flex flex-col items-center space-y-6 mt-6">
  {/* Like and View Counts */}
  <div className="flex items-center justify-center space-x-8">
    {/* Likes Section */}
    <div className="text-center">
      <p className="text-xl font-semibold text-gray-800">{profile.likes}</p>
      <p className="text-sm text-gray-600">Likes</p>
  
    </div>

    {/* Views Section */}
    <div className="text-center">
      <p className="text-xl font-semibold text-gray-800">{profile.views}</p>
      <p className="text-sm text-gray-600">Views</p>
    </div>
  </div>

  {/* Rating Section */}
  <div className="text-center">
    <p className="text-xl font-semibold text-gray-800">Rating: {profile.rating}</p>
    <div className="flex justify-center space-x-2 mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`text-3xl ${
            profile.rating >= star ? "text-yellow-500 font-bold" : "text-gray-400"
          }`}
          onClick={() => handleRating(star)}
          disabled={user.uid === profile.uid} // Disable if viewing own profile
          style={{
            cursor: user.uid === profile.uid ? "not-allowed" : "pointer",
          }}
        >
          ★
        </button>
      ))}
    </div>
  </div>
</div>

            {/* Profile Form */}

            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">


  <div className="space-y-4">
    <div className="flex justify-between">
      <h3 className="text-sm font-semibold text-gray-700">Full Name</h3>
      <p className="text-gray-900">{profile.displayName || "John Doe"}</p>
    </div>

    <div className="flex justify-between">
      <h3 className="text-sm font-semibold text-gray-700">Email</h3>
      <p className="text-gray-900">{profile.email || "example@example.com"}</p>
    </div>

    <div className="flex justify-between">
      <h3 className="text-sm font-semibold text-gray-700">Age</h3>
      <p className="text-gray-900">{profile.age || "N/A"}</p>
    </div>

    <div className="flex justify-between">
      <h3 className="text-sm font-semibold text-gray-700">Phone</h3>
      <p className="text-gray-900">{profile.phone || "123-456-7890"}</p>
    </div>

    <div className="flex justify-between">
      <h3 className="text-sm font-semibold text-gray-700">Profession</h3>
      <p className="text-gray-900">{profile.profession || "N/A"}</p>
    </div>

    <div className="flex justify-between">
      <h3 className="text-sm font-semibold text-gray-700">Experience</h3>
      <p className="text-gray-900">{profile.experience || "N/A"}</p>
    </div>

    <div className="flex justify-between">
      <h3 className="text-sm font-semibold text-gray-700">Address</h3>
      <p className="text-gray-900">{profile.address || "N/A"}</p>
    </div>

    <div className="flex justify-between">
      <h3 className="text-sm font-semibold text-gray-700">About</h3>
      <p className="text-gray-900">{profile.about || "N/A"}</p>
    </div>
  </div>
</div>


          </div>
        </div>

        <br /><br />
      </div>
    </div>
  );
};

export default ProfilePage;
