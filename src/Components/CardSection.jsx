import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import ShoppingContext from "../providers/ShoppingContext";
import Slider from "./Slider";
import AddedProduct from "./AddedProduct";
import Footer from "./Footer";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const CardSection = () => {
  const {
    isLoading,
    product,
    handleCategory,
    categoryProduct,
    setUser,
    setCardItems,
    bestSeller,
    suggestions,
    user,
  } = useContext(ShoppingContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.isAdmin) {
      navigate("/admin");
    }

    if (user) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async (storedToken) => {
    const response = await fetch(
      "https://fresh-fruits-backend.onrender.com/api/cart",
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setCardItems(data);
  };

  const selectCategory = (e) => {
    e.preventDefault();
    handleCategory(categories);
  };

  const [categories, setCategories] = useState("Fruits");

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Slider />

      <div className="container p-1">
        <h1 className="text-center my-5 ">Choose Fresh Products </h1>
        <div
          style={{ height: "410px" }}
          className="overflow-x-auto  card p-1 shadow d-flex flex-column flex-wrap  mt-2"
        >
          {product.map((user) => (
            <Card user={user} key={user._id} />
          ))}
        </div>
      </div>

      <div className="container p-3">
        <h3 className="p-2 mt-5  ">Choose Your Needs </h3>
        <form onSubmit={(e) => selectCategory(e)}>
          <select
            onChange={(e) => setCategories(e.target.value)}
            name=""
            id=""
            className="select-form w-100 rounded-2 my-2 p-2 "
          >
            <option defaultValue="0">category</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Dairy">dairy</option>
            <option value="Cooking ingredients">Cooking ingredients</option>
          </select>

          <button className="btn btn-success form-control mt-4 p-2">
            Submit
          </button>
        </form>
      </div>

      <div className="container p-1">
        <div
          style={{ maxHeight: "410px", minHeight: "0px" }}
          className="overflow-x-auto  card p-1 shadow d-flex flex-column flex-wrap  mt-2"
        >
          {categoryProduct.map((user) => (
            <Card user={user} key={user._id} />
          ))}
        </div>
      </div>
      <div className="container p-1">
        <h4 className="p-2 mt-5">Suggestions... </h4>

        <div
          style={{ maxHeight: "410px", minHeight: "0px" }}
          className="overflow-x-auto  card p-1 shadow d-flex flex-column flex-wrap  mt-2"
        >
          {suggestions.map((user) => (
            <Card user={user} key={user._id} />
          ))}
        </div>
      </div>

      <div className="container p-1">
        <h4 className="p-2 mt-5">Best Seller... </h4>

        <div
          style={{ maxHeight: "410px", minHeight: "0px" }}
          className="overflow-x-auto  card p-1 shadow d-flex flex-column flex-wrap  mt-2"
        >
          {bestSeller.map((user) => (
            <Card user={user} key={user._id} />
          ))}
        </div>
      </div>

      <div className="container p-1">
        <h4 className="p-2 mt-5">Recently Added Product... </h4>
        <div
          style={{ maxHeight: "410px", minHeight: "0px" }}
          className="overflow-x-auto  card p-1 shadow d-flex flex-column flex-wrap  mt-2"
        >
          <AddedProduct />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CardSection;
