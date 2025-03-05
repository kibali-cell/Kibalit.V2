import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const WithNavbarLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Content below Navbar fills remaining height */}
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default WithNavbarLayout;
