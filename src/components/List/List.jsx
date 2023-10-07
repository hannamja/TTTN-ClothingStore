import React from "react";
import "./List.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";

const List = ({ data }) => {


  return (
    <div className="list">
      {
        data?.map((item) => <Card item={item} key={item.mamh} />)
      }
    </div>
  );
};

export default List;
