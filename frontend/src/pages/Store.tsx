import FilteringBar from "../components/FilteringBar";
import NewsLetter from "../components/NewsLetter";
import PaginationLinks from "../components/PaginationLinks";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react"
import { instance } from "../utils/axios";
import { productType, storeType } from "../utils/types";



const Store = () => {
    const [obj, setObj] = useState<storeType| null>()
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState({ sort: "price", order: "desc" })
    const [category, SetCategory] = useState([])
    const [brand, setBrand] = useState([])
    const [page, setPage] = useState(1)
    const [price, setPrice] = useState(1000)

    useEffect(() => {
        async function fetchProducts() {
            const { data } = await instance.get(`/products/product?sort=${sort.sort},${sort.order}&page=${page}&search=${search}&category=${category.toString()}&brand=${brand.toString()}&price=${price}`)
            return data
        }
        fetchProducts().then(data => {
            setObj(data)
        })
    }, [sort, page, search, category, brand, price])

    const resetFilters = () => {
        SetCategory([])
        setBrand([])
        setPrice(1000)
    }

    return (
        <div className="min-h-screen">
            <div>
                <div className="flex flex-col md:flex-row md:gap-2 gap-10 pt-10 mb-[200px]">
                    <div className=" md:min-w-[300px] p-4 border ">
                        <FilteringBar category={category} brand={brand} categories={obj?.categories} brands={obj?.brands}
                            setCategory={SetCategory}
                            setBrand={setBrand}
                            price={price}
                            setPrice={setPrice}
                        />
                    </div>
                    <div className="flex-grow">
                        <div className="flex justify-between items-center py-4 mb-4">
                            <span className="font-sm">
                                Showing <strong>{obj?.total}</strong> results from total of
                                <strong>  {obj?.totalProducts}</strong>
                            </span>

                            <div className="flex gap-2 items-center">
                                <span>Sort By: </span>
                                <select  value={sort.sort} className="bg-gray-200 px-8 py-2" onChange={(e)=>{
                                    setSort({sort: e.target.value,order:"desc"})
                                }}>
                                    <option value="price">Price</option>
                                    <option value="name">name</option>
                                    {/* <option value="">Top Rated</option> */}

                                </select>
                            </div>
                        </div>

                        <div className="flex  justify-between ">
                            <div className="flex gap-4 items-center">
                                <span className="font-bold block ">Applied Filters : </span>
                                <div className="bg-gray-200 p-3 ">
                                    {category.length != 0 ?
                                        category.map(cat => (
                                            <>
                                                {cat + " | "}
                                            </>
                                        ))
                                        : "None"}


                                </div>

                                <button className="bg-white border border-black px-6 py-3"
                                    onClick={resetFilters}
                                >Clear All</button>
                            </div>
                            <div className="flex gap-2 items-center outline-none max-w-[400px] border-black border-b-[2px] py-1">
                                <img
                                    alt="search icon"
                                    src="/images/loupe.png"
                                    width={15}
                                    height={15}
                                />
                                <input type="text" className="focus:outline-none" value={search}
                                    onChange={(e) => setSearch(e.target.value)} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 my-10 gap-10">
                            {obj?.products?.map((product:productType) => (
                                <ProductCard product={product} key={product._id} />
                            ))}
                        </div>

                    </div>
                </div>
            </div>
            <PaginationLinks total={obj?.totalProducts} page={page} setPage={setPage}/>
            <NewsLetter />
        </div>
    );
};

export default Store;
