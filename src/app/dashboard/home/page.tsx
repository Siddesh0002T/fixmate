"use client";
import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/utils/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { FiHome, FiUser, FiSettings, FiBriefcase } from 'react-icons/fi';
import { FiThumbsUp } from 'react-icons/fi';
import { FaRegCalendarAlt } from 'react-icons/fa';

const menuItems = [
  { label: 'Home', icon: <FiHome />, link: '/dashboard/home' },
  { label: 'Profile', icon: <FiUser />, link: '/dashboard/profile' },
  { label: 'Bookings', icon: <FiBriefcase />, link: '/dashboard/bookings' },
  { label: 'Settings', icon: <FiSettings />, link: '/dashboard/settings' },
];

interface Profile {
  displayName: string;
  email: string;
  photoURL: string;
  age: string;
  phone: string;
  profession: string;
  experience: string;
  address: string;
  about: string;
  likes: number;
  views: number;
  rating: number;
  isLiked: boolean;
}

const ProfilePage = () => {
  const [user, loading] = useAuthState(auth);
  const [profile, setProfile] = useState<Profile>({
    displayName: "",
    email: "",
    photoURL: "",
    age: "",
    phone: "",
    profession: "",
    experience: "",
    address: "",
    about: "",
    likes: 0,
    views: 0,
    rating: 0,
    isLiked: false,
  });
  
  const [completion, setCompletion] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile((prevProfile) => ({
            ...prevProfile,
            ...docSnap.data(),
          }));
        } else {
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
            isLiked: false,
          });
        }
      };
      fetchProfile();
    }
  }, [user]);

  useEffect(() => {
    const filledFields = Object.values(profile).filter((field) => field !== "").length;
    const totalFields = Object.keys(profile).length;
    setCompletion(Math.round((filledFields / totalFields) * 100));
  }, [profile]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (user) {
        await setDoc(doc(db, "users", user.uid), profile);
        alert("Profile updated successfully!");
      } else {
        alert("User is not logged in.");
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Failed to save changes.");
    }
  };

  const handleLike = async () => {
    try {
      if (user) {
        const newLikes = profile.isLiked ? profile.likes - 1 : profile.likes + 1;
        setProfile((prevProfile: Profile) => ({
          ...prevProfile,
          likes: newLikes,
          isLiked: !prevProfile.isLiked,
        }));
        await updateDoc(doc(db, "users", user.uid), { likes: newLikes });
      } else {
        console.error("User is not logged in.");
      }
    } catch (error) {
      console.error("Error updating like count: ", error);
    }
  };
  
  const incrementViewCount = async () => {
    try {
      if (user) {
        const newViews = profile.views + 1;
        setProfile((prevProfile: Profile) => ({ ...prevProfile, views: newViews }));
        await updateDoc(doc(db, "users", user.uid), { views: newViews });
      } else {
        console.error("User is not logged in.");
      }
    } catch (error) {
      console.error("Error updating view count: ", error);
    }
  };
  
  const handleRating = async (newRating: number) => {
    try {
      if (user) {
        setProfile((prevProfile: Profile) => ({ ...prevProfile, rating: newRating }));
        await updateDoc(doc(db, "users", user.uid), { rating: newRating });
      } else {
        console.error("User is not logged in.");
      }
    } catch (error) {
      console.error("Error updating rating: ", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) {
    router.push("/login");
    return null;
  }

  const isDisabled = completion < 100;

  return (
    <div className="flex">
      <Sidebar menuItems={menuItems} />
      <div className="flex-1 ml-64 p-6 bg-gray-100">
        <br /><br /><br />
        
        <h1 className="text-2xl font-semibold">Profile</h1>

        <div className="min-h-screen flex flex-col items-center bg-gray-100 py-12 px-6">
          <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex items-center p-6 bg-gradient-to-r from-blue-500 to-purple-600">
              <img
                src={profile.photoURL || "/default-avatar.png"}
                alt={profile.displayName}
                className="w-20 h-20 rounded-full border-4 border-white shadow-md"
              />
              <div className="ml-6 text-white">
                <h2 className="text-2xl font-semibold">{profile.displayName}</h2>
                <p className="text-lg">{profile.profession}</p>
              </div>
            </div>

            <div className="px-6 py-4">
              <p className="text-sm text-gray-700"><strong>About:</strong> {profile.about}</p>
              <p className="text-sm text-gray-700"><strong>Address:</strong> {profile.address}</p>
              <p className="text-sm text-gray-700"><strong>Email:</strong> {profile.email}</p>
              <p className="text-sm text-gray-700"><strong>Phone:</strong> {profile.phone}</p>
            </div>

            <div className="flex justify-between px-6 py-4 bg-gray-50 text-sm text-gray-700">
              <div className="flex items-center space-x-1">
                <span className="font-medium">Rating:</span>
                <span>{profile.rating ? profile.rating.toFixed(1) : "Not Rated"}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-medium">Likes:</span>
                <span>{profile.likes || 0}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-medium">Views:</span>
                <span>{profile.views || 0}</span>
              </div>
            </div>

            <div className="flex justify-between items-center space-x-4 p-6 bg-gray-100">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 p-2 rounded-md text-sm font-medium ${profile.isLiked ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
              >
                <FiThumbsUp />
                <span>{profile.isLiked ? "Liked" : "Like"}</span>
              </button>

              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((ratingValue) => (
                  <button
                    key={ratingValue}
                    onClick={() => handleRating(ratingValue)}
                    className={`p-2 rounded-md text-sm ${profile.rating >= ratingValue ? "bg-yellow-500" : "bg-gray-200"}`}
                  >
                    {ratingValue}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
