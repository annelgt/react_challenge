export const getProducts = async (): Promise<IProduct[]> => {
    const response = await fetch("http://localhost:3004/products", {method: "GET"});

    if (response.ok) {
        return await response.json();
    }

    return [];
}


export const createBrief = async (brief: IBrief): Promise<IBrief | null> => {
    const response = await fetch("http://localhost:3004/briefs", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(brief)
    });

    if (response.ok) {
        return await response.json();
    }

    return null;
}