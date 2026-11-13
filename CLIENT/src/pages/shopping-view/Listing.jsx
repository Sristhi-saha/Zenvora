import React, { useEffect } from 'react';
import ProductFilter from '../../components/shopping-view/filter';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingProductTile from '@/components/shopping-view/product-tile';
import { fetchAllFilterProducts } from '../../store/shop/product-slice';
import { addToCart, fetchCartItems } from '../../store/shop/cart-slice';
import { toast } from 'sonner';

const Listing = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllFilterProducts());
  }, [dispatch]);

  console.log(productList)

  // Handler for adding a product to cart
  function handleAddToCart(getCurrentProductId) {
    if (!user?.id) {
      toast.error("Please login to add items to cart!");
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
        toast.success("Product added to cart!");
      } else {
        toast.error("Failed to add product to cart");
      }
    });
  }

  // Handler for opening product details dialog (stub for now)
  function handleGetProductDetails(getCurrentProductId) {
    console.log("Product clicked:", getCurrentProductId);
    // We will build the product details modal in the next step!
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-8">
      {/* LEFT COLUMN: Filters */}
      <ProductFilter />

      {/* RIGHT COLUMN: Sort Bar + Products Grid */}
      <div className="bg-background w-full rounded-lg p-4 shadow-sm">
        {/* Header with Sort */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center space-x-2">
            <label htmlFor="sort" className="text-sm font-medium">
              Sort by:
            </label>
            <select
              id="sort"
              name="sort"
              className="border border-gray-300 rounded-md p-1 text-sm bg-white cursor-pointer"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0 ? (
            productList.map((productItem) => (
              <ShoppingProductTile
                key={productItem?._id}
                product={productItem}
                handleAddToCart={handleAddToCart}
                handleGetProductDetails={handleGetProductDetails}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500 font-medium">
              No products found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listing;