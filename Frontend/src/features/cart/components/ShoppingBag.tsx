import { useQuery } from "@tanstack/react-query"
import { getCart } from "../../../services/cart/cartService";
import { CircleExcelIcon } from "../../../assets/images/icons/icons";

export const ShoppingBag: React.FC = () => {
    // Query data
    const { data, isLoading, error } = useQuery({
        queryKey: ['shopping-bag'],
        queryFn: getCart
    });

    const cartItems = data?.data?.items ?? [];

    if(isLoading) return (
        <div>
            <div role="alert" className="flex gap-20">
                <div>
                    <CircleExcelIcon />
                </div>
                <div>
                    <span>Your shopping bag is empty</span>
                </div>
            </div>
        </div>
    );

    if(error) return <div>{`Error: ${error}`}</div>

    return (
        <div className="relative">
            <div className=" absolute right-2/3 w-[488px] h-[490px] bg-white">
                <h1>Shopping Bag</h1>
                <div>
                    <ul>
                        {cartItems.map((item, index) => {
                            if (index === 0) {
                                return (
                                        <li className="flex" key={index}>
                                            <div>
                                                <img className="w-[120px] h-[140px]" src={item.productId.imageUrl} alt={item.productId.name} />
                                            </div>
                                            <div>
                                                <div>{item.productId.name}</div>
                                                <div>{item.productId.price}</div>
                                            </div>
                                        </li>
                                    )
                                }
                            })}
                    </ul>
                </div>
            </div>
        </div>
    )
}