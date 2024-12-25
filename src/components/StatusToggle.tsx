'use client'; // Indicate this is a client-side component

import React, { useState, useEffect } from "react";
import { db } from "@/utils/firebase"; // Assuming you're using Firebase
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Import Firebase methods

const StatusToggle = ({ userId }) => {
  const [status, setStatus] = useState(null); // Initially, set status to null
  const [loading, setLoading] = useState(true); // To handle loading state

  // Fetch the current status from the database
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        console.log("Fetching status for userId:", userId); // Log the userId being fetched
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setStatus(userDoc.data().status); // Set the current status
        } else {
          console.error("No such user document! Check if the userId exists in Firestore.");
          setStatus(0); // Set to offline if no document found
        }
      } catch (error) {
        console.error("Error fetching status:", error);
      } finally {
        setLoading(false); // Stop loading after fetching the data
      }
    };

    fetchStatus();
  }, [userId]); // Runs only when the userId changes

  // Handle toggle switch change
  const handleToggleChange = async () => {
    if (status === null) return; // Don't proceed if status is not fetched yet

    const newStatus = status === 1 ? 0 : 1; // Toggle between 1 (online) and 0 (offline)
    setStatus(newStatus); // Update the local state

    // Update the status in the Firebase database
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        status: newStatus,
      });
      console.log("Status updated to", newStatus === 1 ? "Online" : "Offline");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching status
  }

  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-700">Status:</span>
      <label className="relative inline-block w-12 mr-2 align-middle select-none">
        <input
          type="checkbox"
          checked={status === 1}
          onChange={handleToggleChange}
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        />
        <span
          className={`toggle-label block overflow-hidden h-6 mb-1 rounded-full bg-gray-300 transition-all duration-200 ease-in-out ${
            status === 1 ? "bg-green-400" : "bg-gray-400"
          }`}
        ></span>
      </label>
      <span className={`text-${status === 1 ? "green" : "gray"}-600`}>
        {status === 1 ? "Online" : "Offline"}
      </span>
    </div>
  );
};

export default StatusToggle;
