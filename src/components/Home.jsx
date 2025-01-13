import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCars, setLoading, setError } from "../store/carSlice";
import { carsApi } from "../services/api";

export const Home = () => {
  const dispatch = useDispatch();
  const { cars, loading, error } = useSelector((state) => state.cars);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    const fetchCars = async () => {
      dispatch(setLoading(true));
      try {
        const response = await carsApi.getAllCars();
        console.log("res", response.data.data);

        dispatch(setCars(response.data.data.cars));
      } catch (error) {
        dispatch(setError("Failed to fetch cars"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCars();
  }, [dispatch]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Available Cars</h2>
        <Link
          to="/add-car"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Register New Car
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <Link
            key={car.id}
            to={`/car/${car._id}`}
            className={`block rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <img
              src={car.images[0]}
              alt={`${car.make} ${car.model}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">
                {car.make} {car.model}
              </h3>
              <p className="text-blue-500 font-semibold">
                ${car.price.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
