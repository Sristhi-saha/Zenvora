import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerFormControls } from "../../config/index";
import CommonForm from "../../components/common/form";
import { useDispatch } from "react-redux";
import { registerUserAction, googleAuthAction } from "@/store/auth-slice";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import { useTheme } from "next-themes";

const AuthRegister = () => {
  const { theme } = useTheme();
  const initialState = {
    username: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. Standard Register Submit Handler
  function onSubmit(e) {
    e.preventDefault();
    dispatch(registerUserAction(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message || "Registration successful!");
        navigate("/auth/login");
      } else {
        toast.error(data?.payload?.message || "Registration failed");
      }
    });
  }

  // 2. Google OAuth Success Handler
  function handleGoogleSuccess(credentialResponse) {
    if (credentialResponse.credential) {
      dispatch(googleAuthAction(credentialResponse.credential)).then((data) => {
        if (data?.payload?.success) {
          toast.success("Welcome to Zenvora!");
        } else {
          toast.error(data?.payload?.message || "Google signup failed");
        }
      });
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Create Account
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>

      <CommonForm
        formData={formData}
        formControls={registerFormControls}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText="Sign Up"
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
      <div className="w-full flex justify-center [&>div]:w-full [&>div>iframe]:!w-full [&>div>iframe]:!rounded-xl">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error("Google Sign-Up failed")}
          theme={theme === "dark" ? "filled_black" : "outline"}
          shape="rectangular"
          size="large"
          width="100%"
          text="continue_with"
        />
      </div>
    </div>
  );
};

export default AuthRegister;
