import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { addQuantity, decreaseQuantity } from "../../../redux/cart/cartSlice";
import { AppDispatch, RootStore } from "../../../redux/store";
import { updatedCartAction } from "../../../redux/cart/cartAction";
import { getCart } from "../../../services/cart/cartService";
import { setCartItems } from "../../../redux/cart/cartSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartItem } from "../../../redux/cart/cartSlice";
import { Footer } from '../../../components/layout/Footer';
import images from "../../../assets/images/images";
import config from "../../../config/config";
import { ICartItem } from "../../../types/cart-type";

export const Cart: React.FC = () => {
    const [selectedValue, setSelectedValue] = useState('option1');

    const dispatch = useDispatch<AppDispatch>();
    const updatedQuantity = useSelector((state: RootStore) => state.cart.items);

    // Query data
    const { data, isLoading, error } = useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
    });

    useEffect(() => {
        if (data?.data?.items) {
            const formattedItems: CartItem[] = data.data.items.map((item: ICartItem) => ({
                productId: item.productId._id,
                quantity: item.quantity,
            }));
            dispatch(setCartItems(formattedItems));
        }
    }, [data, dispatch]);

    if (isLoading) return <h3>Loading...</h3>
    if (error) return <h3>Error: {error.message}</h3>

    // Cart items
    const cartItems = data?.data?.items ?? [];
    console.log("Cart Items:", cartItems);

    // Handle update cart
    const handleUpdateCart = (index: number, type: 'increase' | 'decrease') => {
        const item = cartItems[index];
        if(!item) return;

        const newQuantity = type === 'increase' ? item.quantity + 1 : item.quantity - 1;

        dispatch(type === 'increase' ? addQuantity({ index }) : decreaseQuantity({ index }));
        dispatch(updatedCartAction({ productId: item.productId._id, quantity: newQuantity }));
    }

    return ( 
        <div>
            <div className="mt-[90px] pb-[85px]">
                <div className="flex items-center justify-start max-w-[680px] mb-[20px]">
                    <Link to={config.routes.home}>
                        <span className="pl-[150px] font-[Poppins-regular] text-sm text-[#555]">Home</span>
                    </Link>
                    <span>
                        <img className="w-[20px] h-[30px]" src={images.angleRight} alt="" />
                    </span>
                    <span className="font-[Poppins-regular] text-sm text-[#999]">Shopping Cart</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr]">
                    <div className="pl-[150px]">
                        <table className="min-w-[680px]">
                            <thead className="border border-[#ccc]">
                                <tr>
                                    <th className="py-15 pl-[50px] font-[Poppins-bold] text-start uppercase text-sm text-[#555]">product</th>
                                    <th className="py-15 w-[173px]"></th>
                                    <th className="py-15 font-[Poppins-bold] text-start uppercase text-sm text-[#555]">price</th>
                                    <th className="py-15 font-[Poppins-bold] text-center uppercase text-sm text-[#555]">quantity</th>
                                    <th className="py-15 pl-[50px] pr-[50px] text-center font-[Poppins-bold] uppercase text-sm text-[#555]">total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((cart:ICartItem, index: number) => {
                                    let priceString = String(cart.productId?.price); 
                                    priceString = priceString.replace(/[^0-9.]/g, "");  // Ensure price is a number
                                    const price = parseFloat(priceString) || 0; // Convert to number
                                    const quantity = updatedQuantity[index]?.quantity || cart.quantity || 0;
                                    const total = (price * cart.quantity).toFixed(2);
                                    return (
                                        <tr className="border border-[#ccc] h-[185px]" key={index}>    
                                            <td className="pl-[50px] w-[133px]">
                                                <img className="w-[80px] h-[100px] cursor-pointer" src={cart.productId.imageUrl} alt={cart.productId.name} />
                                            </td>
                                            <td className="font-[Poppins-regular] text-[#555] pl-10 w-[222px]">{cart.productId.name}</td>
                                            <td className="font-[Poppins-regular] text-[#555] w-[145px]">{cart.productId.price}</td>
                                            <td className="font-[Poppins-regular] text-[#555] w-[120px]">
                                                <div className="flex">
                                                    <button 
                                                        className="w-[45px] h-[44px] cursor-pointer border border-[#ccc]"
                                                        onClick={() => handleUpdateCart(index, "decrease")}
                                                    >-</button>
                                                    <input 
                                                        className="bg-[#f7f7f7] w-[50px] h-[44px] text-center pl-10 border-t border-b outline-none border-[#ccc]"
                                                        type="number"
                                                        value={quantity}
                                                        readOnly
                                                    />
                                                    <button 
                                                        className="w-[45px] h-[44px] cursor-pointer border border-[#ccc]"
                                                        onClick={() => handleUpdateCart(index, "increase")}
                                                    >+</button>
                                                </div>
                                            </td>
                                            <td className="font-[Poppins-regular] text-center text-[#555] w-[172px]">${total}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="border border-[#e6e6e6] mr-[40px] w-[470px]">
                        <div className="px-[40px] py-[30px] h-auto">
                            <h3 className="uppercase font-[Poppins-bold] pb-[30px]">cart totals</h3>
                            <div>
                                <div className="pb-13 border-b border-dashed border-[#d9d9d9]">
                                    <span className="font-[Poppins-regular] text-[#333]">Total: </span>
                                    <span className="font-[Poppins-regular] ml-[45px]"> 
                                        ${cartItems.reduce((total: number, item: ICartItem) => {
                                            const price = parseFloat(String(item.productId?.price).replace(/[^0-9.]/g, "")) || 0;
                                            return total + (price * item.quantity);
                                        }, 0).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex flex-row gap-20 pt-15 pb-[30px] border-b border-dashed border-[#d9d9d9]">
                                    <div className="w-[1/3]">
                                        <span className="font-[Poppins-regular]">Shipping:</span>
                                    </div>
                                    <div className="w-2/3">
                                        <p className="font-[Poppins-regular] text-[#888]">
									        There are no shipping methods available. Please double check your address, or contact us if you need any help.
                                        </p>
                                        <div className="pt-20">
                                            <span className="font-[Poppins-regular] uppercase text-[#555]">calculate shipping</span>
                                            <div className="relative">
                                                <select 
                                                    value={selectedValue} 
                                                    onChange={(e) => setSelectedValue(e.target.value)}
                                                    name="time" 
                                                    className="mt-20 mb-20 appearance-none font-[Poppins-regular] text-[#555] w-[190px] h-[47px] pl-[20px] py-[10px] border border-gray-300 bg-white rounded-[4px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                >
                                                    <option value="option1"  className="font-[Poppins-regular] text-[#555]"  disabled>Select a country...</option>
                                                    <option value="option2"  className="font-[Poppins-regular] text-[#555]">Vietnam</option>
                                                    <option value="option3"  className="font-[Poppins-regular] text-[#555]">US</option>
                                                    <option value="option4"  className="font-[Poppins-regular] text-[#555]">Australia</option>
                                                </select>
                                                <span className="absolute inset-y-0 right-[90px] flex items-center px-2 pointer-events-none">
                                                    <img className="w-[15px] h-[15px]" src={images.angleDown} alt="angleDown" />
                                                </span>
                                            </div>
                                            <div className="pb-20">
                                                <div className="mt-20 inline-block border border-[#e6e6e6] rounded-[22px] px-[30px] py-15 bg-[#f3f3f3]">
                                                    <button 
                                                        className="font-[Poppins-medium] inline-block cursor-pointer uppercase text-[#333]"

                                                    >
                                                        update totals
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-20">
                                    <button className="text-white cursor-pointer bg-[#222] rounded-[22px] py-15 px-[30px] uppercase">proceed to checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
