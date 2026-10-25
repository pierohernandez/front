const getSuppliers = async () => {
  const url = `${API_URL}/proveedores`;

  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();

    console.log("getSuppliers", data);
    return data;
  }

  return [];
};

export default getSuppliers;
