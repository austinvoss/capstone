export const fetchProducts = async () => {
  const response = await fetch("http://localhost:3001/api/products");
  const data = await response.json();
  return data;
};

export const fetchProductById = async (id) => {
  const response = await fetch(`http://localhost:3001/api/products/${id}`);
  const data = await response.json();
  return data;
};
