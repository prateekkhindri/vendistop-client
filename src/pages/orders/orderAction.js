import { toast } from "react-toastify";
import {
  createOrder,
  getSingleOrder,
  getOrdersByUser,
  updateOrderToDelivered,
  getAllOrders,
} from "../../helpers/axiosHelper.js";
import { setCurrentOrder, setOrders } from "./orderSlice.js";

// Below is an admin action - To get all orders in the admin dashboard
export const getAllOrdersAction = () => async (dispatch) => {
  const responsePromise = getAllOrders();

  const { status, orders } = await responsePromise;

  status === "success" && dispatch(setOrders(orders));
};

// Get orders for a logged in user
export const getOrdersByUserAction = (_id) => async (dispatch) => {
  const responsePromise = getOrdersByUser(_id);

  const { status, orders } = await responsePromise;

  status === "success" && dispatch(setOrders(orders));
};

// Get order information for a single order
export const getSingleOrderAction = (_id) => async (dispatch) => {
  const { status, order } = await getSingleOrder(_id);

  status === "success" && dispatch(setCurrentOrder(order));

  return order;
};

// Create a new order - only admin can action
export const createOrderAction = (orderData) => async (dispatch) => {
  const responsePromise = createOrder(orderData);

  toast.promise(responsePromise, {
    pending: "Creating order... Please wait...",
  });

  const { status, message, order } = await responsePromise;

  toast[status](message);

  status === "success" && dispatch(setCurrentOrder(order));

  return order;
};

// Update order to delivered - only admin can action
export const updateOrderToDeliveredAction = (_id) => async (dispatch) => {
  const responsePromise = updateOrderToDelivered(_id);

  toast.promise(responsePromise, {
    pending: "Updating order to delivered... Please wait...",
  });

  const { status, message } = await responsePromise;

  toast[status](message);

  status === "success" && dispatch(getAllOrdersAction());
};
