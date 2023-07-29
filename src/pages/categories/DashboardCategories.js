import React, { useState } from "react";
import { v4 } from "uuid";
import { AddCatForm } from "../../components/Dashboard/cat-form/AddCatForm";
import { UpdateCategory } from "../../components/Dashboard/cat-form/UpdateCategory";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoryAction } from "./categoryAction";
v4();

const DashboardCategories = () => {
  // State to handle when a category is being edited
  const [isEditMode, setIsEditMode] = useState(false);

  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categoriesStore);

  const handleDelete = (obj) => {
    if (
      !isEditMode &&
      window.confirm("Are you sure you want to delete this category ?")
    ) {
      dispatch(deleteCategoryAction({ ids: obj }));
    }
  };

  return (
    <div className="">
      <div className="py-4">
        <h1 className="text-[#515050] text-xl font-semibold">
          Category Management
        </h1>
      </div>
      <AddCatForm />
      <div className="p-3 bg-white shadow-sm md:py-10 rounded-xl my-9">
        <div className="max-w-[500px] mx-auto">
          <div className="w-full">
            <label className="text-xs md:text-sm text-[#ADADAD]">
              {categories.length} Categories Found !
            </label>

            <UpdateCategory
              handleDelete={handleDelete}
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCategories;
