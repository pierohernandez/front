const getCategories = async () => {
  const url = "http://localhost:3000/categorias";

  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();

    console.log("getCategories", data);

    return data;
  }

  return [];
};

export default getCategories;
