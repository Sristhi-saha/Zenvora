import React, { useEffect, useState } from "react";
import ProductFilter from "../../components/shopping-view/filter";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import {
  fetchAllFilterProducts,
  fetchProductDetails,
} from "../../store/shop/product-slice";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  BookOpen,
  Filter,
  Search,
  ArrowUpDown,
  RotateCcw,
  Code2,
  Cpu,
  Database,
  Network,
  Layers,
  BrainCircuit,
} from "lucide-react";

// Quick-filter Subject Pills
const quickCategories = [
  { id: "all", label: "All Subjects", icon: BookOpen },
  { id: "dsa", label: "DSA & LeetCode", icon: Code2 },
  { id: "os", label: "Operating Systems", icon: Cpu },
  { id: "dbms", label: "DBMS & SQL", icon: Database },
  { id: "cn", label: "Computer Networks", icon: Network },
  { id: "system-design", label: "System Design", icon: Layers },
  { id: "aiml", label: "AI & ML", icon: BrainCircuit },
];

const Listing = () => {
  const dispatch = useDispatch();
  const { productList, productDetails, isloading } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState(() => {
    return JSON.parse(sessionStorage.getItem("filters")) || {};
  });
  const [sort, setSort] = useState("newest");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  // 1. Fetch notes whenever filters or sort changes
  useEffect(() => {
    dispatch(
      fetchAllFilterProducts({
        filterParams: filters,
        sortParams: sort,
      })
    );
  }, [dispatch, filters, sort]);

  // 2. Open dialog when details arrive
  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  // 3. Handle filter toggles
  function handleFilter(getSectionId, getCurrentOption) {
    let copyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(copyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        copyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1) {
        copyFilters[getSectionId].push(getCurrentOption);
      } else {
        copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }

    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  }

  // 4. Quick category pill click
  function handleQuickCategory(categoryId) {
    if (categoryId === "all") {
      setFilters({});
      sessionStorage.removeItem("filters");
    } else {
      const newFilter = { category: [categoryId] };
      setFilters(newFilter);
      sessionStorage.setItem("filters", JSON.stringify(newFilter));
    }
  }

  // 5. Reset all filters
  function handleResetFilters() {
    setFilters({});
    sessionStorage.removeItem("filters");
    toast.info("Filters cleared");
  }

  // 6. Add note to Study Queue
  function handleAddToCart(getCurrentProductId) {
    if (!user?.id) {
      toast.error("Please login to save notes to your library!");
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

  // 7. Open details modal
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  const activeCategory =
    filters?.category && filters.category.length === 1
      ? filters.category[0]
      : filters?.category?.length > 1
      ? "multiple"
      : "all";

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] dark:bg-[#0C0C0C] text-[#1C1C1C] dark:text-[#F3F4F6] transition-colors pb-16">
      {/* 1. HERO BANNER */}
      <section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 border-b border-gray-200/80 dark:border-gray-800">
        <div className="max-w-7xl mx-auto text-center sm:text-left space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-wide bg-emerald-100/60 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OPEN ACADEMIC CS REPOSITORY</span>
          </div>

          {/* <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1C1C1C] dark:text-white leading-[1.2]">
            Explore Verified{" "}
            <span className="relative inline-block border-2 border-[#22C55E] text-[#16A34A] dark:text-[#4ADE80] px-3 py-0.5 rounded-sm font-mono mx-1 bg-green-50/60 dark:bg-green-950/40">
              <span className="absolute -top-1.5 -left-1.5 w-2 h-2 bg-[#22C55E] rounded-full ring-2 ring-[#FAF8F5] dark:ring-[#0C0C0C]" />
              Computer Science
              <span className="absolute -bottom-1.5 -right-1.5 w-2 h-2 bg-[#22C55E] rounded-full ring-2 ring-[#FAF8F5] dark:ring-[#0C0C0C]" />
            </span>{" "}
            Notes
          </h1> */}

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl">
            Topper-curated lecture notes, algorithm cheat sheets, and solved semester questions — 100% free and open-access.
          </p>

          {/* Quick Subject Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 no-scrollbar">
            {quickCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleQuickCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-[#1C1C1C] dark:bg-white text-white dark:text-[#111111] border-2 border-gray-900 dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]"
                      : "bg-white dark:bg-[#141414] text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT (Filters + Notes Grid) */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
          
          {/* LEFT SIDE: Filter Card */}
          <aside className="sticky top-20">
            <ProductFilter
              filters={filters}
              handleFilter={handleFilter}
              handleResetFilters={handleResetFilters}
            />
          </aside>

          {/* RIGHT SIDE: Catalog Content */}
          <main className="space-y-6">
            {/* Top Toolbar: Count + Sort */}
            <div className="bg-white dark:bg-[#141414] border-2 border-gray-900 dark:border-gray-700 rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.1)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-gray-500 dark:text-gray-400">
                  Showing:
                </span>
                <span className="text-xs font-bold font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                  {productList?.length || 0} VERIFIED NOTES
                </span>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <label
                  htmlFor="sort"
                  className="text-xs font-mono uppercase font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1"
                >
                  <ArrowUpDown className="w-3 h-3" />
                  Sort:
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="border-2 border-gray-900 dark:border-gray-700 rounded-xl px-3 py-1.5 text-xs font-bold bg-[#FAF8F5] dark:bg-[#1E1E1E] text-gray-900 dark:text-gray-100 cursor-pointer outline-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-colors"
                >
                  <option value="newest">Newest Uploads</option>
                  <option value="title-atoz">Subject: A to Z</option>
                  <option value="title-ztoa">Subject: Z to A</option>
                </select>
              </div>
            </div>

            {/* Notes Grid */}
            {isloading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    className="h-80 rounded-3xl bg-gray-200 dark:bg-gray-800 animate-pulse border-2 border-gray-300 dark:border-gray-700"
                  />
                ))}
              </div>
            ) : productList && productList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {productList.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem?._id}
                    product={productItem}
                    handleAddToCart={handleAddToCart}
                    handleGetProductDetails={handleGetProductDetails}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white dark:bg-[#141414] border-2 border-dashed border-gray-300 dark:border-gray-800 rounded-3xl p-16 text-center space-y-4 my-8">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-400 flex items-center justify-center mx-auto">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="font-extrabold text-lg text-gray-900 dark:text-white">
                  No notes match your filters
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                  Try unchecking some subject filters or resetting all filters to see more notes.
                </p>
                <Button
                  onClick={handleResetFilters}
                  className="bg-[#1C1C1C] dark:bg-white text-white dark:text-[#111111] font-bold text-xs rounded-xl px-4 py-2 border-2 border-gray-900 dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </section>

      {/* Note Details Modal */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Listing;
