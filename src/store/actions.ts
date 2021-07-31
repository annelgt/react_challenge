export const getProducts = async (): Promise<IProduct[]> => {
    const response = await fetch("http://localhost:3004/products", {method: "GET"});

    if (response.ok) {
      return await response.json();
    }

    return [];
}
