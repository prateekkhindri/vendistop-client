export const SubmitButton = ({ btnContent }) => {
  const handleClick = (e) => {};
  return (
    <div className="flex items-center justify-center w-full mt-10 ">
      <button
        onClick={handleClick}
        className="bg-[#4C00B0] text-white px-5 py-3 text-center rounded-3xl font-medium text-sm hover:opacity-75"
      >
        {btnContent}
      </button>
    </div>
  );
};
