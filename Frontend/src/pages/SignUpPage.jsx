import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Lock, MessageSquare } from "lucide-react";
import { User2 } from "lucide-react";
import { Mail } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";
const SignUpPage = () => {
  //when the data is text the axios automaticaly convert it to json and set header content type
  //in case of multipart formdata it directly pass it to browser dont do anthing browser add the content type and encode it to multipart

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
 


  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      
      {/* Left Side: Form */}
      <div className="flex flex-col justify-center items-center px-6 sm:px-12 py-12">
        <div className="w-full max-w-xl space-y-10 bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition duration-300">

          {/* Logo & Heading */}
          <div className="text-center mb-4">
            <div className="flex flex-col items-center gap-2">
              <div className="size-14 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center shadow z-5">
                <Sparkles className="size-7 text-purple-600 dark:text-purple-300" />
              </div>
              <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">Join Us</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Start your journey with a free account
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <div className="relative">
              <label htmlFor="fullName" className="sr-only">Full Name</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-5">
                <User2 className="size-5 text-gray-400" />
              </div>
              <input
                id="fullName"
                type="text"
                className="input input-lg w-full pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50 rounded-md focus:ring-2 focus:ring-purple-500 transition"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-5">
                <Mail className="size-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                className="input input-lg w-full pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50 rounded-md focus:ring-2 focus:ring-purple-500 transition"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-5">
                <Lock className="size-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="input input-lg w-full pl-10 pr-12 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50 rounded-md focus:ring-2 focus:ring-purple-500 transition"
                placeholder="Password (min. 6 characters)"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn bg-purple-600 text-white font-semibold py-3 rounded-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:outline-none disabled:opacity-50 transition"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="size-5 animate-spin" />
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:underline dark:text-purple-400 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side */}
      <AuthImagePattern 
        title="Welcome to the Circle"
        subtitle="Stay connected with your peers, share your voice, and discover more."
        className="hidden lg:flex"
      />
    </div>
  );
};

export default SignUpPage;
