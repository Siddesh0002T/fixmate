"use client";  // Add this at the top of the file to mark the component as client-side

import Sidebar from "@/components/Sidebar";
import { FiHome, FiSettings, FiUser, FiBriefcase } from 'react-icons/fi';
import { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Bookings() {
  const menuItems = [
    { label: 'Home', icon: <FiHome />, link: '/dashboard/home' },
    { label: 'Profile', icon: <FiUser />, link: '/dashboard/profile' },
    { label: 'Bookings', icon: <FiBriefcase />, link: '/dashboard/bookings' },
    { label: 'Settings', icon: <FiSettings />, link: '/dashboard/settings' },
  ];

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch current user
  const fetchCurrentUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  };

  // Fetch bookings for the worker
  const fetchBookings = async () => {
    try {
      if (!currentUser) return;
      setLoading(true);

      // Fetch the worker's bookings
      const bookingsRef = collection(db, "bookingRequests");
      const q = query(bookingsRef, where("workerId", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);

      const fetchedBookings = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
        };
      });

      setBookings(fetchedBookings);
    } catch (error: any) {
      console.error("Error fetching bookings:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchBookings();
    }
  }, [currentUser]);

  return (
    <div className="flex">
      <Sidebar menuItems={menuItems} />
      <div className="flex-1 ml-64 p-6">
        <br /><br /><br />
        <h1 className="text-2xl font-semibold">Bookings</h1>
        <br /><br />

        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">{booking.problemTitle}</h3>
                <p className="text-gray-600">{booking.problemDescription}</p>
                <p className="text-sm text-gray-500">Client: {booking.clientName}</p>
                <p className="text-sm text-gray-500">Phone: {booking.phone}</p>
                <p className="text-sm text-gray-500">Address: {booking.address}</p>
                <p className="text-sm text-gray-500">Booking Status: {booking.statusBooking === 0 ? "Requested" : booking.statusBooking === 1 ? "Fixing" : "Fixed"}</p>
                <div className="mt-4 flex space-x-4">
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                    Accept
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
}
