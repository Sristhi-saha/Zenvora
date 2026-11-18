import React from "react";
import { Outlet } from "react-router-dom";
import { BookOpen, Sparkles, BookmarkCheck, Bot } from "lucide-react";
import ShoppingViewHeader from "../shopping-view/header.jsx"; // 👈 1. Import Header

function AuthLayout() {
  return (
    // 👈 2. Change outer div to flex-col so items stack top-to-bottom
    <div className="flex flex-col min-h-screen w-full bg-[#FAF8F5] dark:bg-[#0C0C0C] text-[#1C1C1C] dark:text-[#F3F4F6] transition-colors">
      
      {/* 👈 3. HEADER PLACED AT THE VERY TOP */}
      <ShoppingViewHeader />

      {/* 👈 4. INNER CONTAINER (Side-by-Side Left & Right) */}
      <div className="flex flex-1 w-full">
        {/* 1. LEFT SIDE: Student Portal Value Props (Desktop only) */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 lg:p-16 border-r border-gray-200/80 dark:border-gray-800">
          {/* Brand Header */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#1A1A1A] border-2 border-gray-900 dark:border-gray-700 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
              <BookOpen className="w-5 h-5 text-[#1C1C1C] dark:text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">Zenvora</span>
            <span className="text-[10px] font-bold font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 rounded-full ml-1">
              STUDENT PORTAL
            </span>
          </div>

          {/* Center: Auth-Specific Headline & Benefits Card */}
          <div className="max-w-lg space-y-8 my-auto">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-wide mb-3">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>FREE KNOWLEDGE COMMUNITY</span>
              </div>

              {/* Headline with the signature Green Selection Box */}
              <h1 className="text-4xl xl:text-5xl font-bold tracking-tight text-[#1C1C1C] dark:text-white leading-[1.2]">
                Your personal{" "}
                <span className="relative inline-block border-2 border-[#22C55E] text-[#16A34A] dark:text-[#4ADE80] px-3 py-0.5 rounded-sm font-mono mx-1 bg-green-50/60 dark:bg-green-950/40">
                  <span className="absolute -top-1.5 -left-1.5 w-2 h-2 bg-[#22C55E] rounded-full ring-2 ring-[#FAF8F5] dark:ring-[#0C0C0C]" />
                  study vault
                  <span className="absolute -bottom-1.5 -right-1.5 w-2 h-2 bg-[#22C55E] rounded-full ring-2 ring-[#FAF8F5] dark:ring-[#0C0C0C]" />
                </span>
                <br />
                starts here.
              </h1>

              <p className="mt-4 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Sign in to save your favorite notes, sync your reading queue across devices, and ask unlimited questions to Google Gemini AI.
              </p>
            </div>

            {/* Account Benefits Card */}
            <div className="bg-white dark:bg-[#141414] border-2 border-gray-900 dark:border-gray-700 rounded-3xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <BookmarkCheck className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Save & bookmark notes for offline revision before exams
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-gray-800 dark:dark:text-gray-200">
                  Ask doubts to PDFs & generate personalized mock quizzes
                </span>
              </div>
            </div>
          </div>

          {/* Footer info */}
          <div className="text-xs text-gray-400 font-medium">
            No credit cards or subscription fees. Free forever.
          </div>
        </div>

        {/* 2. RIGHT SIDE: Form Area */}
        <div className="flex flex-1 items-center justify-center p-6 sm:p-12 md:w-1/2">
          <div className="w-full max-w-md bg-white dark:bg-[#141414] border-2 border-gray-900 dark:border-gray-700 rounded-3xl p-8 sm:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;