import React, { memo } from "react";
import "./List.scss";
import Card from "../Card/Card";

const List = ({ data, size, color }) => {
  if (size.length != 0) {
    data = data.filter((item) => size.filter(s => item.ctMathangs.filter(ct => ct.sizeDTO.masize == s).length > 0).length > 0)
  }
  return (
    <div className="list">
      {data?.length > 0
        ? data?.map((item) => <Card item={item} key={item.mamh} />)
        : "not found!"}
    </div>
  );
};

export default memo(List);
