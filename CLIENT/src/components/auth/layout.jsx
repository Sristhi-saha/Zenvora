import React from "react";
import { Outlet } from "react-router-dom";
import { BookOpen, Sparkles, BookmarkCheck, Bot, Users } from "lucide-react";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-[#FAF8F5] text-[#1C1C1C]">
      {/* 1. LEFT SIDE: Student Portal Value Props (Desktop only) */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 lg:p-16 border-r border-gray-200/80">
        {/* Brand Header */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-white border-2 border-gray-900 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <BookOpen className="w-5 h-5 text-[#1C1C1C]" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">Zenvora</span>
          <span className="text-[10px] font-bold font-mono bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full ml-1">
            STUDENT PORTAL
          </span>
        </div>

        {/* Center: Auth-Specific Headline & Benefits Card */}
        <div className="max-w-lg space-y-8 my-auto">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-700 tracking-wide mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>FREE KNOWLEDGE COMMUNITY</span>
            </div>

            {/* Headline with the signature Green Selection Box */}
            <h1 className="text-4xl xl:text-5xl font-bold tracking-tight text-[#1C1C1C] leading-[1.2]">
              Your personal{" "}
              <span className="relative inline-block border-2 border-[#22C55E] text-[#16A34A] px-3 py-0.5 rounded-sm font-mono mx-1 bg-green-50/60">
                <span className="absolute -top-1.5 -left-1.5 w-2 h-2 bg-[#22C55E] rounded-full ring-2 ring-[#FAF8F5]" />
                study vault
                <span className="absolute -bottom-1.5 -right-1.5 w-2 h-2 bg-[#22C55E] rounded-full ring-2 ring-[#FAF8F5]" />
              </span>
              <br />
              starts here.
            </h1>

            <p className="mt-4 text-base text-gray-600 leading-relaxed">
              Sign in to save your favorite notes, sync your reading queue across devices, and ask unlimited questions to Google Gemini AI.
            </p>
          </div>

          {/* Account Benefits Card */}
          <div className="bg-white border-2 border-gray-900 rounded-3xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <BookmarkCheck className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-gray-800">
                Save & bookmark notes for offline revision before exams
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-gray-800">
                Ask doubts to PDFs & generate personalized mock quizzes
              </span>
            </div>

            {/* <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-gray-800">
                Join 5,000+ CS students contributing to the open library
              </span>
            </div> */}
          </div>
        </div>

        {/* Footer info */}
        <div className="text-xs text-gray-400 font-medium">
          No credit cards or subscription fees. Free forever.
        </div>
      </div>

      {/* 2. RIGHT SIDE: Form Area */}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-12 md:w-1/2">
        <div className="w-full max-w-md bg-white border-2 border-gray-900 rounded-3xl p-8 sm:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;