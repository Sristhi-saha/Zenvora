import React, { useState, useEffect } from "react";
import { BookOpen, Menu, ShoppingCart, LogOut, UserCheck, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { menuItemShoppingView } from "@/config";
import { logoutUserAction } from "@/store/auth-slice";
import { fetchCartItems } from "@/store/shop/cart-slice";
import UserCartWrapper from "./cart-wrapper";
import { useTheme } from "next-themes";
import { Bookmark } from "lucide-react";

// 1. Navigation Menu Links
function MenuItems({ setOpen }) {
  return (
    <nav className="flex flex-col gap-6 lg:flex-row lg:items-center">
      {menuItemShoppingView.map((menuitem) => (
        <Link
          key={menuitem.id}
          to={menuitem.path}
          onClick={() => {
            if (setOpen) setOpen(false);
          }}
          className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-[#1C1C1C] dark:hover:text-white transition-colors cursor-pointer"
        >
          {menuitem.label}
        </Link>
      ))}
    </nav>
  );
}

// 2. Mobile Profile Section
function MobileProfilePart({ setOpen }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUserAction());
    if (setOpen) setOpen(false);
  }

  function handleNavigate(path) {
    navigate(path);
    if (setOpen) setOpen(false);
  }

  if (!isAuthenticated) {
    return (
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <Link to="/auth/login" onClick={() => setOpen && setOpen(false)} className="w-full">
          <Button className="w-full bg-[#1C1C1C] hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white rounded-xl font-bold">
            Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#1E1E1E] border-2 border-gray-900 dark:border-gray-700 text-[#1C1C1C] dark:text-white flex items-center justify-center font-bold text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
          {(user?.userName || user?.username || "U")[0].toUpperCase()}
        </div>
        <div>
          <p className="font-bold text-sm text-[#1C1C1C] dark:text-white">
            {user?.userName || user?.username || "User"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 rounded-xl border-gray-300 dark:border-gray-700 font-semibold dark:bg-[#1E1E1E] dark:text-white"
          onClick={() => handleNavigate("/account")}
        >
          <UserCheck className="w-4 h-4" />
          My Saved Library
        </Button>

        <Button
          variant="destructive"
          className="w-full justify-start gap-2 rounded-xl font-semibold"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}

// 3. Right Side Content (Theme Toggle + Cart / Queue & Profile)
function HeaderRightContent() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartproductList } = useSelector(
    (state) => state.shopCart || state.cartProducts || {}
  );
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleLogout() {
    dispatch(logoutUserAction());
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user?.id));
    }
  }, [dispatch, user?.id]);

  return (
    <div className="flex items-center gap-2.5">
      {/* ☀️/🌙 Dark Mode Toggle Button */}
      {mounted && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-xl cursor-pointer bg-white dark:bg-[#1A1A1A] border-gray-300 dark:border-gray-700 text-[#1C1C1C] dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-sm transition-colors"
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4 text-amber-400" />
          ) : (
            <Moon className="h-4 w-4 text-gray-700" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      )}

      {/* 🔖 Study Queue / Cart Sheet Trigger */}
      {/* <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1A1A] hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer shadow-sm"
        >
          <Bookmark className="w-4 h-4 text-[#1C1C1C] dark:text-gray-200" />
          {cartproductList && cartproductList.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#22C55E] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartproductList.length}
            </span>
          )}
          <span className="sr-only">Study queue</span>
        </Button>

        <UserCartWrapper
          cartItems={cartproductList}
          setOpenCartSheet={setOpenCartSheet}
        />
      </Sheet> */}

      {/* User Avatar with Dropdown */}
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl cursor-pointer bg-white dark:bg-[#1A1A1A] border-2 border-gray-900 dark:border-gray-600 text-[#1C1C1C] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]"
            >
              {(user?.userName || user?.username || "U")[0].toUpperCase()}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="right" className="w-56 rounded-2xl p-2 border-gray-200 dark:border-gray-800 shadow-lg bg-white dark:bg-[#1E1E1E]">
            <DropdownMenuLabel className="font-medium text-xs text-gray-500 dark:text-gray-400">
              Signed in as <span className="font-bold text-gray-900 dark:text-white block text-sm mt-0.5">{user?.userName || user?.username}</span>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="dark:bg-gray-800" />

            <DropdownMenuItem
              onClick={() => navigate("/account")}
              className="cursor-pointer font-medium rounded-lg text-sm dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <UserCheck className="mr-2 h-4 w-4" />
              My Saved Library
            </DropdownMenuItem>

            <DropdownMenuSeparator className="dark:bg-gray-800" />

            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer font-medium rounded-lg text-sm text-red-600 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-950/40">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/auth/login">
          <Button className="m-2 bg-[#1C1C1C] hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white text-xs font-bold rounded-xl px-4 py-2 h-9 border border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
            Login
          </Button>
        </Link>
      )}
    </div>
  );
}

// 4. Main Header
function ShoppingViewHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200/80 dark:border-gray-800 bg-[#FAF8F5]/90 dark:bg-[#111111]/90 backdrop-blur supports-[backdrop-filter]:bg-[#FAF8F5]/80 dark:supports-[backdrop-filter]:bg-[#000000]/96 transition-colors">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
        {/* Left: Brand Logo with 100% Free pill */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#1A1A1A] border-2 border-gray-900 dark:border-gray-700 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
            <BookOpen className="h-4 w-4 text-[#1C1C1C] dark:text-white" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-[#1C1C1C] dark:text-white">
            Zenvora
          </span>
          <span className="text-[9px] font-bold font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 px-1.5 py-0.5 rounded-full ml-0.5">
            FREE
          </span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <HeaderRightContent />

          {/* Mobile Navigation Drawer Trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden rounded-xl border-gray-300 dark:border-gray-700 dark:bg-[#1A1A1A]">
                <Menu className="h-5 w-5 dark:text-white" />
                <span className="sr-only">Toggle header menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-full max-w-xs flex flex-col justify-between py-6 bg-[#FAF8F5] dark:bg-[#111111] dark:border-gray-800">
              <div>
                <SheetHeader>
                  <SheetTitle className="text-left font-extrabold text-lg flex items-center gap-2 text-[#1C1C1C] dark:text-white">
                    <div className="w-7 h-7 rounded-lg bg-white dark:bg-[#1A1A1A] border-2 border-gray-900 dark:border-gray-700 flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    Zenvora
                  </SheetTitle>
                </SheetHeader>

                <div className="m-8">
                  <MenuItems setOpen={setOpen} />
                </div>
              </div>

              <MobileProfilePart setOpen={setOpen} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default ShoppingViewHeader;
