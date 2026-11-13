import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateCartQuantity, deleteCartItem } from "@/store/shop/cart-slice";
import { toast } from "sonner";

function UserCartItemsContent({ cartItem }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Helper to get active price (salePrice vs regular price)
  const productPrice =
    cartItem?.productId?.salePrice > 0
      ? cartItem?.productId?.salePrice
      : cartItem?.productId?.price;

  // 1. Handle Updating Quantity (+ or -)
  function handleUpdateQuantity(actionType) {
    if (actionType === "plus") {
      // 🛡️ Stock Guard: Don't allow quantity beyond totalStock
      if (cartItem?.quantity + 1 > cartItem?.productId?.totalStock) {
        toast.error(`Only ${cartItem?.productId?.totalStock} items in stock!`);
        return;
      }

      dispatch(
        updateCartQuantity({
          userId: user?.id,
          productId: cartItem?.productId?._id,
          quantity: cartItem?.quantity + 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          toast.success("Cart item updated!");
        }
      });
    } else if (actionType === "minus") {
      if (cartItem?.quantity === 1) return; // don't go below 1 (use trash to delete)

      dispatch(
        updateCartQuantity({
          userId: user?.id,
          productId: cartItem?.productId?._id,
          quantity: cartItem?.quantity - 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          toast.success("Cart item updated!");
        }
      });
    }
  }

  // 2. Handle Deleting Item
  function handleDeleteCartItem() {
    dispatch(
      deleteCartItem({
        userId: user?.id,
        productId: cartItem?.productId?._id,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Item removed from cart!");
      }
    });
  }

  return (
    <div className="flex items-center space-x-4 py-3 border-b border-gray-100">
      {/* Product Image */}
      <img
        src={cartItem?.productId?.image}
        alt={cartItem?.productId?.title}
        className="w-20 h-20 rounded object-cover border"
      />

      {/* Details & Controls */}
      <div className="flex-1">
        <h3 className="font-bold text-sm truncate max-w-[180px]">
          {cartItem?.productId?.title}
        </h3>

        <div className="flex items-center gap-2 mt-2">
          {/* Minus Button */}
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded-full"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity("minus")}
          >
            <Minus className="w-3 h-3" />
            <span className="sr-only">Decrease</span>
          </Button>

          {/* Quantity */}
          <span className="font-semibold text-sm px-1">
            {cartItem?.quantity}
          </span>

          {/* Plus Button */}
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded-full"
            onClick={() => handleUpdateQuantity("plus")}
          >
            <Plus className="w-3 h-3" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>

      {/* Price & Delete */}
      <div className="flex flex-col items-end gap-2">
        <p className="font-bold text-sm">
          ${(productPrice * cartItem?.quantity).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-700 h-7 w-7"
          onClick={handleDeleteCartItem}
        >
          <Trash2 className="w-4 h-4 cursor-pointer" />
        </Button>
      </div>
    </div>
  );
}

export default UserCartItemsContent;