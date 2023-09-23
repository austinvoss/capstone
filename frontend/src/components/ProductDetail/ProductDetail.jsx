import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../utils/api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {product ? (
        <>
          <h1>{product.name}</h1>
          <p>Price: ${product.price}</p>
          <p>Description: {product.description}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;
