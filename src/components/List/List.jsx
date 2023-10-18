import React from "react";
import "./List.scss";
import Card from "../Card/Card";

const List = ({ data }) => {
  return (
    <div className="list">
      {data?.length > 0
        ? data?.map((item) => <Card item={item} key={item.mamh} />)
        : "not found!"}
    </div>
  );
};

export default List;
