import React, { useEffect, useRef, useState } from "react";
import RenderItem from "./nestedComponents/RenderItem";

const Listing = ({ listings: items, category }) => {
  const listRef = useRef(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Reload Listings", items.length);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  return <RenderItem loading={loading} listRef={listRef} items={items} />;
};

export default Listing;
