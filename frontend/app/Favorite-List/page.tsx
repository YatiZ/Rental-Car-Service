"use client";
import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import { getUserId } from "../lib/action";
import FavoriteCarList from "@/components/FavoriteCarList";

const favoriteListPage = () => {
  const [favoriteCars, setFavoriteCars] = useState([]);
  useEffect(() => {
    const fetchFavorites = async () => {
      const user_id = await getUserId();
      const response = await apiService.favGet(`/api/favorite-list/${user_id}`);
      const favoriteCars = response.favorite_cars || [];
      console.log(response.favorite_cars);
      setFavoriteCars(favoriteCars);
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Your Favorite Cars</h1>

      <div className="grid md:grid-cols-3 grid-cols-1 m-5 gap-4">
        {favoriteCars.length > 0 ? (
          favoriteCars.map((car: any) => <FavoriteCarList key={car.id} id ={car.id} car={car}/>)
        ) : (
          <div className="">No favorite car</div>
        )}
      </div>
    </div>
  );
};

export default favoriteListPage;
