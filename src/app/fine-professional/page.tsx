"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs, updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { FiSearch, FiThumbsUp } from "react-icons/fi";

const FindUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null); // Assuming currentUser is fetched from your authentication system

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
    // Fetch current user data based on authentication system (Firebase Auth, etc.)
    // Example:
    // const userDoc = await getDoc(doc(db, "users", currentUserId));
    // setCurrentUser(userDoc.data());
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
    fetchCurrentUser();
  }, []);

  // Filter users based on search term across all fields
  const filteredUsers = users.filter((user) => {
    const userData = `${user.displayName} ${user.email} ${user.phone} ${user.profession} ${user.about} ${user.address}`
      .toLowerCase();
    return userData.includes(searchTerm.toLowerCase());
  });

  // Handle Like/Unlike
  const handleLike = async (userId: string) => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.id);
      const targetUserRef = doc(db, "users", userId);

      // Check if the user already liked this profile
      if (currentUser.likedProfiles && currentUser.likedProfiles.includes(userId)) {
        // If already liked, remove from likedProfiles and decrease like count
        await updateDoc(userRef, {
          likedProfiles: arrayRemove(userId),
        });
        await updateDoc(targetUserRef, {
          likes: targetUserRef.likes - 1,
        });
      } else {
        // If not liked, add to likedProfiles and increase like count
        await updateDoc(userRef, {
          likedProfiles: arrayUnion(userId),
        });
        await updateDoc(targetUserRef, {
          likes: targetUserRef.likes + 1,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <br /><br /><br />
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Find Users</h1>

        {/* Search Bar */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center space-x-4"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by any user detail..."
            className="flex-1 border border-gray-300 rounded-lg p-2"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg flex items-center space-x-2"
          >
            <FiSearch />
            <span>Search</span>
          </button>
        </form>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {loading ? (
            <p>Loading...</p>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white border border-gray-200 rounded-lg shadow-md p-4 space-y-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt={user.displayName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{user.displayName}</h2>
                    <p className="text-gray-500">{user.profession}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Experience:</strong> {user.experience}</p>
                  <p><strong>Rating:</strong> {user.rating || "Not Rated"}</p>
                  <p><strong>Likes:</strong> {user.likes}</p>
                  <p><strong>Views:</strong> {user.views}</p>
                  <p><strong>About:</strong> {user.about}</p>
                  <p><strong>Address:</strong> {user.address}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                </div>

                {/* Like Button */}
                <button
                  onClick={() => handleLike(user.id)}
                  className={`flex items-center space-x-2 ${currentUser?.likedProfiles?.includes(user.id) ? "text-blue-600" : "text-gray-600"}`}
                >
                  <FiThumbsUp />
                  <span>{currentUser?.likedProfiles?.includes(user.id) ? "Liked" : "Like"}</span>
                </button>
              </div>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindUsers;
