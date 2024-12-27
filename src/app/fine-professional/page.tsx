"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs, updateDoc, doc, arrayUnion, getDoc, addDoc } from "firebase/firestore";
import { FiSearch, FiThumbsUp } from "react-icons/fi";
import { FaRegCalendarAlt, FaStar } from "react-icons/fa"; // Importing calendar and star icons

const FindUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedWorker, setSelectedWorker] = useState<any>(null); // Selected worker for booking

  // Function to shuffle an array
  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Fetch users from Firestore
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const userCollection = collection(db, "users");
      const querySnapshot = await getDocs(userCollection);
      const fetchedUsers: any[] = [];
      querySnapshot.forEach((doc) => {
        fetchedUsers.push({ id: doc.id, ...doc.data() });
      });
      const shuffledUsers = shuffleArray(fetchedUsers);
      setUsers(shuffledUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch current user data
  const fetchCurrentUser = async () => {
    // Assuming the current user is already authenticated and you have their ID
    const userDoc = await getDoc(doc(db, "users", "currentUserId")); // Replace "currentUserId" with the actual user ID
    setCurrentUser(userDoc.data());
  };

  useEffect(() => {
    fetchUsers();
    fetchCurrentUser();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    const userData = `${user.displayName} ${user.email} ${user.phone} ${user.profession} ${user.about} ${user.address}`.toLowerCase();
    const isProfileComplete = user.status === 1; // Assuming 'status' field exists
    return userData.includes(searchTerm.toLowerCase()) && isProfileComplete;
  });

  // Handle Like/Unlike
  const handleLike = async (userId: string) => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.id);  // Reference to current user's document
      const targetUserRef = doc(db, "users", userId);  // Reference to the target user's document

      // Fetch current target user data to check likes
      const targetUserDoc = await getDoc(targetUserRef);
      const targetUserData = targetUserDoc.data();

      if (targetUserData) {
        // Check if the current user has already liked this profile
        if (currentUser.likedProfiles && currentUser.likedProfiles.includes(userId)) {
          // Remove like from current user and decrement likes for target user
          await updateDoc(userRef, {
            likedProfiles: arrayRemove(userId),  // Remove the target user from current user's likedProfiles array
          });

          // Decrement likes count for the target user
          await updateDoc(targetUserRef, {
            likes: targetUserData.likes - 1,  // Decrement likes count for the target user
          });
        } else {
          // Add like to current user and increment likes for target user
          await updateDoc(userRef, {
            likedProfiles: arrayUnion(userId),  // Add the target user to current user's likedProfiles array
          });

          // Increment likes count for the target user
          await updateDoc(targetUserRef, {
            likes: (targetUserData.likes || 0) + 1,  // Increment likes count for the target user
          });
        }
      }
    }
  };

  // Handle Book functionality
  const handleBook = async (worker: any) => {
    // Open modal
    setSelectedWorker(worker);
    setIsModalOpen(true);

    // Create booking request in Firestore
    if (currentUser) {
      const bookingRequest = {
        clientId: currentUser.id,
        clientName: currentUser.displayName,
        clientEmail: currentUser.email,
        clientPhone: currentUser.phone,
        clientProfession: currentUser.profession,
        clientAddress: currentUser.address,
        workerId: worker.id,
        workerName: worker.displayName,
        workerEmail: worker.email,
        workerPhone: worker.phone,
        workerProfession: worker.profession,
        workerAddress: worker.address,
        status: "Pending", // Booking status
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Save the booking request to Firestore
      try {
        const bookingRef = await addDoc(collection(db, "bookingRequests"), bookingRequest);
        console.log("Booking request saved with ID: ", bookingRef.id);

        // Optionally, add the request to the worker's "bookingRequests" field if you want to display it there
        await updateDoc(doc(db, "users", worker.id), {
          bookingRequests: arrayUnion(bookingRequest), // Assuming a bookingRequests field exists
        });
      } catch (error) {
        console.error("Error creating booking request:", error);
      }
    }
  };

  // Handle Rating functionality (to be implemented)
  const handleRating = async (userId: string) => {
    console.log(`Rating user with ID: ${userId}`);
    // Implement your rating logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <br /><br />
      

        {/* Search Bar */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center space-x-4 mt-4"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Worker"
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
          >
            <FiSearch />
            <span>Search</span>
          </button>
        </form>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 space-y-4 transform transition-transform duration-300 hover:scale-105"
              >
                {/* Profile Picture and Basic Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt={user.displayName}
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{user.displayName}</h2>
                    <p className="text-gray-500">{user.profession}</p>
                  </div>
                </div>

                {/* Ratings and Likes */}
                <div className="flex items-center space-x-4 text-sm text-gray-700">
                  <div className="flex items-center space-x-1">
                    <span className="font-medium">Rating:</span>
                    <span>{user.rating || "Not Rated"}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="font-medium">Likes:</span>
                    <span>{user.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="font-medium">Views:</span>
                    <span>{user.views}</span>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="text-sm text-gray-700">
                  <p><strong>About:</strong> {user.about}</p>
                  <p><strong>Address:</strong> {user.address}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4 mt-4">
                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(user.id)}
                    className="bg-transparent text-blue-600 p-3 rounded-lg flex items-center space-x-2 hover:bg-blue-100 backdrop-blur-sm bg-opacity-30"
                  >
                    <FiThumbsUp />
                    <span>Like</span>
                  </button>

                  {/* Book Button with Calendar Icon */}
                  <button
                    onClick={() => handleBook(user)}
                    className="bg-transparent text-green-600 p-3 rounded-lg flex items-center space-x-2 hover:bg-green-100 backdrop-blur-sm bg-opacity-30"
                  >
                    <FaRegCalendarAlt />
                    <span>Book</span>
                  </button>

                  {/* Rating Button with Star Icon */}
                  <button
                    onClick={() => handleRating(user.id)}
                    className="bg-transparent text-yellow-600 p-3 rounded-lg flex items-center space-x-2 hover:bg-yellow-100 backdrop-blur-sm bg-opacity-30"
                  >
                    <FaStar />
                    <span>Rate</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No users found.</p>
          )}
        </div>
      

      {/* Modal for Booking Confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold text-gray-800">Confirm Booking</h3>
            <p className="mt-4">Are you sure you want to book this employee?</p>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white p-3 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleBook(selectedWorker)}
                className="bg-blue-600 text-white p-3 rounded-lg"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindUsers;
