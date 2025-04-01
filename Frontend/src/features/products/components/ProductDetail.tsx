import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../../../components/layout/Footer";
import { Header } from "../../../components/layout/Header";
import { getProductById } from "../../../services/product/productService";
import { MENU_SIZE } from '../../../config/menu';
import { SuggestProducts } from "./SuggestProducts";
import { addQuantity, decreaseQuantity } from "../../../redux/cart/cartSlice";
import { AppDispatch, RootStore } from '../../../redux/store';

export const ProductDetail: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isActive, setIsActive] = useState('');
    const { id } = useParams<{ id: string }>();

    const updateQuantity = useSelector((state: RootStore) => {
        const index = 0;
        return state.cart.items[index]?.quantity || 0;
    });
    
    console.log(updateQuantity);
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

    const handleAddQuantity = () => {
        dispatch(addQuantity({ index: 0 }));
    } 

    const handleDecreaseQuantity = () => {
        dispatch(decreaseQuantity({ index: 0 }));
    }

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
                            <div className="mb-10">
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
                            <div className="flex justify-center flex-col items-center mt-20">
                                <div className="mb-10 flex">
                                    <button 
                                        className="w-[45px] h-[44px] cursor-pointer border border-[#ccc]"
                                        onClick={handleDecreaseQuantity}
                                    >-</button>
                                    <input 
                                        className="pl-10 bg-[#f7f7f7] w-[50px] h-[44px] text-center border-t border-b outline-none border-[#ccc]"
                                        type="number"
                                        value={updateQuantity}
                                        readOnly
                                    />
                                    <button 
                                        className="w-[45px] h-[44px] cursor-pointer border border-[#ccc]"
                                        onClick={handleAddQuantity}
                                    >+</button>
                                </div>
                                <div>
                                    <button 
                                        className="cursor-pointer uppercase font-[GucciSansPro-bold] bg-[#6774d5] text-white py-10 px-20 rounded-[23px]"
                                    >Add to cart</button>
                                </div>
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

