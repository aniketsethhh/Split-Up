// app/sign-in/page.jsx
"use client";               // IMPORTANT: make this a client component
import React from "react";
import { SignIn } from "@clerk/nextjs"; // Clerk SignIn React component

export default function SignInPage() {
  return (
    <div style={{ minHeight: "70vh", padding: "10px" }}>
      {/* Clerk's prebuilt SignIn component */}
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  );
}
