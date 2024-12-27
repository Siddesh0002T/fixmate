"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs, updateDoc, doc, arrayUnion, getDoc, addDoc } from "firebase/firestore";
import { FiSearch, FiThumbsUp } from "react-icons/fi";
import { FaRegCalendarAlt, FaStar } from "react-icons/fa"; // Importing calendar and star icons
import Loader from "@/components/Loader";

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
        <form onSubmit={(e) => e.preventDefault()} className="relative w-full mt-4">
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search Worker"
    className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-slate-200 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
  />
  <label
    className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
    htmlFor="searchWorker"
  >
    Search Worker
  </label>
  <div className="absolute top-3 right-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="slate-300"
      viewBox="0 0 24 24"
      height="24"
      width="24"
    >
      <path
        d="M10.979 16.8991C11.0591 17.4633 10.6657 17.9926 10.0959 17.9994C8.52021 18.0183 6.96549 17.5712 5.63246 16.7026C4.00976 15.6452 2.82575 14.035 2.30018 12.1709C1.77461 10.3068 1.94315 8.31525 2.77453 6.56596C3.60592 4.81667 5.04368 3.42838 6.82101 2.65875C8.59833 1.88911 10.5945 1.79039 12.4391 2.3809C14.2837 2.97141 15.8514 4.21105 16.8514 5.86977C17.8513 7.52849 18.2155 9.49365 17.8764 11.4005C17.5979 12.967 16.8603 14.4068 15.7684 15.543C15.3736 15.9539 14.7184 15.8787 14.3617 15.4343C14.0051 14.9899 14.0846 14.3455 14.4606 13.9173C15.1719 13.1073 15.6538 12.1134 15.8448 11.0393C16.0964 9.62426 15.8261 8.166 15.0841 6.93513C14.3421 5.70426 13.1788 4.78438 11.81 4.34618C10.4412 3.90799 8.95988 3.98125 7.641 4.55236C6.32213 5.12348 5.25522 6.15367 4.63828 7.45174C4.02135 8.74982 3.89628 10.2276 4.28629 11.6109C4.67629 12.9942 5.55489 14.1891 6.75903 14.9737C7.67308 15.5693 8.72759 15.8979 9.80504 15.9333C10.3746 15.952 10.8989 16.3349 10.979 16.8991Z"
      ></path>
      <rect
        transform="rotate(-49.6812 12.2469 14.8859)"
        rx="1"
        height="10.1881"
        width="2"
        y="14.8859"
        x="12.2469"
      ></rect>
    </svg>
  </div>
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
    className="bg-transparent text-blue-600 hover:text-blue-800 font-medium"
  >
    <FiThumbsUp className="inline-block mr-2" />
    Like
  </button>

  {/* Book Button */}
  <button
    onClick={() => handleBook(user)}
    className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium"
  >
    <FaRegCalendarAlt className="inline-block mr-2" />
    Book
  </button>

  {/* Rating Button */}
  <button
    onClick={() => handleRating(user.id)}
    className="bg-yellow-400 text-white hover:bg-yellow-500 px-4 py-2 rounded-md font-medium"
  >
    <FaStar className="inline-block mr-2" />
    Rate
  </button>
</div>
</div>
))
) : (
  <p className="text-center text-gray-600">No workers found matching your search criteria.</p>
)}

</div>

{/* Modal for Booking */}
{isModalOpen && selectedWorker && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h3 className="text-xl font-semibold text-gray-800">Book {selectedWorker.displayName}</h3>
      <p className="mt-2 text-gray-600">Are you sure you want to book {selectedWorker.displayName} for a job?</p>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-gray-300 text-gray-800 hover:bg-gray-400 px-4 py-2 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={() => handleBook(selectedWorker)}
          className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
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
