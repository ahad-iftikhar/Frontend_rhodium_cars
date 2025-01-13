import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { carsApi } from "../services/api";

export const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await carsApi.getCarById(id);

        setCar(response.data.data.car);
      } catch (error) {
        setError("Failed to fetch car details");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!car) return <div className="text-center py-8">Car not found</div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div
        className={`rounded-lg overflow-hidden shadow-lg ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{car.model}</h1>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-600 dark:text-gray-300">Price</p>
              <p className="text-xl font-semibold text-blue-500">
                ${car.price}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300">Phone</p>
              <p className="text-xl font-semibold text-blue-500">
                0{car.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
      {car.images.map((img, i) => (
        <div className="shadow-2xl my-8">
          <img
            key={i}
            src={img}
            alt={img}
            className="w-full h-96 object-cover shadow-2xl"
          />
        </div>
      ))}
    </div>
  );
};
