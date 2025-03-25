
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';

const Auth = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-md mx-auto px-4 pt-16 pb-20">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </div>
  );
};

export default Auth;
