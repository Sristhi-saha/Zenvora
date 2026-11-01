import Cart from "../../models/Cart.models.js";
import Product from "../../models/Products.models.js";

// 1. ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided (userId, productId, and quantity required).",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    // 🛡️ Stock Guard: Is the product completely sold out?
    if (product.totalStock === 0) {
      return res.status(400).json({
        success: false,
        message: "This product is currently out of stock!",
      });
    }

    let cartExists = await Cart.findOne({ userId });

    if (!cartExists) {
      // Scenario A: Brand new cart
      if (quantity > product.totalStock) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.totalStock} items available in stock!`,
        });
      }

      cartExists = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      // Scenario B: User already has a cart
      const productIndex = cartExists.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex === -1) {
        if (quantity > product.totalStock) {
          return res.status(400).json({
            success: false,
            message: `Only ${product.totalStock} items available in stock!`,
          });
        }
        cartExists.items.push({ productId, quantity });
      } else {
        const currentQty = cartExists.items[productIndex].quantity;
        if (currentQty + quantity > product.totalStock) {
          return res.status(400).json({
            success: false,
            message: `You already have ${currentQty} in cart. Only ${product.totalStock} available in stock!`,
          });
        }
        cartExists.items[productIndex].quantity += quantity;
      }
    }

    await cartExists.save();

    // Populate product details so frontend gets latest title, price, image
    await cartExists.populate({
      path: "items.productId",
      select: "image title price salePrice totalStock",
    });

    return res.status(200).json({
      success: true,
      data: cartExists,
    });
  } catch (e) {
    console.error("Error in addToCart:", e);
    return res.status(500).json({
      success: false,
      message: "Error adding to cart",
    });
  }
};

// 2. FETCH CART ITEMS
export const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const carts = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice totalStock",
    });

    if (!carts) {
      return res.status(200).json({
        success: true,
        data: { items: [] },
      });
    }

    // Filter out ghost products (products deleted by admin from database)
    const validItems = carts.items.filter((item) => item.productId !== null);

    if (validItems.length < carts.items.length) {
      carts.items = validItems;
      await carts.save();
    }

    return res.status(200).json({
      success: true,
      data: carts,
    });
  } catch (e) {
    console.error("Error in fetchCartItems:", e);
    return res.status(500).json({
      success: false,
      message: "Cart fetching Error",
    });
  }
};

// 3. UPDATE CART ITEM QUANTITY
export const cartItemQuantity = async (req, res) => {
  try {
    const { productId, userId, quantity } = req.body;

    if (!productId || !userId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing or quantity is invalid",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    // 🛡️ Stock Guard: Ensure new quantity doesn't exceed stock
    if (quantity > product.totalStock) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.totalStock} items available in stock!`,
      });
    }

    const carts = await Cart.findOne({ userId });
    if (!carts) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const productIndex = carts.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not present in the cart",
      });
    }

    // Set the new exact quantity
    carts.items[productIndex].quantity = quantity;

    await carts.save();

    await carts.populate({
      path: "items.productId",
      select: "image title price salePrice totalStock",
    });

    return res.status(200).json({
      success: true,
      data: carts,
    });
  } catch (e) {
    console.error("Error in cartItemQuantity:", e);
    return res.status(500).json({
      success: false,
      message: "Error updating quantity",
    });
  }
};

// 4. DELETE CART ITEM
export const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const carts = await Cart.findOne({ userId });

    if (!carts) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Filter out the selected item
    carts.items = carts.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await carts.save();

    await carts.populate({
      path: "items.productId",
      select: "image title price salePrice totalStock",
    });

    return res.status(200).json({
      success: true,
      data: carts,
    });
  } catch (e) {
    console.error("Error in deleteCartItem:", e);
    return res.status(500).json({
      success: false,
      message: "Cart item delete failed",
    });
  }
};