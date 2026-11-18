import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoginFromControls } from "../../config/index";
import CommonForm from "../../components/common/form";
import { useDispatch } from "react-redux";
import { loginUserAction, googleAuthAction } from "@/store/auth-slice";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";

const AuthLogin = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  // 1. Email + Password Submit Handler
  function onSubmit(e) {
    e.preventDefault();

    dispatch(loginUserAction(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message || "Login successful!");
      } else {
        toast.error(data?.payload?.message || "Some error occurred");
      }
    });
  }

  // 2. Google OAuth Success Handler
  function handleGoogleSuccess(credentialResponse) {
    if (credentialResponse.credential) {
      dispatch(googleAuthAction(credentialResponse.credential)).then((data) => {
        if (data?.payload?.success) {
          toast.success("Welcome back to Zenvora!");
        } else {
          toast.error(data?.payload?.message || "Google login failed");
        }
      });
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      {/* Header text */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>

      {/* Standard Email / Password Form */}
      <CommonForm
        formData={formData}
        formControls={LoginFromControls}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText="Sign In"
      />

      {/* "Or continue with" Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase font-mono">
          <span className="bg-white dark:bg-[#141414] px-3 text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      {/* Google OAuth Button */}
      <div className="flex justify-center w-full">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error("Google Sign-In failed")}
          theme="outline"
          shape="pill"
          size="large"
          width="100%"
        />
      </div>
    </div>
  );
};

export default AuthLogin;
