import { useQuery } from "@tanstack/react-query"
import { getCart } from "../../../services/cart/cartService";
import { CircleExcelIcon } from "../../../assets/images/icons/icons";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    isVisible: boolean;
    handleShowBag: () => void;
}

const ShoppingBagComponent: React.FC<Props> = ({ isVisible, handleShowBag }) => {
    const navigate = useNavigate();

    const handleCheckout = () => {
        handleShowBag();
        navigate('/cart');
    }

    // Query data
    const { data, isLoading } = useQuery({
        queryKey: ['shopping-bag'],
        queryFn: getCart
    });

    const cartItems = data?.data?.items ?? [];

    if(isLoading) return (
        <div className={`
            bg-white pl-15 pr-17 pb-15 pt-12 rounded-[4px] w-[300px] shadow-[#ccc]
            absolute top-0 left-1/2 -translate-x-1/2
            transition-all duration-500 ease-in-out transform
            ${isVisible ? 'translate-y-0 opacity-100 visible' : '-translate-y-10 opacity-0 invisible'}
          `}>
            <div role="alert" className="flex gap-20">
                <div>
                    <CircleExcelIcon />
                </div>
                <div>
                    <span className="font-[GucciSansPro-light] text-[13px] text-[black]">Your shopping bag is empty</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="relative">
            <div className={`absolute left-[120px] w-[488px] h-[490px] bg-white
            `}>
                <div className="flex border-b-1 border-[#ccc] px-30 items-center">
                    <h2 className="uppercase font-[GucciSansPro-bold] text-[#000] tracking-[-0.03rem] py-20 w-[400px] text-center">adding to Shopping Bag</h2>
                    <div className="py-20">
                        <button 
                            className="cursor-pointer"
                            onClick={handleShowBag}    
                        >x</button>
                    </div>
                </div>
                <div className="px-10 pt-20  border-b-1 border-[#ccc]">
                    <ul>
                        {cartItems.map((item, index) => {
                            if (index < 2) {
                                return (
                                        <li className="flex mb-20" key={index}>
                                            <div>
                                                <img className="w-[120px] h-[140px] cursor-pointer" src={item.productId.imageUrl} alt={item.productId.name} />
                                            </div>
                                            <div className="ml-15">
                                                <div>
                                                    <strong className="font-[GucciSansPro-medium-bold] text-[12px] text-[#000] uppercase tracking-[-0.05rem]">
                                                        {item.productId.name}
                                                    </strong>
                                                </div>
                                                <div className="font-[GucciSansPro-light] mt-12">{item.productId.price}</div>
                                                <div className="font-[GucciSansPro-light] tracking-[-0.03rem] text-[13px] text-[#000] mt-20">Quantity: {item.quantity}</div>
                                            </div>
                                        </li>
                                    )
                                }
                            })}
                    </ul>
                </div>
                <div className="my-16 mx-24">
                    <div className="flex justify-center items-center w-[440px] h-[48px] bg-[#000] rounded-[2px] cursor-pointer">
                        <button className="cursor-pointer uppercase font-[GucciSansPro-bold] text-[#fff] tracking-[-0.03rem] text-[12px]"
                            // onClick={handleCheckout}
                        >checkout</button>
                    </div>
                    <div className="flex justify-center items-center w-[440px] h-[48px] bg-[#fff] rounded-[2px] cursor-pointer mt-20 border-1">
                        <button className="cursor-pointer uppercase font-[GucciSansPro-bold] text-[#000] tracking-[-0.03rem] text-[12px]"
                            onClick={handleCheckout}
                        >view shopping bag</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ShoppingBag = memo(ShoppingBagComponent);