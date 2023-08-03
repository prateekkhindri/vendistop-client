import React, { useRef } from "react";
import { Icon } from "@iconify/react";
import blank from "../../../assets/icons/upload.png";

const Blank = ({ onEdit }) => {
  return (
    <div
      onClick={onEdit}
      className="flex flex-col items-center justify-center p-10 mb-4 bg-white"
    >
      <div className="p-3">
        <img src={blank} alt="blank" />
      </div>
      <div className="mb-3 bg-[#4C00B0] py-2 px-3 text-white rounded-lg font-semibold cursor-pointer">
        <p className="cursor-pointer" htmlFor="img">
          Upload Image
        </p>
      </div>
      <div className="text-center text-[#969696] text-base">
        <p>Supported formats: png,jpg,jpeg</p>
        <p>Max size: 16MB allowed</p>
      </div>
    </div>
  );
};

const ImageButtons = ({ onEdit, onDelete }) => {
  return (
    <div className="absolute top-0 items-center justify-center hidden w-full h-full transition-all bg-black bg-opacity-30 rounded-xl group-hover:flex">
      <button
        type="button"
        className="mr-2 z-10 flex items-center justify-center p-1 text-[#696969] hover:text-red-500 text-xs lg:text-lg bg-white rounded-full"
        onClick={(event) => onDelete(event)}
      >
        <Icon icon={"material-symbols:delete"} />
      </button>
      <button
        type="button"
        className="z-10 flex items-center justify-center p-1 text-[#696969] text-xs lg:text-lg bg-white rounded-full "
      >
        <Icon icon={"material-symbols:edit"} />
      </button>
    </div>
  );
};

const Image = ({ src, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-center" onClick={onEdit}>
      <div className="relative group w-full h-[300px] sm:h-[300px] bg-white rounded-xl shadow-lg">
        <img
          src={src}
          alt="big_img"
          className="object-cover w-full h-full bg-white rounded-2xl"
        />
        <ImageButtons onDelete={onDelete} />
      </div>
    </div>
  );
};

const ImageInput = ({ imgInputRef, onChange }) => {
  return (
    <input
      ref={imgInputRef}
      onChange={(event) => onChange(event)}
      name="image"
      className="hidden"
      type="file"
      accept="image/*"
    />
  );
};

const UploadImage = ({ selectedProductImage, image, setImage }) => {
  const imgInputRef = useRef(null);

  // handling bigger image click event
  const onEdit = () => {
    imgInputRef.current.click();
  };

  // handling bigger image change event
  const onChange = () => {
    const file = imgInputRef.current?.files[0];
    setImage(file);
  };

  // Bigger image deletion
  const onDelete = (event) => {
    event.stopPropagation();
    setImage(null);

    imgInputRef.current.value = null;
  };

  if (image) {
    return (
      <div>
        <Image
          src={URL.createObjectURL(image)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        <ImageInput imgInputRef={imgInputRef} onChange={onChange} />
      </div>
    );
  }

  if (selectedProductImage) {
    return (
      <div>
        <Image src={selectedProductImage} onEdit={onEdit} onDelete={onDelete} />
        <ImageInput imgInputRef={imgInputRef} onChange={onChange} />
      </div>
    );
  }

  return (
    <div>
      <Blank onEdit={onEdit} />
      <ImageInput imgInputRef={imgInputRef} onChange={onChange} />
    </div>
  );
};

export default UploadImage;
