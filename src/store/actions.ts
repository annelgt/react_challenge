export const getProducts = async (filters?: { name: string, value: string }[]): Promise<IProduct[]> => {
    let url: string = "http://localhost:3004/products";

    if (filters) {
        const params: string = (Array.from(new Set(filters.map((data) => {
            return `${data.name}=${data.value}`;
        })))).join("&");
        url += `?${params}`;
    }

    const response = await fetch(url, {method: "GET"});

    if (response.ok) {
        return await response.json();
    }

    return [];
}


export const createBrief = async (brief: BriefState): Promise<IBrief | null> => {
    const response = await fetch("http://localhost:3004/briefs", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(brief)
    });

    if (response.ok) {
        const data: any = await response.json();
        const products: IProduct[] = await getProducts([{name: "id", value: data.productId}]);
        return {
            id: data.id,
            title: data.title,
            comment: data.comment,
            product: products[0]
        };
    }

    return null;
}

export const getBriefs = async (): Promise<IBrief[]> => {
    const response = await fetch("http://localhost:3004/briefs", {method: "GET"});

    if (response.ok) {
        const briefs: { id: number, title: string, comment: string, productId: number }[] = await response.json();
        const productsIds: { name: string, value: string }[] = briefs.map((data: BriefState) => {
            return {name: "id", value: data.productId ? String(data.productId) : ""}
        });
        const productsList: IProduct[] = await getProducts(productsIds);
        const products: Map<string, IProduct> = new Map(productsList.map(product => [String(product.id), product]));

        return briefs.map((data) => {
            return {
                id: data.id,
                title: data.title,
                comment: data.comment,
                product: products.get(String(data.productId)) as IProduct
            };
        });
    }

    return [];
}