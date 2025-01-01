"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  arrayRemove,
  arrayUnion,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { FiThumbsUp } from "react-icons/fi";
import { FaRegCalendarAlt, FaStar } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";

const FindUsers = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedWorker, setSelectedWorker] = useState<any>(null);

  // Fetch current user
  const fetchCurrentUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          id: user.uid,
          email: user.email,
          displayName: user.displayName || "Anonymous",
        });
      }
    });
  };

  // Fetch users from Firestore
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const userCollection = collection(db, "users");
      const querySnapshot = await getDocs(userCollection);

      const fetchedUsers = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          isLiked: currentUser ? data.likedBy?.includes(currentUser.id) : false,
        };
      });

      setUsers(fetchedUsers);
    } catch (error: any) {
      console.error("Error fetching users:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  // Handle Like/Unlike
  const handleLike = async (userId: string) => {
    try {
      const targetUserRef = doc(db, "users", userId);
      const targetUserDoc = await getDoc(targetUserRef);

      if (!targetUserDoc.exists()) {
        alert("The user you are trying to like does not exist.");
        return;
      }

      const targetUserData = targetUserDoc.data();
      const alreadyLiked = targetUserData.likedBy?.includes(currentUser?.id);

      if (alreadyLiked) {
        await updateDoc(targetUserRef, {
          likes: Math.max((targetUserData.likes || 0) - 1, 0),
          likedBy: arrayRemove(currentUser?.id),
        });
      } else {
        await updateDoc(targetUserRef, {
          likes: (targetUserData.likes || 0) + 1,
          likedBy: arrayUnion(currentUser?.id),
        });
      }

      // Update UI
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                likes: alreadyLiked
                  ? Math.max((user.likes || 0) - 1, 0)
                  : (user.likes || 0) + 1,
                isLiked: !alreadyLiked,
              }
            : user
        )
      );
    } catch (error: any) {
      console.error("Error handling like:", error.message);
    }
  };

  // Handle Book functionality
  const handleBook = async (worker: any) => {
    setSelectedWorker(worker);
    setIsModalOpen(true);

    if (currentUser) {
      const bookingRequest = {
        clientId: currentUser.id,
        clientName: currentUser.displayName,
        workerId: worker.id,
        workerName: worker.displayName,
        status: "Pending",
        createdAt: new Date(),
      };

      try {
        const bookingRef = await addDoc(
          collection(db, "bookingRequests"),
          bookingRequest
        );
        console.log("Booking request saved with ID: ", bookingRef.id);

        await updateDoc(doc(db, "users", worker.id), {
          bookingRequests: arrayUnion(bookingRequest),
        });
      } catch (error: any) {
        console.error("Error creating booking request:", error.message);
      }
    }
  };

  // Handle Rating (Placeholder for future implementation)
  const handleRating = (userId: string) => {
    console.log(`Rating user with ID: ${userId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Find Workers</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search workers by name, profession..."
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

{/* Users List */}
{loading ? (
  <p className="text-center text-gray-600">Loading workers...</p>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {users
      .filter((user) =>
        `${user.displayName} ${user.profession} ${user.about}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      .map((user) => (
        <div
          key={user.id}
          className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition duration-300"
        >
          {/* Profile Section */}
          <div className="flex items-center mb-4">
            <img
              src={user.photoURL || "/default-avatar.png"}
              alt={user.displayName}
              className="w-16 h-16 rounded-full border-2 border-gray-300"
            />
            <div className="ml-4">
              <h2 className="text-lg font-bold text-gray-800">
                {user.displayName}
              </h2>
              <p className="text-gray-600">{user.profession}</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-sm text-gray-700 mb-4">
            <p><strong>About:</strong> {user.about}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>

          {/* Ratings and Likes */}
          <div className="flex justify-between text-sm text-gray-700 mb-4">
            <div className="flex items-center space-x-1">
              <span className="font-medium">Rating:</span>
              <span>{user.rating || "Not Rated"}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium">Likes:</span>
              <span>{user.likes || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium">Views:</span>
              <span>{user.views || 0}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center space-x-4 mt-4">
            {/* Like Button */}
            <button
              onClick={() => handleLike(user.id)}
              className={`flex items-center space-x-2 p-2 rounded-md text-sm font-medium ${
                user.isLiked
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              <FiThumbsUp />
              <span>{user.isLiked ? "Unlike" : "Like"}</span>
            </button>

            {/* Book Button */}
            <button
              onClick={() => handleBook(user)}
              className="flex items-center space-x-2 p-2 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-600"
            >
              <FaRegCalendarAlt />
              <span>Book</span>
            </button>

            {/* Rate Button */}
            <button
              onClick={() => handleRating(user.id)}
              className="flex items-center space-x-2 p-2 bg-yellow-400 text-white rounded-md text-sm font-medium hover:bg-yellow-500"
            >
              <FaStar />
              <span>Rate</span>
            </button>
          </div>
        </div>
      ))}
  </div>
)}

    </div>
  );
};

export default FindUsers;
