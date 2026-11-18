import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, deleteCartItem } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/product-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  BookOpen,
  BookmarkCheck,
  Trash2,
  ExternalLink,
  GraduationCap,
  Sparkles,
  ArrowRight,
  FileText,
} from "lucide-react";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartproductList, isLoading } = useSelector(
    (state) => state.shopCart || state.cartProducts || {}
  );
  const { productDetails } = useSelector((state) => state.shopProducts);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  // 1. Fetch user's saved notes
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user?.id));
    }
  }, [dispatch, user?.id]);

  // 2. Open details dialog when productDetails arrives
  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  // 3. Remove note from library
  function handleRemoveFromLibrary(productId) {
    if (!user?.id || !productId) return;

    dispatch(deleteCartItem({ userId: user?.id, productId })).then((data) => {
      if (data?.payload?.success) {
        toast.success("Note removed from library");
      } else {
        toast.error("Failed to remove note");
      }
    });
  }

  // 4. Open Note in Study Reader & AI Copilot
  function handleOpenNote(productId) {
    navigate(`/study/${productId}`);
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] dark:bg-[#0C0C0C] text-[#1C1C1C] dark:text-[#F3F4F6] py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto w-full space-y-8">
        
        {/* 1. STUDENT PROFILE HEADER CARD */}
        <div className="bg-white dark:bg-[#141414] border-2 border-gray-900 dark:border-gray-700 rounded-3xl p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            {/* Avatar */}
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user?.userName || "User"}
                className="w-20 h-20 rounded-2xl border-2 border-gray-900 dark:border-gray-700 object-cover shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-[#FAF8F5] dark:bg-[#1E1E1E] border-2 border-gray-900 dark:border-gray-700 text-[#1C1C1C] dark:text-white flex items-center justify-center font-extrabold text-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {(user?.userName || user?.username || "U")[0].toUpperCase()}
              </div>
            )}

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  {user?.userName || user?.username || "Student"}
                </h1>
                <span className="text-[10px] font-mono font-bold uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 rounded-full">
                  VERIFIED STUDENT
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {user?.email}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-gray-600 dark:text-gray-400 font-medium">
                <span className="flex items-center gap-1">
                  <BookmarkCheck className="w-4 h-4 text-emerald-500" />
                  {cartproductList?.length || 0} Saved Notes
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-4 h-4 text-blue-500" />
                  100% Free Plan
                </span>
              </div>
            </div>
          </div>

          <Button
            onClick={() => navigate("/listing")}
            className="bg-[#1C1C1C] dark:bg-white text-white dark:text-[#111111] hover:bg-black dark:hover:bg-gray-200 text-xs font-bold rounded-xl px-4 py-2 border-2 border-gray-900 dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer flex items-center gap-1.5"
          >
            Explore More Notes
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* 2. SAVED NOTES SECTION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
                My Saved Study Queue
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Notes you have bookmarked for semester revision and exams
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-gray-500">
              {cartproductList?.length || 0} items
            </span>
          </div>

          {/* Grid of Saved Notes */}
          {cartproductList && cartproductList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {cartproductList.map((item) => {
                const note = item?.productId;
                if (!note) return null;

                return (
                  <div
                    key={note._id}
                    className="bg-white dark:bg-[#141414] border-2 border-gray-900 dark:border-gray-700 rounded-3xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] flex flex-col justify-between transition-all hover:-translate-y-1"
                  >
                    <div>
                      {/* Thumbnail & Category Badge */}
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1A1A] mb-4 flex items-center justify-center">
                        {note.image ? (
                          <img
                            src={note.image}
                            alt={note.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FileText className="w-12 h-12 text-gray-400" />
                        )}
                        <span className="absolute top-2.5 left-2.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-[9px] uppercase px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                          {note.category || "CS"}
                        </span>
                      </div>

                      {/* Note Title & Description */}
                      <h3 className="font-extrabold text-base text-gray-900 dark:text-white line-clamp-1">
                        {note.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                        {note.description || "Comprehensive syllabus notes."}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                      <Button
                        onClick={() => handleOpenNote(note._id)}
                        className="flex-1 bg-[#1C1C1C] dark:bg-white text-white dark:text-[#111111] hover:bg-black dark:hover:bg-gray-200 text-xs font-bold rounded-xl py-2 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        Open Note
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveFromLibrary(note._id)}
                        className="rounded-xl border-gray-300 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
                        title="Remove from Library"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Clean Empty State */
            <div className="bg-white dark:bg-[#141414] border-2 border-dashed border-gray-300 dark:border-gray-800 rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4 my-10">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-gray-900 dark:text-white">
                  Your Study Queue is Empty
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
                  Browse topper notes for DSA, OS, DBMS and Networks, and click "Save to Study Queue" to review them here!
                </p>
              </div>
              <Button
                onClick={() => navigate("/listing")}
                className="bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-xs rounded-xl px-5 py-2.5 shadow-sm cursor-pointer"
              >
                Browse All Notes
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Note Details Modal */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
        handleAddToCart={() => {}}
      />
    </div>
  );
};

export default Account;