// pages/404.tsx
import React from 'react';
import Footer from '@/components/Footer';

const Custom404: React.FC = () => {
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! The page youre looking for doesnt exist.
      </p>
  
    </div>
      <Footer/> 
      </>

  );
};

export default Custom404;
