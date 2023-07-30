import React, { useEffect, useState } from "react";
import { CartItem, Footer } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartAction } from "./cartAction";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [totalCost, setTotalCost] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  // Variable to track if the cart has been fetched or not
  const [isCartFetched, setIsCartFetched] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cartStore);

  const { shippingPrice } = useSelector((state) => state.cartStore);

  useEffect(() => {
    // Only fetch cart if it hasn't been fetched already
    if (!isCartFetched) {
      dispatch(fetchCartAction());
      setIsCartFetched(true); // Mark the cart as fetched
    }

    // update the total and subtotal cost whenever cart gets updated
    const newTotal = cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    const newSubTotal = newTotal + shippingPrice;
    setTotalCost(newTotal);
    setSubTotal(newSubTotal);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, isCartFetched, dispatch]);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <div className="bg-[#FDF9FF] min-h-screen">
        <section className="max-w-screen-xl px-3 mx-auto">
          <div className="cartlist-wrapper">
            <div className="flex items-center justify-between px-4 py-8">
              <h1 className="text-[#2c3c3c] text-xl font-semibold">
                Shopping Cart
              </h1>
            </div>

            {cart.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <label className="text-lg md:text-2xl text-[#ADADAD]">
                  Cart is empty
                </label>
              </div>
            ) : (
              <>
                <div className="items-container">
                  {cart.map((item) => {
                    return (
                      <CartItem
                        key={item._id}
                        _id={item.product._id}
                        amount={item.quantity}
                        image={item.product.image}
                        price={item.product.price}
                        title={item.product.name}
                      />
                    );
                  })}

                  {/* total amount container */}
                  <div className="w-full pb-10 mt-20 md:flex md:justify-end md:items-center">
                    <div className="md:w-[50%] lg:w-[40%] xl:w-[30%] w-full p-2 bg-white border-2 rounded-lg border-[#EBEBEB]">
                      <div className="px-3 py-4">
                        <div className="flex justify-between mb-4">
                          <p className="text-[#696969] text-sm">Total Price</p>
                          <span>{`$${parseFloat(totalCost).toFixed(2)}`}</span>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-[#696969] text-sm">Delivery</p>
                          <span>{`$${parseFloat(shippingPrice).toFixed(
                            2
                          )}`}</span>
                        </div>
                      </div>
                      <div className="flex justify-between px-3 py-4 border-t">
                        <p className="text-[#2C2C2C] text-bas font-bold">
                          Sub Total
                        </p>
                        <span className="text-[#4C00B0] text-xl font-semibold">
                          {`$${parseFloat(subTotal).toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex items-center justify-end w-full mt-2">
                        <button
                          className={`${
                            totalCost <= 0 ? "hidden" : "block"
                          } bg-[#4C00B0] text-white md:px-10 mx-2 md:py-4 text-center rounded-3xl font-medium text-xs py-3 w-full md:text-lg hover:opacity-75`}
                          onClick={handleCheckout}
                        >
                          Check Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
