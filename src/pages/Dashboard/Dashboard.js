import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { DashAside } from "../../components/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction } from "../upload-product/productAction";
import { getCategoriesAction } from "../categories/categoryAction";
import { getAllOrdersAction } from "../orders/orderAction";

const Dashboard = ({ toggle, handleToggle, dashRef }) => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categoriesStore);

  const { products } = useSelector((state) => state.productStore);

  const { orders } = useSelector((state) => state.orderStore);

  useEffect(() => {
    // Fetch the list of categories if not in the state
    !categories.length && dispatch(getCategoriesAction());

    !products.length && dispatch(fetchProductsAction());

    !orders.length && dispatch(getAllOrdersAction());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-[#FDF9FF] min-h-[calc(100vh-73px)]  py-5">
      <div className="max-w-screen-xl px-3 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-4">
          <div className="hidden lg:block lg:row-span-1">
            <DashAside />
          </div>
          <div
            ref={dashRef}
            className={`${
              toggle ? "" : "hidden"
            } absolute z-10 lg:hidden left-3 top-20`}
          >
            <DashAside handleToggle={handleToggle} />
          </div>
          <div className="lg:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
