import React from "react";
import "./List.scss";
import Card from "../Card/Card";

const List = ({ data, size }) => {

  return (
    <div className="list">
      {data?.length > 0
        ? data?.map((item) =>
          size.length != 0 ?
            size.filter(s => item.ctMathangs.filter(ct => ct.sizeDTO.masize == s).length > 0).length > 0 ? <Card item={item} key={item.mamh} /> : <></>
            : <Card item={item} key={item.mamh} />
        )
        : "not found!"}
    </div>
  );
};

export default List;
