"use client";  // Add this at the top of the file to mark the component as client-side

import Sidebar from "@/components/Sidebar";
import { FiHome, FiSettings, FiUser, FiBriefcase } from 'react-icons/fi';
import { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
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

  const handleStatusChange = async (bookingId: string, currentStatus: number) => {
    const newStatus = currentStatus === 0 ? 1 : currentStatus === 1 ? 2 : 0; // Toggle between 0, 1, 2
    const bookingRef = doc(db, "bookingRequests", bookingId);
  
    try {
      await updateDoc(bookingRef, {
        statusBooking: newStatus,
      });
      fetchBookings(); // Refetch bookings after updating status
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error updating status:", error.message);
      } else {
        console.error("An unknown error occurred while updating status.");
      }
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

  // Separate bookings by status
  const requestedBookings = bookings.filter((booking) => booking.statusBooking === 0);
  const fixingBookings = bookings.filter((booking) => booking.statusBooking === 1);
  const fixedBookings = bookings.filter((booking) => booking.statusBooking === 2);

  return (
    <div className="flex">
      <Sidebar menuItems={menuItems} />
      <div className="flex-1 ml-64 p-6">
        <br /><br /><br />
        <h1 className="text-2xl font-semibold">Bookings</h1>
        <br /><br />

        {loading ? (
          <p className="text-gray-500">Loading bookings...</p>
        ) : (
          <>
            {/* Requested Bookings Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Requested</h2>
              {requestedBookings.length > 0 ? (
                <div className="space-y-6">
                  {requestedBookings.map((booking) => (
                    <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
                      <h3 className="text-lg font-semibold">{booking.problemTitle}</h3>
                      <p className="text-gray-600">{booking.problemDescription}</p>
                      <p className="text-sm text-gray-500">Client: {booking.clientName}</p>
                      <p className="text-sm text-gray-500">Phone: {booking.phone}</p>
                      <p className="text-sm text-gray-500">Address: {booking.address}</p>
                      <div className="mt-4">
                        <button 
                          className="bg-green-500 text-white px-4 py-2 rounded-md w-full transition hover:bg-green-600" 
                          onClick={() => handleStatusChange(booking.id, booking.statusBooking)}>
                          Accept
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No requested bookings found.</p>
              )}
            </div>

            {/* Fixing Bookings Section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Fixing</h2>
              {fixingBookings.length > 0 ? (
                <div className="space-y-6">
                  {fixingBookings.map((booking) => (
                    <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
                      <h3 className="text-lg font-semibold">{booking.problemTitle}</h3>
                      <p className="text-gray-600">{booking.problemDescription}</p>
                      <p className="text-sm text-gray-500">Client: {booking.clientName}</p>
                      <p className="text-sm text-gray-500">Phone: {booking.phone}</p>
                      <p className="text-sm text-gray-500">Address: {booking.address}</p>
                      <div className="mt-4">
                        <button 
                          className={`${
                            booking.statusBooking === 1
                              ? "bg-blue-500 hover:bg-blue-600"
                              : "bg-gray-500 cursor-not-allowed"
                          } text-white px-4 py-2 rounded-md w-full`}
                          disabled={booking.statusBooking !== 1}
                          onClick={() => handleStatusChange(booking.id, booking.statusBooking)}>
                          Fixing
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No bookings in fixing status.</p>
              )}
            </div>

            {/* Fixed Bookings Section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Fixed</h2>
              {fixedBookings.length > 0 ? (
                <div className="space-y-6">
                  {fixedBookings.map((booking) => (
                    <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
                      <h3 className="text-lg font-semibold">{booking.problemTitle}</h3>
                      <p className="text-gray-600">{booking.problemDescription}</p>
                      <p className="text-sm text-gray-500">Client: {booking.clientName}</p>
                      <p className="text-sm text-gray-500">Phone: {booking.phone}</p>
                      <p className="text-sm text-gray-500">Address: {booking.address}</p>
                      <div className="mt-4">
                        <button 
                          className="bg-gray-500 text-white px-4 py-2 rounded-md w-full cursor-not-allowed"
                          disabled>
                          Fixed
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No fixed bookings found.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
