import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useDispatch } from "react-redux";
import { setProductDetails } from "@/store/shop/product-slice/index.js";
import {
  BookOpen,
  Sparkles,
  Bot,
  BookmarkCheck,
  CheckCircle2,
  FileText,
} from "lucide-react";

function ProductDetailsDialog({
  open,
  setOpen,
  productDetails,
  handleAddToCart,
}) {
  const dispatch = useDispatch();

  // 👈 Resets Redux state when the dialog closes
  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-[90vw] sm:max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border-2 border-gray-900 dark:border-gray-700 bg-white dark:bg-[#141414] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.15)]">
        {productDetails ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* 1. LEFT SIDE: Note Preview Thumbnail */}
            <div className="flex flex-col items-center">
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border-2 border-gray-900 dark:border-gray-700 bg-gray-50 dark:bg-[#1E1E1E] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] flex items-center justify-center">
                {productDetails?.image ? (
                  <img
                    src={productDetails?.image}
                    alt={productDetails?.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400 gap-2">
                    <FileText className="w-16 h-16 stroke-[1.25]" />
                    <span className="text-xs font-mono">PDF Preview</span>
                  </div>
                )}

                <span className="absolute top-3 left-3 bg-[#22C55E] text-white font-mono font-bold text-[10px] px-2.5 py-1 rounded-full border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  100% FREE ACCESS
                </span>
              </div>

              <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Verified Syllabus Alignment • 2026 Batch</span>
              </div>
            </div>

            {/* 2. RIGHT SIDE: Note Details & Actions */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-bold font-mono uppercase bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 px-2.5 py-0.5 rounded-full">
                    {productDetails?.category?.toUpperCase() || "CORE CS"}
                  </span>
                  <span className="text-xs font-mono text-gray-400">
                    Subject: {productDetails?.brand || "Computer Science"}
                  </span>
                </div>

                <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1C] dark:text-white leading-tight">
                  {productDetails?.title}
                </DialogTitle>

                <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {productDetails?.description ||
                    "Comprehensive lecture notes covering key theoretical principles, solved algorithm examples, and semester exam questions."}
                </p>

                {/* Feature Bullets */}
                <div className="mt-6 p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#1C1C1C] border border-gray-200 dark:border-gray-800 space-y-2.5 text-xs text-gray-700 dark:text-gray-300 font-medium">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Includes handwritten diagrams & algorithm traces</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Gemini AI Q&A ready — ask doubts to this note</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>Free offline study download (Zero paywalls)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <Button
                  onClick={() => {
                    handleAddToCart(productDetails?._id);
                    handleDialogClose();
                  }}
                  className="w-full py-3.5 bg-[#1C1C1C] dark:bg-white text-white dark:text-[#111111] hover:bg-black dark:hover:bg-gray-200 font-bold text-sm rounded-xl border-2 border-gray-900 dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <BookmarkCheck className="w-4 h-4" />
                  Save to My Study Queue
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center text-gray-400">Loading note...</div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;