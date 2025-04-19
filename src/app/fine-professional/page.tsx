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
import { FaRegCalendarAlt } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";

const FindUsers = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [addressSearchTerm, setAddressSearchTerm] = useState<string>(""); // New state for address search
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedWorker, setSelectedWorker] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    problemTitle: "",
    problemDescription: "",
    statusBooking: 0, // Default status: Requested
  });

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

  // Shuffle function to randomize users
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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

      // Shuffle users before setting the state
      const shuffledUsers = shuffleArray(fetchedUsers);

      setUsers(shuffledUsers);
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
  const handleBook = (worker: any) => {
    setSelectedWorker(worker);
    setIsModalOpen(true);

    if (currentUser) {
      setFormData({
        ...formData,
        name: currentUser.displayName,
        email: currentUser.email,
        phone: currentUser.phone || "",
        address: currentUser.address || "",
      });
    }
  };

  // Handle form field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle save booking request
  const handleSaveBooking = async () => {
    try {
      const bookingRequest = {
        clientId: currentUser.id,
        clientName: currentUser.displayName,
        workerId: selectedWorker.id,
        workerName: selectedWorker.displayName,
        createdAt: new Date(),
        ...formData,
        statusBooking: formData.statusBooking,
      };

      // Save the booking request to the 'bookingRequests' collection
      const bookingRef = await addDoc(collection(db, "bookingRequests"), bookingRequest);

      // Save the booking request to the worker's document
      await updateDoc(doc(db, "users", selectedWorker.id), {
        bookingRequests: arrayUnion(bookingRequest),
      });

      // Optionally, update the current user's document to store their booking requests
      await updateDoc(doc(db, "users", currentUser.id), {
        bookingRequests: arrayUnion(bookingRequest),
      });

      console.log("Booking request saved with ID: ", bookingRef.id);

      // Close the modal
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Error saving booking:", error.message);
    }
  };
  // Handle Rating
  const handleRating = async (userId: string, newRating: number) => {
    try {
      const targetUserRef = doc(db, "users", userId);
      const targetUserDoc = await getDoc(targetUserRef);

      if (!targetUserDoc.exists()) {
        alert("The user you are trying to rate does not exist.");
        return;
      }

      const targetUserData = targetUserDoc.data();
      const totalRatings = targetUserData.totalRatings || 0;
      const currentRating = targetUserData.rating || 0;

      // Calculate new average rating
      const updatedTotalRatings = totalRatings + 1;
      const updatedRating =
        (currentRating * totalRatings + newRating) / updatedTotalRatings;

      // Update Firestore document
      await updateDoc(targetUserRef, {
        rating: updatedRating,
        totalRatings: updatedTotalRatings,
      });

      // Update UI
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, rating: updatedRating }
            : user
        )
      );
    } catch (error: any) {
      console.error("Error handling rating:", error.message);
    }
  };

  // Increment view count
  const incrementViewCount = async (userId: string) => {
    try {
      const targetUserRef = doc(db, "users", userId);
      const targetUserDoc = await getDoc(targetUserRef);

      if (!targetUserDoc.exists()) {
        alert("The user you are trying to view does not exist.");
        return;
      }

      const targetUserData = targetUserDoc.data();
      const updatedViews = (targetUserData.views || 0) + 1;

      // Update view count in Firestore
      await updateDoc(targetUserRef, {
        views: updatedViews,
      });

      // Update UI
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, views: updatedViews } : user
        )
      );
    } catch (error: any) {
      console.error("Error incrementing view count:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <br />br
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
       {/* Address Search Bar */}
       <div className="mb-6">
        <input
          type="text"
          value={addressSearchTerm}
          onChange={(e) => setAddressSearchTerm(e.target.value)}
          placeholder="Search workers by address..."
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
                  .includes(searchTerm.toLowerCase()) &&
                (user.address || "").toLowerCase().includes(addressSearchTerm.toLowerCase())
              )
            .map((user) => (
              <div
                key={user.id}
                className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition duration-300"
                onClick={() => incrementViewCount(user.id)} // Increment view count on profile click
              >
                {/* Profile Section */}
                <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
  <div className="flex items-center p-6 bg-gradient-to-r from-blue-500 to-purple-600">
    <img
      src={user.photoURL || "/default-avatar.png"}
      alt={user.displayName}
      className="w-20 h-20 rounded-full border-4 border-white shadow-md"
    />
    <div className="ml-6 text-white">
      <h2 className="text-2xl font-semibold">{user.displayName}</h2>
      <p className="text-lg">{user.profession}</p>
    </div>
  </div>

  {/* Additional Info */}
  <div className="px-6 py-4">
    <p className="text-sm text-gray-700"><strong>About:</strong> {user.about}</p>
    <p className="text-sm text-gray-700"><strong>Address:</strong> {user.address}</p>
    <p className="text-sm text-gray-700"><strong>Email:</strong> {user.email}</p>
    <p className="text-sm text-gray-700"><strong>Phone:</strong> {user.phone}</p>
  </div>

  {/* Ratings and Likes */}
  <div className="flex justify-between px-6 py-4 bg-gray-50 text-sm text-gray-700">
    <div className="flex items-center space-x-1">
      <span className="font-medium">Rating:</span>
      <span>{user.rating ? user.rating.toFixed(1) : "Not Rated"}</span>
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
  <div className="flex justify-between items-center space-x-4 p-6 bg-gray-100">
    {/* Like Button */}
    <button
      onClick={() => handleLike(user.id)}
      className={`flex items-center space-x-2 p-2 rounded-md text-sm font-medium ${
        user.isLiked ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
      } transition duration-200`}
    >
      <FiThumbsUp />
      <span>{user.isLiked ? "Unlike" : "Like"}</span>
    </button>

    {/* Book Button */}
    <button
      onClick={() => handleBook(user)}
      className="flex items-center space-x-2 p-2 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-600 transition duration-200"
    >
      <FaRegCalendarAlt />
      <span>Book</span>
    </button>

    {/* Rate Button */}
    <div className="flex flex-col items-center space-y-2">
      <select
        defaultValue=""
        onChange={(e) => handleRating(user.id, Number(e.target.value))}
        className="p-2 bg-yellow-400 text-white rounded-md text-sm font-medium hover:bg-yellow-500 transition duration-200"
      >
        <option value="" disabled>
          Rate this user
        </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
  </div>
</div>

              </div>
            ))}
            {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Booking Form</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Name"
                disabled
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Email"
                disabled
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Phone"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Address"
              />
              <input
                type="text"
                name="problemTitle"
                value={formData.problemTitle}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Problem Title"
              />
              <textarea
                name="problemDescription"
                value={formData.problemDescription}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Problem Description"
              ></textarea>

              <div className="flex justify-between">
                <button
                  onClick={handleSaveBooking}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Save Booking
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white p-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
        </div>
      )}
    </div>
  );
};

export default FindUsers;
