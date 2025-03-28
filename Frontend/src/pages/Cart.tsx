import { useQuery } from "@tanstack/react-query";
import { getCart } from "../services/cartService";

export const Cart: React.FC = () => {
    // Query data
    const { data, isLoading, error } = useQuery({
        queryKey: ['cart'],
        queryFn: getCart
    });

    if (isLoading) return <h3>Loading...</h3>
    if (error) return <h3>Error: {error.message}</h3>

    const cartItems = data?.data?.items ?? [];
    console.log("Cart Items:", cartItems);

    return ( 
        <div className="mt-70">
            <div className="flex justify-center">
                <table>
                    <thead>
                        <tr>
                            <th>product</th>
                            <th></th>
                            <th>price</th>
                            <th>quantity</th>
                            <th>total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((cart, index) => (
                            <tr key={index}>
                                <td>
                                    <img className="w-50 h-50" src={cart.productId.imageUrl} alt={cart.productId.name} />
                                </td>
                                <td>{cart.productId.price}</td>
                                <td>{cart.quantity}</td>
                                <td>{(cart.productId.price * cart.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
