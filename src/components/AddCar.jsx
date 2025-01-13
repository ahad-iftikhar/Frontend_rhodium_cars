import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCar } from "../store/carSlice";
import { carsApi } from "../services/api";

export const AddCar = () => {
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const maxImages = watch("maxNumberOfPictures") || 10;

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Map the files to image objects with previews
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    // Concatenate new images with the existing state
    setImages((prevImages) => {
      // Avoid duplicates by checking the file names
      const uniqueImages = [...prevImages, ...newImages].filter(
        (img, index, self) =>
          index === self.findIndex((t) => t.file.name === img.file.name)
      );
      return uniqueImages.slice(0, maxImages); // Respect maxImages limit
    });
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  //   const onSubmit = async (data) => {
  //     try {
  //       console.log({ ...data, images });
  //       const response = await carsApi.addCar({ ...data, images });
  //       dispatch(addCar(response.data));
  //       navigate("/");
  //     } catch (error) {
  //       console.log("ERROR:", error);

  //       alert("Failed to add car. Please try again");
  //     }
  //   };

  const onSubmit = async (data) => {
    try {
      // Create a FormData instance to handle file uploads
      const formData = new FormData();

      // Add all the regular form data
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      //   Add each image file separately
      images.forEach((img, index) => {
        formData.append(`images`, img.file);
      });
      //   const localImages = images.map((img) => img.file);
      //   // Add images array
      //   console.log("images", images);
      //   formData.append("images", localImages);

      //   images.forEach((img, index) => {
      //     formData.append(`images[${index}]`, img.file);
      //   });

      const response = await carsApi.addCar(formData);
      dispatch(addCar(response.data));
      navigate("/");
    } catch (error) {
      console.error("Error adding car:", error); // Better error logging
      alert(`Failed to add car: ${error.message || "Please try again"}`);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <form
        typeof="submit"
        onSubmit={handleSubmit(onSubmit)}
        className={`w-full max-w-lg ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-lg p-6 space-y-4`}
      >
        <h2 className="text-xl font-semibold text-center">
          Submit Your Vehicle
        </h2>

        {/* Car Model */}
        <div>
          <label className="block text-sm font-medium">Car Model</label>
          <input
            type="text"
            {...register("model", { required: "Car model is required" })}
            className={`w-full mt-1 p-2 border rounded ${
              isDarkMode ? "bg-gray-700" : "border-gray-600"
            } `}
          />
          {errors.carModel && (
            <span className="text-red-500 text-sm">
              {errors.carModel.message}
            </span>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            {...register("price", { required: "Price is required" })}
            className={`w-full mt-1 p-2 border rounded ${
              isDarkMode ? "bg-gray-700" : "border-gray-600"
            } `}
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price.message}</span>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^03\d{9}$/,
                message: "Invalid phone format (e.g., 03001234567)",
              },
            })}
            className={`w-full mt-1 p-2 border rounded ${
              isDarkMode ? "bg-gray-700" : "border-gray-600"
            } `}
            placeholder="0300XXXXXXX"
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone.message}</span>
          )}
        </div>

        {/* Max Images */}
        <div>
          <label className="block text-sm font-medium">Max Images</label>
          <input
            min={1}
            max={10}
            type="number"
            {...register("maxNumberOfPictures", {
              valueAsNumber: true,
              min: 1,
              max: 10,
            })}
            className={`w-full mt-1 p-2 border rounded ${
              isDarkMode ? "bg-gray-700" : "border-gray-600"
            } `}
            onChange={(e) =>
              setValue("maxNumberOfPictures", parseInt(e.target.value, 10))
            }
          />
        </div>

        {/* Add Pictures */}
        <div>
          <label className="block text-sm font-medium">Add Pictures</label>
          <input
            name="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full mt-1"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img.preview}
                  alt="Uploaded"
                  className="w-16 h-16 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};
