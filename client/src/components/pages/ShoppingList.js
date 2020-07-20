import React, { useEffect } from "react";
import { get } from "../../utilities";

const ShoppingList = () => {
  useEffect(() => {
    get("/api/shopping", { recipes: ["haha", "test"] }).then((res) => console.log(res));
  }, []);

  return <div></div>;
};

export default ShoppingList;
