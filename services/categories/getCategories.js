const getCategories = async () => {
  const url = `${API_URL}/categorias`;

  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();

    console.log("getCategories", data);

    return data;
  }

  return [];
};

export default getCategories;
