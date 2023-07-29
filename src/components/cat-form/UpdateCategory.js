import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesAction,
  updateCategoryAction,
} from "../../../pages/categories/categoryAction.js";

export const UpdateCategory = ({ handleDelete, isEditMode, setIsEditMode }) => {
  const [editingId, setEditingId] = useState(null);

  const [editedName, setEditedName] = useState("");

  const { categories } = useSelector((state) => state.categoriesStore);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesAction());
  }, []);

  const handleEdit = (category) => {
    setIsEditMode(true);
    setEditingId(category._id);
    setEditedName(category.name);
  };

  const handleSave = () => {
    setIsEditMode(false);
    dispatch(updateCategoryAction({ _id: editingId, name: editedName }));
    setEditingId(null);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditingId(null);
  };

  return categories.map((category) => (
    <div className="flex items-center w-full mb-5" key={category._id}>
      <input
        className={`disabled:cursor-not-allowed w-full md:text-base py-3 px-6 outline-none bg-[#F8F8F8] transition focus:border-[#4C00B0] rounded-lg text-xs border border-[#EBEBEB]`}
        type="text"
        name="name"
        defaultValue={editingId === category._id ? editedName : category.name}
        onChange={(e) => setEditedName(e.target.value)}
        placeholder="Enter your category name..."
        disabled={editingId !== category._id}
      />

      {editingId === category._id ? (
        <>
          <button
            type="submit"
            className="p-2 md:p-2 text-[#696969] ml-1 md:ml-3 text-xl md:text-2xl bg-white rounded-md shadow hover:text-[#4C00B0] font-semibold active:shadow-none"
            onClick={handleSave}
          >
            <Icon icon="ion:save" />
          </button>

          <button
            className="p-2 md:p-2 ml-1 md:ml-3 text-xl text-[#696969] md:text-2xl bg-white rounded-md shadow hover:text-red-400 font-semibold active:shadow-none"
            type="button"
            onClick={handleCancel}
          >
            <Icon icon="ion:close-circle" />
          </button>
        </>
      ) : (
        <>
          <button
            className="p-2 md:p-2 ml-1 md:ml-3 text-xl text-[#696969] md:text-2xl bg-white rounded-md shadow hover:text-[#4C00B0] font-semibold active:shadow-none"
            type="submit"
            onClick={() => handleEdit(category)}
          >
            <Icon icon={"material-symbols:edit"} />
          </button>

          <button
            className="p-2 md:p-2 ml-1 md:ml-3 text-xl text-[#696969] md:text-2xl bg-white rounded-md shadow hover:text-red-400 font-semibold active:shadow-none"
            type="submit"
            disabled={isEditMode}
            onClick={() => handleDelete(category._id)}
          >
            <Icon icon={"material-symbols:delete"} />
          </button>
        </>
      )}
    </div>
  ));
};
