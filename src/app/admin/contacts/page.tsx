"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function Contacts() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch messages from Firestore
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesRef = collection(db, "contacts");
        const q = query(messagesRef, orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);

        const messagesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMessages(messagesList);
      } catch (err) {
        console.error("Error fetching messages: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <section className="p-8">
        <br /><br /><br />
      <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>
      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-2">{message.name}</h3>
              <p className="text-gray-600 mb-2">{message.email}</p>
              <p className="text-gray-800 mb-4">{message.message}</p>
              <div className="text-sm text-gray-500">
                <p>Sent on:</p>
                <p>{new Date(message.timestamp.seconds * 1000).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No messages found.</p>
      )}
    </section>
  );
}
