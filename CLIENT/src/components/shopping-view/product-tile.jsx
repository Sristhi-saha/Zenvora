import React from "react";
import { Button } from "../ui/button";
import {
  BookOpen,
  BookmarkCheck,
  Sparkles,
  FileText,
  CheckCircle2,
} from "lucide-react";

function ShoppingProductTile({
  product,
  handleAddToCart,
  handleGetProductDetails,
}) {
  return (
    <div className="bg-white dark:bg-[#141414] border-2 border-gray-900 dark:border-gray-700 rounded-3xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] flex flex-col justify-between transition-all hover:-translate-y-1">
      {/* 1. Clickable Preview & Metadata */}
      <div
        onClick={() => handleGetProductDetails?.(product?._id)}
        className="cursor-pointer"
      >
        {/* Cover Image / Thumbnail */}
        <div className="relative aspect-[16/10] bg-gray-50 dark:bg-[#1A1A1A] border-b-2 border-gray-900 dark:border-gray-700 flex items-center justify-center overflow-hidden">
          {product?.image ? (
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-400 gap-1.5">
              <FileText className="w-10 h-10 stroke-[1.25]" />
              <span className="text-[10px] font-mono">PDF PREVIEW</span>
            </div>
          )}

          {/* 100% Free Badge */}
          <span className="absolute top-2.5 left-2.5 bg-[#22C55E] text-white font-mono font-bold text-[9px] uppercase px-2 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            100% FREE
          </span>

          {/* Subject Badge */}
          <span className="absolute bottom-2.5 right-2.5 bg-white/95 dark:bg-black/90 text-gray-800 dark:text-gray-200 font-mono font-bold text-[9px] uppercase px-2 py-0.5 rounded-md border border-gray-300 dark:border-gray-700">
            {product?.category?.toUpperCase() || "CORE CS"}
          </span>
        </div>

        {/* Note Info */}
        <div className="p-4 space-y-2">
          <h3 className="font-extrabold text-base text-gray-900 dark:text-white line-clamp-1 leading-snug">
            {product?.title}
          </h3>

          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {product?.description || "Comprehensive syllabus notes covering theory and solved questions."}
          </p>

          <div className="flex items-center gap-1.5 pt-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Topper Curated • 2026 Edition</span>
          </div>
        </div>
      </div>

      {/* 2. Action Buttons */}
      <div className="p-4 pt-0">
        <Button
          onClick={() => handleAddToCart?.(product?._id)}
          className="w-full py-2.5 bg-[#1C1C1C] dark:bg-white text-white dark:text-[#111111] hover:bg-black dark:hover:bg-gray-200 font-bold text-xs rounded-xl border-2 border-gray-900 dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <BookmarkCheck className="w-3.5 h-3.5" />
          Save to Study Queue
        </Button>
      </div>
    </div>
  );
}

export default ShoppingProductTile;