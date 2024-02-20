export type storeType = {
    total: number,
    page: number,
    limit: number,
    products: productType[],
    brands: [],
    categories: [],
    totalProducts: number
}

export type productType = {
    brand: { _id: string, name: string },
    category: { _id: string, name: string },
    description: string,
    image: string
    , name: string,
    price: number,
    quantity: number,
    reviews: [],
    _id: string,
    qty: number
}

export type User = {
    email: string,
    role: string,
    _id: string
}