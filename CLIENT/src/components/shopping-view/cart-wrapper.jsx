import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./cart-items-content.jsx";
import { useNavigate } from "react-router-dom";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  // 🧮 Live Calculation: Total cart amount using .reduce()
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce((sum, currentItem) => {
          const itemPrice =
            currentItem?.productId?.salePrice > 0
              ? currentItem?.productId?.salePrice
              : currentItem?.productId?.price;

          return sum + itemPrice * currentItem?.quantity;
        }, 0)
      : 0;

  return (
    <SheetContent className="sm:max-w-md w-full flex flex-col justify-between h-full">
      {/* 1. Header */}
      <div>
        <SheetHeader>
          <SheetTitle className="font-extrabold text-xl">Your Cart</SheetTitle>
        </SheetHeader>

        {/* 2. Scrollable Cart Items List */}
        <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <UserCartItemsContent
                key={item?.productId?._id}
                cartItem={item}
              />
            ))
          ) : (
            <div className="text-center py-12 text-gray-500 font-medium">
              Your cart is empty. Start shopping!
            </div>
          )}
        </div>
      </div>

      {/* 3. Subtotal & Checkout Button */}
      <div className="border-t pt-4 space-y-4">
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total</span>
          <span>${totalCartAmount.toFixed(2)}</span>
        </div>

        <Button
          disabled={!cartItems || cartItems.length === 0}
          onClick={() => {
            navigate("/shop/checkout");
            setOpenCartSheet(false);
          }}
          className="w-full text-base font-bold py-6 cursor-pointer"
        >
          Proceed to Checkout
        </Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;