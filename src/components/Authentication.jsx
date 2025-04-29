// components/Authentication.js
import React from 'react';
import { SignIn } from "@clerk/clerk-react";

const Auth = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn path="/auth" routing="path" signUpUrl="/auth" />
    </div>
  );
};

export default Auth;
