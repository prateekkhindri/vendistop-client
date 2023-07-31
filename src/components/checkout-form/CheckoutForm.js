import React, { useEffect } from "react";
import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { createOrderAction } from "../../pages/orders/orderAction";
import { useNavigate } from "react-router-dom";
import { clearCartAction } from "../../pages/Cart/cartAction";

export const CheckoutForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart, shippingPrice } = useSelector((state) => state.cartStore);
  const { user } = useSelector((state) => state.adminUser);

  useEffect(() => {
    if (user) {
      setName(user.fName + " " + user.lName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
    }
  }, [user]);

  // calculate total cost
  const totalPrice = cart.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );

  const orderItems = cart.map((item) => {
    return {
      name: item.product.name,
      qty: item.quantity,
      image: item.product.image,
      price: item.product.price,
      product: item.product._id,
    };
  });

  const handleSuccess = (newOrder) => {
    Swal.fire({
      icon: "success",
      title: "Your payment was successful",
      timer: 4000,
      allowOutsideClick: false,
    }).then(() => {
      navigate(`/order/${newOrder._id}`, {
        state: { paymentSuccess: true },
      });
    });
  };
  const handleFail = () => {
    Swal.fire({
      icon: "error",
      title: "Something went wrong. Payment was not successful",
      timer: 4000,
      allowOutsideClick: false,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (phone.trim() === "" || address.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in your phone number and address",
      });
      return;
    }

    try {
      const result = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/payment/create-payment-intent`,
        method: "POST",
        data: {
          amount: totalPrice * 100,
          currency: "aud",
          paymentMethodType: "card",
        },
      });

      const { clientSecret } = result.data;
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name,
            email,
          },
        },
      });

      if (paymentIntent.status === "succeeded") {
        // Prepare the data for the new order
        const orderData = {
          user: user._id,
          orderItems,
          paymentMethod: "card",
          paymentResult: {
            id: paymentIntent.id,
            status: paymentIntent.status,
            update_time: paymentIntent.created,
            email_address: email,
          },
          totalPrice,
          customerDetails: {
            name,
            email,
            phone,
            address,
          },

          shippingPrice,
        };

        const newOrder = await dispatch(createOrderAction(orderData));

        await dispatch(clearCartAction());

        handleSuccess(newOrder);
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
      }
    } catch (error) {
      handleFail();
      console.log(error);
    }
  };

  const items = cart.map((item) => (
    <li
      key={item._id}
      className="flex items-center justify-between border-b py-2 text-[#696969]"
    >
      <img
        src={item.product.image}
        alt=""
        className="w-8 h-8 mr-2 rounded-full"
      />
      <span className="font-semibold">{item.product.name}</span>
      <span>
        {item.quantity} x ${item.product.price}
      </span>
    </li>
  ));

  return (
    <div className="bg-[#FDF9FF] min-h-screen max-w-screen-xl px-3 mx-auto">
      <div className="py-8 flex items-center justify-between px-4">
        <h1 className="text-[#2c3c3c] text-xl font-semibold">Checkout</h1>
      </div>

      <div className="mb-6 p-4 bg-[#FAFAFA] rounded shadow">
        <h2 className="font-bold text-lg mb-4">Your Cart:</h2>
        <ul className="space-y-2">{items}</ul>

        <p className="border-t mt-4 pt-4 flex justify-between">
          <span>Shipping:</span>
          <span>${shippingPrice.toFixed(2)}</span>
        </p>

        <p className="border-t mt-4 pt-4 flex justify-between font-semibold">
          <span>Total:</span>
          <span>${(totalPrice + shippingPrice).toFixed(2)}</span>
        </p>
      </div>

      <form
        onSubmit={handleOnSubmit}
        className="w-full p-2 bg-white border-2 rounded-lg border-[#EBEBEB]"
      >
        <div className="px-3 py-4">
          <div className="flex flex-col mb-4">
            <label className="text-[#696969] text-sm mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-[#EBEBEB] rounded-lg p-2 focus:outline-none focus:border-[#4C00B0]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#696969] text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#EBEBEB] rounded-lg p-2 focus:outline-none focus:border-[#4C00B0]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#696969] text-sm mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={phone}
              placeholder="phone"
              onChange={(e) => setPhone(e.target.value)}
              required
              className="border border-[#EBEBEB] rounded-lg p-2 focus:outline-none focus:border-[#4C00B0]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#696969] text-sm mb-2">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="border border-[#EBEBEB] rounded-lg p-2 focus:outline-none focus:border-[#4C00B0]"
            />
          </div>
        </div>
        <div className="px-3 py-4 border-t">
          <div className="my-4">
            <CardElement
              options={{ hidePostalCode: true }}
              className="p-2 border border-[#EBEBEB] rounded-lg"
            />
          </div>
          <button
            type="submit"
            disabled={!stripe}
            style={{ marginTop: "2rem", width: "100%" }}
            className="bg-[#4C00B0] text-white md:px-10 mx-2 md:py-4 text-center rounded-3xl font-medium text-xs py-3 w-full md:text-lg hover:opacity-75"
          >
            PAY NOW
          </button>
        </div>
      </form>
    </div>
  );
};
