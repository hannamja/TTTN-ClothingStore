import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
import useFetch from "../../hooks/useFetch";
import "./Products.scss";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const Products = () => {
  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState(null);
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [sortData, setSortData] = useState(null)
  const { data, loading, error, setData } = useFetch(
    `/mathang/getByLoai/${catId}`
  );
  const sizeData = useFetch(`/size`);

  useEffect(() => {
    if (data) setSortData(data)
  }, [loading])


  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };

  const sorting = (price) => {
    setSortData(data.filter(i => i.gia >= price))
  }

  const sizeFilter = (size) => {
    data.filter(i => i.sizeDTO.tensize == size)
  }

  const priceFilter = (typeSort) => {
    if (typeSort == 'asc') {
      sortData.sort((a, b) => a.gia - b.gia)
    }
    else if (typeSort == 'desc') {
      sortData.sort((a, b) => b.gia - a.gia)
    }
  }
  return (
    loading || sizeData.loading ? 'loading...' :
      <div className="products">
        <div className="left">
          <div className="filterItem">
            <h2>Product Categories</h2>
          </div>
          <div className="filterItem">
            <h2>Filter by size</h2>
            <div className="inputItem">
              <FormGroup>
                {
                  sizeData.data?.map((i, idx) =>
                    <FormControlLabel key={idx} control={<Checkbox onChange={handleChange} />} label={i.tensize} value={i.masize} />
                  )
                }
              </FormGroup>
            </div>
          </div>
          <div className="filterItem">
            <h2>Filter by price</h2>
            <div className="inputItem">
              <span>0</span>
              <input
                type="range"
                min={0}
                max={1000}
                onChange={(e) => { setMaxPrice(e.target.value); sorting(e.target.value * 1000) }}
              />
              <span>{maxPrice}</span>
            </div>
          </div>
          <div className="filterItem">
            <h2>Sort by</h2>
            <div className="inputItem">
              <input
                type="radio"
                id="asc"
                value="asc"
                name="price"
                onChange={(e) => { setSort("asc"); priceFilter("asc") }}
              />
              <label htmlFor="asc">Price (Lowest first)</label>
            </div>
            <div className="inputItem">
              <input
                type="radio"
                id="desc"
                value="desc"
                name="price"
                onChange={(e) => { setSort("desc"); priceFilter("desc") }}
              />
              <label htmlFor="desc">Price (Highest first)</label>
            </div>
          </div>
        </div>
        <div className="right">
          <img
            className="catImg"
            src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <div>
            <input type="text" />
            <button>Search</button>
          </div>
          <List data={sortData} />
        </div>
      </div>
  );
};

export default Products;
