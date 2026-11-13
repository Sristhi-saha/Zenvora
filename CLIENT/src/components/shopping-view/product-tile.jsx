import React from "react";
import { Button } from "../ui/button"; // using your standard UI button
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter } from "../ui/card";

function ShoppingProductTile({ 
  product, 
  handleAddToCart, 
  handleGetProductDetails 
}) {
  return (
    <Card className="w-full max-w-sm mx-auto shadow-sm hover:shadow-md transition-shadow">
      <div onClick={() => handleGetProductDetails?.(product?._id)} className="cursor-pointer">
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.salePrice > 0 && (
            <Badge className="absolute top-2 right-2 bg-red-500 text-white hover:bg-red-600">
              Sale
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="text-lg font-bold truncate">{product?.title}</h3>
          
          <div className="flex justify-between items-center my-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through text-gray-400 text-sm" : "text-lg font-semibold text-primary"
              }`}
            >
              ${product?.price?.toFixed(2)}
            </span>

            {product?.salePrice > 0 && (
              <span className="text-lg font-semibold text-red-600">
                ${product?.salePrice?.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-xs text-gray-500 line-clamp-2">
            {product?.description}
          </p>
        </CardContent>
      </div>

      <CardFooter className="p-4 pt-0">
        {product?.totalStock === 0 ? (
          <Button disabled className="w-full opacity-60 cursor-not-allowed">
            Out of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddToCart(product?._id)}
            className="w-full"
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;