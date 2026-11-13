import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { fetchAllFilterProducts } from "@/store/shop/product-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import {
  Code2,
  Cpu,
  Database,
  Network,
  Layers,
  BrainCircuit,
  ArrowRight,
  Sparkles,
  FileText,
  Bot,
  Terminal,
  BookOpen,
  GraduationCap,
} from "lucide-react";

// 💻 Core Computer Science Categories
const csCategories = [
  { id: "dsa", label: "DSA & LeetCode", icon: Code2, color: "text-blue-500", bg: "bg-blue-50" },
  { id: "os", label: "Operating Systems", icon: Cpu, color: "text-amber-500", bg: "bg-amber-50" },
  { id: "dbms", label: "DBMS & SQL", icon: Database, color: "text-emerald-500", bg: "bg-emerald-50" },
  { id: "cn", label: "Computer Networks", icon: Network, color: "text-purple-500", bg: "bg-purple-50" },
  { id: "system-design", label: "System Design", icon: Layers, color: "text-rose-500", bg: "bg-rose-50" },
  { id: "aiml", label: "AI & Machine Learning", icon: BrainCircuit, color: "text-indigo-500", bg: "bg-indigo-50" },
];

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllFilterProducts());
  }, [dispatch]);

  // Navigate to listing and apply category filter
  function handleNavigateToListingPage(categoryId) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      category: [categoryId],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  // Handle Add to Study List
  function handleAddToCart(getCurrentProductId) {
    if (!user?.id) {
      toast.error("Please login to save notes!");
      return;
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Note saved to your study queue!");
      } else {
        toast.error("Failed to save note");
      }
    });
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1C1C]">
      {/* 1. HERO SECTION */}
      <section className="pt-20 pb-10 px-4 text-center max-w-5xl mx-auto flex flex-col items-center">
        {/* Main Headline with Green Selection Box */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1C1C1C] leading-[1.15] max-w-4xl">
          Master{" "}
          <span className="relative inline-block border-2 border-[#22C55E] text-[#16A34A] px-3 sm:px-4 py-0.5 rounded-sm font-mono mx-1 sm:mx-2 bg-green-50/40">
            {/* Top-Left Anchor Dot */}
            <span className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-[#22C55E] rounded-full ring-2 ring-[#FAF8F5]" />
            computer science
            {/* Bottom-Right Anchor Dot */}
            <span className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-[#22C55E] rounded-full ring-2 ring-[#FAF8F5]" />
          </span>
          <br />
          notes with AI.
        </h1>

        <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Zenvora gives you 100% free access to topper-curated notes for DSA, Operating Systems, DBMS & Networks — with Google Gemini AI to explain difficult concepts instantly.
        </p>

        {/* Floating Micro-Pill Feature Bar */}
        <div className="mt-8 bg-white border border-gray-200/80 rounded-full px-3 sm:px-5 py-2 shadow-sm flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-gray-700">
          <div className="flex items-center gap-1.5 font-medium">
            <Code2 className="w-3.5 h-3.5 text-blue-500" />
            <span>Core CS Notes</span>
          </div>

          <div className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block" />

          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Gemini AI Q&A</span>
          </div>

          <div className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block" />

          <div className="flex items-center gap-1.5 font-medium">
            <FileText className="w-3.5 h-3.5 text-emerald-500" />
            <span>100% Free & Open</span>
          </div>

          <Button
            size="sm"
            onClick={() => navigate("/shop/listing")}
            className="bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-full text-xs font-semibold px-4 py-1 h-7 cursor-pointer shadow-none"
          >
            Explore Notes
            <ArrowRight className="ml-1 w-3 h-3" />
          </Button>
        </div>

        {/* 2. THE 3 SKETCH / VALUE CARDS */}
        <div className="mt-14 w-full grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Card 1: Verified Notes */}
          <div className="bg-white border-2 border-gray-900 rounded-3xl p-6 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between items-center min-h-[300px]">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                VERIFIED STUDY MATERIAL
              </p>
              <h3 className="font-extrabold text-lg mt-1 text-gray-900">
                Curated notes for <br /> DSA & Core CS
              </h3>
            </div>

            <div className="my-6 w-36 h-36 flex items-center justify-center bg-blue-50 rounded-2xl border border-blue-100">
              <BookOpen className="w-14 h-14 text-blue-600 stroke-[1.25]" />
            </div>

            <span className="text-xs text-gray-500 font-medium">
              Comprehensive semester syllabus
            </span>
          </div>

          {/* Card 2: AI Assistant (Main / Elevated) */}
          <div className="bg-white border-2 border-gray-900 rounded-3xl p-6 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between items-center min-h-[300px] md:-translate-y-2">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 font-mono">
                GOOGLE GEMINI 1.5 FLASH
              </p>
              <h3 className="font-extrabold text-lg mt-1 text-gray-900">
                Chat with any note <br /> to explain concepts
              </h3>
            </div>

            <div className="my-6 w-36 h-36 flex items-center justify-center bg-emerald-50 rounded-2xl border border-emerald-100">
              <Bot className="w-14 h-14 text-emerald-600 stroke-[1.25]" />
            </div>

            <span className="text-xs text-emerald-600 font-medium font-mono">
              Ask doubts directly to the PDF
            </span>
          </div>

          {/* Card 3: Exam & Interview Prep */}
          <div className="bg-white border-2 border-gray-900 rounded-3xl p-6 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between items-center min-h-[300px]">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                EXAM & PLACEMENTS
              </p>
              <h3 className="font-extrabold text-lg mt-1 text-gray-900">
                Instant cheat sheets <br /> & practice quizzes
              </h3>
            </div>

            <div className="my-6 w-36 h-36 flex items-center justify-center bg-purple-50 rounded-2xl border border-purple-100">
              <Terminal className="w-14 h-14 text-purple-600 stroke-[1.25]" />
            </div>

            <span className="text-xs text-gray-500 font-medium">
              Prep for GATE, exams & coding
            </span>
          </div>
        </div>
      </section>

      {/* 3. BROWSE CORE CS SUBJECTS */}
      <section className="py-14 px-4 bg-white border-t border-gray-200">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1C]">
              Browse Core CS Subjects
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              Free notes curated by toppers for semester exams and technical interviews
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {csCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={() => handleNavigateToListingPage(cat.id)}
                  className="cursor-pointer bg-[#FAF8F5] border border-gray-200 hover:border-gray-900 rounded-2xl p-4 text-center flex flex-col items-center justify-center gap-2 transition-all hover:-translate-y-1"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.bg} ${cat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-xs text-gray-900 leading-tight">
                    {cat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FEATURED FREE CS NOTES */}
      <section className="py-14 px-4 bg-[#FAF8F5] border-t border-gray-200">
        <div className="container mx-auto max-w-5xl">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1C]">
                Popular Study Notes
              </h2>
              <p className="text-gray-500 mt-1 text-sm">
                Most saved by students this week
              </p>
            </div>
            <Button
              variant="ghost"
              className="font-semibold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 cursor-pointer"
              onClick={() => navigate("/shop/listing")}
            >
              Explore all
              <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0 ? (
              productList.slice(0, 4).map((productItem) => (
                <ShoppingProductTile
                  key={productItem?._id}
                  product={productItem}
                  handleAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-400">
                No notes found yet. Check back soon!
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;