import Wishlist from "../model/wishlist.js";
import CustomError from "../utils/customError.js"

export const addToWishlist=async(req,res,next)=>{
    const { userId, productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
        wishlist = new Wishlist({ user: userId, products: [productId] });
    } else {
        if (!wishlist.products.includes(productId)) {
            wishlist.products.push(productId);
        } else {
            return next(new CustomError("product already in the wishlist",400))
        }
    }

    await wishlist.save();
    res.status(200).json({ message: 'Product added to wishlist', data:wishlist ,error:false});
}

export const getWishlist=async(req,res,next)=>{
    
    const wishlist = await Wishlist.find({ user: req.params.id }).populate("products")
    res.status(200).json({
        message:"wishlist of the user",
        data:wishlist,
        error:false
    })
}

export const removeFromWishlist=async(req,res,next)=>{
    const { productId ,userId} = req.body;

    if (!productId) {
        return next(CustomError("productId is required", 400));
    }

    const updatedWishlist = await Wishlist.findOneAndUpdate(
        { user: userId },
        { $pull: { products: productId } },
        { new: true }
    ).populate('products');

    if (!updatedWishlist) {
        return next(CustomError("Wishlist not found", 404));
    }

    res.status(200).json({
        status: "success",
        message: "Product removed from wishlist",
        wishlist: updatedWishlist
    });
}