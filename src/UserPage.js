import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const UserPage = () => {
  return (
    // <div className="video-background">
    //   {/* <div className="overlay"></div> */}
    //   <video src={background} autoPlay loop muted/>
    //   <div className="content">
    //     <h1>Travel Companion</h1>
    //   </div>
    // </div>
    <div className="w-full h-full">
      <Outlet />    
    </div>
  );
  
};

export default UserPage;
