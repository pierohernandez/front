const getSuppliers = async () => {
  const url = "http://localhost:3000/proveedores";

  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();

    console.log("getSuppliers", data);
    return data;
  }

  return [];
};

export default getSuppliers;
