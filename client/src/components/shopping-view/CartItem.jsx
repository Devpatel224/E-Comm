import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

function CartItem({ cartItem }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  function handleCartDelete(getCartItem) {
    console.log(user?.id, getCartItem.productId);
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Product Deleted successfully",
          variant: "success",
        });
      }
    });
  }

  function handleUpdateQuantity(getCartItem, operation) {
    console.log(getCartItem.quantity);

    if (operation === "plus") {
      dispatch(
        updateCartQuantity({
          userId: user?.id,
          productId: getCartItem.productId,
          quantity: getCartItem.quantity + 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Product quantity updated successfully",
            variant: "success",
          });
        } else {
          toast({
            title: data?.payload,
            variant: "destructive",
          });
        }
      });
    } else {
      dispatch(
        updateCartQuantity({
          userId: user?.id,
          productId: getCartItem.productId,
          quantity: getCartItem.quantity - 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Product quantity updated successfully",
            variant: "success",
          });
        } else {
          toast({
            title: data?.payload,
            variant: "destructive",
          });
        }
      });
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem.image}
        alt="cartItem"
        className="w-20 h-20 rounded-lg"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem.quantity === 1}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem.quantity}</span>
          <Button
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem.salePrice > 0 ? cartItem.salePrice : cartItem.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartDelete(cartItem)}
          className="cursor-pointer mt-1"
        ></Trash>
      </div>
    </div>
  );
}

export default CartItem;
