import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootStore } from "../../../redux/store";
import { productsList } from "../../../services/productService";

export const ProductFeatures: React.FC = () => {
    // Query data
    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: productsList
    });

    const productByCategory = useSelector((state: RootStore) => state.category.featureProducts)

    // Filter products by selected category
    const filterProductsByCty = products.filter((product) => product.category === productByCategory);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetcing products</p>;
    
    return (
        <div>
            <ul>
                {filterProductsByCty.map((product) => (
                    <li className="flex gap-5 mt-30 mb-30 items-center">
                        <div className="w-[90px] h-[110px]">
                            <a href="#">
                                <img src={product.imageUrl} alt="" />
                            </a>
                        </div>
                        <div className="flex flex-col pl-20">
                            <span className="font-[Poppins-regular] text-sm text-[#555] pb-20">{product.name}</span>
                            <span className="font-[Poppins-regular] text-[#888]">{product.price}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}