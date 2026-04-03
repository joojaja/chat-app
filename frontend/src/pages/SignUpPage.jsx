import { Eye, EyeOff, Loader2, Mail, MessageSquare, User, Lock } from 'lucide-react';
import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';

const SignUpPage = () => {
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
    if (success === true) signup(formData);
  };


  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* TOP LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" /> {/*Message Box logo with hover effect*/}
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>
          {/* END OF TOP LOGO */}

          {/* START OF FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <User className="size-5 text-base-content/40" /> {/* User logo */}
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Your Name"
                  value={formData.fullName} // the value shown on the page is taken from the state variable
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} // whenever user types in input field, the state variable is updated
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Mail className="size-5 text-base-content/40" /> {/* Mail logo */}
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="example@email.com"
                  value={formData.email} // the value shown on the page is taken from the state variable
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} // whenever user types in input field, the state variable is updated
                />
              </div>
            </div>
            
            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className="size-5 text-base-content/40" /> {/* Lock logo */}
                </div>
                <input
                  type={showPassword ? "text" : "password"} // Toggle type based on showPassword state to show/hide password
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password} // the value shown on the page is taken from the state variable
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })} // whenever user types in input field, the state variable is updated
                />
                <button // button to toggle show/hide password
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)} 
                >
                  {showPassword // button icon changes based on showPassword state
                  ? (<EyeOff className="size-5 text-base-content/40" />)
                  : (<Eye className="size-5 text-base-content/40" />)}
                </button>
              </div>
            </div>

            {/*Submit button shows loading spinner when in the middle of signup process*/}
            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : ("Create Account")} {/* Show 'Create Account' if it is not in the middle of signing up process */}
            </button>
          </form>
          {/* END OF FORM */}

          {/* BOTTOM TEXT TO JUMP TO SIGN IN PAGE */}
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern // calling of pre-build component
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />

    </div>
  );
};
export default SignUpPage;