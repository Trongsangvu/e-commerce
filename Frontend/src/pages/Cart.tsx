import { useQuery } from "@tanstack/react-query";
import { getCart } from "../services/cartService";
import { useDispatch, useSelector } from "react-redux";
import { addQuantity, decreaseQuantity } from "../redux/cart/cartSlice";
import { AppDispatch, RootStore } from "../redux/store";
import { setCartItems } from "../redux/cart/cartSlice";
import { useEffect } from "react";
import { CartItem } from "../redux/cart/cartSlice";
import { Footer } from '../components/layout/Footer';

export const Cart: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const updatedQuantity = useSelector((state: RootStore) => state.cart.items);

    // Query data
    const { data, isLoading, error } = useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
    });

    useEffect(() => {
        if (data?.data?.items) {
            const formattedItems: CartItem[] = data.data.items.map((item) => ({
                productId: item.productId._id,
                quantity: item.quantity,
            }));
            dispatch(setCartItems(formattedItems));
        }
    }, [data, dispatch]);

    if (isLoading) return <h3>Loading...</h3>
    if (error) return <h3>Error: {error.message}</h3>

    const cartItems = data?.data?.items ?? [];
    console.log("Cart Items:", cartItems);

    // Handle add quantity
    const handleAddQuantity = (index: number) => {
        dispatch(addQuantity({ index }));
    }

    // Handle decrease quantity
    const handleDecreaseQuantity = (index: number) => {
       dispatch(decreaseQuantity({ index })); 
    }

    return ( 
        <div className="mt-70">
            <div className="flex justify-center">
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
                        {cartItems.map((cart, index) => {
                            let priceString = String(cart.productId?.price); 
                            priceString = priceString.replace(/[^0-9.]/g, "");  // Ensure price is a number
                            const price = parseFloat(priceString) || 0; // Convert to number
                            // const quantity = Number(cart.quantity) || 0;
                            const quantity = updatedQuantity[index]?.quantity || cart.quantity || 0;
                            const total = (price * cart.quantity).toFixed(2);
                            return (
                                <tr className="border border-[#ccc] h-[185px]" key={index}>    
                                    <td className="pl-[50px] w-[133px]">
                                        <img className="w-[80px] h-[100px]" src={cart.productId.imageUrl} alt={cart.productId.name} />
                                    </td>
                                    <td className="font-[Poppins-regular] text-[#555] pl-10 w-[222px]">{cart.productId.name}</td>
                                    <td className="font-[Poppins-regular] text-[#555] w-[145px]">{cart.productId.price}</td>
                                    <td className="font-[Poppins-regular] text-[#555] w-[120px]">
                                        <div className="flex">
                                            <button 
                                                className="w-[45px] h-[44px] cursor-pointer border border-[#ccc]"
                                                onClick={() => handleDecreaseQuantity(index)}
                                            >-</button>
                                            <input 
                                                className="bg-[#f7f7f7] w-[50px] h-[44px] text-center border-t border-b outline-none border-[#ccc]"
                                                type="number"
                                                value={quantity}
                                                readOnly
                                            />
                                            <button 
                                                className="w-[45px] h-[44px] cursor-pointer border border-[#ccc]"
                                                onClick={() => handleAddQuantity(index)}
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
            <Footer />
        </div>
    );
}
