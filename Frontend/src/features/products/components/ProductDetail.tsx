import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Footer } from "../../../components/layout/Footer";
import { Header } from "../../../components/layout/Header";
import { getProductById } from "../../../services/productService";
import { MENU_SIZE } from '../../../config/menu';
import { SuggestProducts } from "../../../components/common/SuggestProducts";

export const ProductDetail: React.FC = () => {
    const [isActive, setIsActive] = useState('');
    const { id } = useParams<{ id: string }>();
    
    // Query data
    const { data: product, isLoading, error } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductById(id!),
        enabled: !!id
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching products</p>;

    // Handle active
    const handleActive = (size: string) => {
        setIsActive(size);
    };

    return ( 
        <div>
            <div>
                <Header />
            </div>
            <div className="bg-[#ffffffd9] mb-20">
                <div className="mx-100 mt-100">
                    <div className="flex flex-row gap-50">
                        <div className="w-[auto] flex flex-row px-[25px] gap-50">
                            <div className="pt-10 pl-25 pr-10">
                                <img className="w-[68px] h-[84px] cursor-pointer" src={product?.imageUrl} alt="" />
                            </div>
                            <img className="w-[340px] h-[420px]" src={product?.imageUrl} alt={product?.name} />
                        </div>
                        <div className="w-[470px]">
                            <h3 className="font-[GucciSansPro-book] text-4xl">{product?.name}</h3>
                            <p className="font-[GucciSansPro-light] my-10">{product?.description}</p>
                            <span className="font-[GucciSansPro-bold]">{product?.price}</span>
                            <div className="py-25">
                                <span className="font-[GucciSansPro-bold]">Color:</span>
                            </div>
                            <div>
                                <span className="font-[GucciSansPro-bold]">Size:</span>
                                <ul className="flex mt-10">
                                    {MENU_SIZE.map((item) => (
                                        <li 
                                            className={`border border-[#ccc] font-[GucciSansPro-light] text-sm w-[80px] text-center py-[10px] px-[10px] cursor-pointer mr-10 rounded-sm
                                                ${isActive === item.size ? "text-[#6774d5] border-[#6774d5]": "text-[#ccc] border-[#ccc]"}`}  
                                            onClick={() => handleActive(item.size)}
                                            key={item.id}
                                        >
                                            Size {item.size}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <SuggestProducts />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
     );
}

