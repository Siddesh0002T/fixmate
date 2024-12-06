"use client";

import React, { useState } from 'react';
import { db } from '@/utils/firebase'; // Firestore instance
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions
import { useAuthState } from 'react-firebase-hooks/auth'; // Firebase Auth Hook
import { auth } from '@/utils/firebase'; // Firebase Auth instance

const JoinProfessional: React.FC = () => {
  const [user] = useAuthState(auth); // Check if the user is logged in
  const [formData, setFormData] = useState({
    fullName: '',
    service: '',
    experience: '',
    location: '',
    bio: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('Please log in to create a professional profile.');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'Professionals'), {
        userId: user.uid,
        ...formData,
        rating: 0,
        reviews: [],
        createdAt: new Date(),
      });
      setSuccess(true);
      setFormData({
        fullName: '',
        service: '',
        experience: '',
        location: '',
        bio: '',
      });
    } catch (error) {
      console.error('Error adding professional profile:', error);
      alert('Failed to create a professional profile. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
        <br /><br /><br />
      <h1 className="text-2xl font-bold mb-4">Join as a Professional</h1>
      {!user && <p className="text-red-500">Please log in to create a profile.</p>}
      {success && <p className="text-green-500">Profile created successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700">
            Service
          </label>
          <input
            type="text"
            id="service"
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
            Experience (in years)
          </label>
          <input
            type="number"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio/Description
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={!user || loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-300"
        >
          {loading ? 'Creating...' : 'Create Profile'} 
        </button>
      </form>
    </div>
  );
};

export default JoinProfessional;
