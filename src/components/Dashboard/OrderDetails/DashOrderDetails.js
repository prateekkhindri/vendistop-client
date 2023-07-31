import React from "react";
import { useSelector } from "react-redux";

export const DashOrderDetails = ({ adminPage }) => {
  const { currentOrder } = useSelector((state) => state.orderStore);

  const isAdmin = useSelector((state) => state.adminUser.user.role) === "Admin";

  return (
    <div>
      <OrderIDCard currentOrder={currentOrder} adminPage={adminPage} />
      <OrderSummary currentOrder={currentOrder} />
      <DeliveryTo currentOrder={currentOrder} />
      <AddedItemsDetails currentOrder={currentOrder} />
      <OrderPriceCard currentOrder={currentOrder} />
    </div>
  );
};

// Order id card component
const OrderIDCard = ({ currentOrder, adminPage }) => {
  const date = new Date(currentOrder.createdAt);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate = new Intl.DateTimeFormat("en-AU", options).format(date);

  const capitalize = function (string) {
    return string
      .split(/_| /)
      .map((part) => part[0]?.toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div className="">
          <h3 className="text-[#2c2c2c] text-sm md:text-xl">
            Order ID: <span>{currentOrder._id}</span>
          </h3>
          <div className="text-[#ADADAD] text-[10px] md:text-sm">
            <span>Order Created: {formattedDate}</span>
          </div>
        </div>
        <div className="delivery-status">
          {adminPage ? (
            <button className="bg-custom-purple hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              <span className="text-xs md:text-sm text-right text-[#2c2c2c] font-semibold">
                {capitalize(currentOrder.orderStatus)}
              </span>
            </button>
          ) : (
            <span className="text-xs md:text-sm text-right text-[#2c2c2c] font-semibold">
              {capitalize(currentOrder.orderStatus)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
// Order summary component
const OrderSummary = ({ currentOrder }) => {
  return (
    <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
      {/* Left summary section */}
      <div className="p-5 bg-white rounded-lg shadow-sm">
        <div className="left-container">
          <h1 className="text-base md:text-xl font-semibold text-[#2c2c2c] pb-5">
            Order Summary
          </h1>
          <div className="">
            <div className="flex items-center justify-between pb-3 border-b">
              <span className="text-xs md:text-sm font-medium text-[#ADADAD]">
                Name
              </span>
              <div className="flex items-center">
                <span className="pl-1 text-xs md:text-sm line-clamp-1 text-[#2c2c2c] font-medium">
                  {currentOrder.customerDetails.name}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <span className="md:text-sm text-xs font-medium text-[#ADADAD]">
                Email
              </span>
              <span className="md:text-sm  pl-1 text-[10px] text-[#696969]">
                {currentOrder.customerDetails.email}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="md:text-sm text-xs font-medium text-[#ADADAD]">
                Phone
              </span>
              <span className="md:text-sm pl-1 text-[10px] text-[#696969]">
                {currentOrder.customerDetails.phone}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Right summary section */}
      <div className="p-5 bg-white rounded-lg shadow-sm">
        <div className="left-container">
          <h1 className="text-base md:text-xl font-semibold text-[#2c2c2c] pb-5">
            Payment Details
          </h1>
          <div className="">
            <div className="flex items-center justify-between py-3 border-b">
              <span className="md:text-sm text-xs font-medium text-[#ADADAD]">
                Payment Date
              </span>
              <span className="md:text-sm line-clamp-1 pl-1 text-[10px] text-[#696969]">
                {currentOrder.paymentResult.status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="md:text-sm text-xs font-medium text-[#ADADAD]">
                Payment Method
              </span>
              <span className="md:text-sm pl-1 text-[10px] text-[#696969]">
                {currentOrder.paymentMethod}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// Delivery to component
const DeliveryTo = ({ currentOrder }) => {
  return (
    <div className="grid grid-cols-1 gap-4 pt-4">
      {/* Delivery to card container */}
      <div className="p-5 bg-white rounded-lg shadow-sm">
        <div className="left-container">
          <h1 className="text-base md:text-xl font-semibold text-[#2c2c2c] pb-5">
            Delivery
          </h1>
          <div className="">
            <div className="flex items-center justify-between py-3 border-b">
              <span className="md:text-sm text-xs font-medium text-[#ADADAD]">
                House
              </span>
              <span className="md:text-sm line-clamp-1 pl-1 text-[10px] text-[#696969]">
                {currentOrder.customerDetails.address}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// Added Items component
const AddedItemsDetails = ({ currentOrder }) => {
  return (
    <div className="grid grid-cols-1 mt-4">
      <div className="text-[10px]  md:text-xs p-5 overflow-x-auto bg-white shadow-sm rounded-xl">
        <div className="grid grid-cols-5 min-w-[500px] text-[#ADADAD] pb-3">
          <span className="col-span-2">Product</span>
          <span>Unit Price</span>
          <span>Quantity</span>
          <span>Total</span>
        </div>
        {/* product details card container */}

        {currentOrder.orderItems.map((item) => (
          <ProductDetailsCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};
// Product details card component
const ProductDetailsCard = ({ item }) => {
  return (
    <div className="grid grid-cols-5 min-w-[500px] py-2 border-t  text-[#696969] text-[10px] md:text-sm">
      {/* product image and text container */}
      <div className="flex items-center col-span-2">
        <img
          src={item.image}
          alt="product_image"
          className="object-cover object-center rounded-sm min-w-[20px] md:min-w-[26px] min-h-[20px] md:min-h-[26px] max-h-[20px] md:max-h-[26px] max-w-[20px] md:max-w-[26px]"
        />
        <div className="mx-3 md:mr-5 line-clamp-1">
          <span>{item.name}</span>
        </div>
      </div>
      {/* Unit price container */}
      <div className="flex items-center justify-start">
        <span>${item.price.toFixed(2)}</span>
      </div>
      {/* Quantity container */}
      <div className="flex items-center justify-start">
        <span>{item.qty}</span>
      </div>
      {/* Total price container */}
      <div className="flex items-center justify-start">
        <span>${(item.price * item.qty).toFixed(2)}</span>
      </div>
    </div>
  );
};
// Ordered Price component
const OrderPriceCard = ({ currentOrder }) => {
  return (
    <div className="grid grid-cols-1 gap-4 pt-4">
      {/* Delivery To card container */}

      <div className="p-5 bg-white rounded-lg shadow-sm">
        <div className="left-container">
          <h1 className="text-base md:text-xl font-semibold text-[#2c2c2c] pb-5">
            Ordered Price
          </h1>
          <div className="">
            <div className="flex items-center justify-between py-3 border-b">
              <span className="md:text-sm text-xs font-medium text-[#ADADAD]">
                Sub Total
              </span>
              <span className="md:text-sm line-clamp-1 pl-1 text-[10px] text-[#696969]">
                ${currentOrder.totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <span className="md:text-sm text-xs font-medium text-[#ADADAD]">
                Shipping Cost
              </span>
              <span className="md:text-sm pl-1 text-[10px] text-[#696969]">
                ${currentOrder.shippingPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="md:text-sm text-xs font-medium text-[#ADADAD]">
                Grand Total
              </span>
              <span className="md:text-base font-semibold pl-1 text-[10px] text-[#2C2C2C]">
                $
                {(currentOrder.totalPrice + currentOrder.shippingPrice).toFixed(
                  2
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
