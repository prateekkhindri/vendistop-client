import { Icon } from "@iconify/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postCategoryAction } from "../../../pages/categories/categoryAction";

const initialState = {
  name: "",
};
export const AddCatForm = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(postCategoryAction(form));
    setForm(initialState);
  };

  return (
    <form
      className="p-3 bg-white shadow-sm md:py-10 rounded-xl"
      onSubmit={handleSubmit}
    >
      <div className="max-w-[500px] mx-auto">
        <div className="w-full flex items-center justify-between">
          <label
            className="text-xs md:text-sm text-[#ADADAD]"
            htmlFor="category-input"
          >
            Add Category
          </label>

          <button
            type="submit"
            className="p-1 transition text-lg text-[#696969] md:text-2xl bg-[#f7f7f7] rounded-md hover:text-white hover:bg-[#4C00B0] font-semibold"
          >
            <Icon icon={"ic:round-plus"} />
          </button>
        </div>

        <div className="w-full mt-2">
          <input
            onChange={handleChange}
            required
            className="w-full md:text-base py-3 px-6 outline-none bg-[#F8F8F8] transition focus:border-[#4C00B0] rounded-lg text-xs border border-[#EBEBEB]"
            type="text"
            name="name"
            value={form.name}
            id="category-input"
            placeholder="Enter your category name..."
          />
        </div>
      </div>
    </form>
  );
};
