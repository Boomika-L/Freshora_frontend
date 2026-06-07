import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../assests/styles/Offers.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Offers = () => {
  const [offers, setOffers] = useState([]);

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await axios.get(`${API}/api/offers`);
      setOffers(res.data);
    } catch (error) {
      console.log("Offers fetch error:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="offers-container">
        <h1>🔥 Freshora Offers</h1>

        <div className="offers-grid">
          {offers.map((offer) => (
            <div className="offer-card" key={offer._id}>
              <img src={offer.image} alt={offer.title} />

              <h2>{offer.title}</h2>
              <p>{offer.description}</p>

              <span>{offer.discount}</span>

              <Link to="/products">
                <button>Shop Now</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Offers;