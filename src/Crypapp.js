import React, { useEffect, useState } from "react";
import "./Crypcss.css";
import axios from "axios";
import Coin from "./Coin";

function Crypapp() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    console.log(process.env.REACT_APP_API_KEY);

    axios
      .get(apiKey)
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // search handling
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">CryptoWorld</h1>
        <form action="">
          <input
            type="text"
            className="coin-input"
            placeholder="Provide the coin name"
            onChange={handleChange}
          />
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            pricechange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        );
      })}
    </div>
  );
}

export default Crypapp;
