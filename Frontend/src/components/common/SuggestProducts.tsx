import { productsList } from "../../services/productService";
import { useQuery } from "@tanstack/react-query";
import { RootStore } from "../../redux/store";
import { useSelector } from "react-redux";
import { useState } from "react";

export const SuggestProducts: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsView = 5;

    // Query data
    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: productsList
    });

    const productByCategory = useSelector((state: RootStore) => state.category.featureProductByWomen);

    // Filter products by category
    const filterProductsByCty = products.filter((product) => product.category === productByCategory)

    // Visible default products 
    const visibleProducts = filterProductsByCty.slice(currentIndex, currentIndex + itemsView);

    // pagination
    const nextSlide = () => {
        setCurrentIndex(prev => 
            prev + itemsView >= filterProductsByCty.length ? 0 : prev + itemsView
        );
    };

    const prevSlide = () => {
        setCurrentIndex(prev =>
            prev - itemsView < 0 ? Math.max(filterProductsByCty.length - itemsView, 0)
            : prev - itemsView
        );
    };
    
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetcing products</p>;

    return (
        <div className="mt-[50px] pt-[50px]">
            <h3 className="uppercase font-[GucciSansPro-medium] pb-10">you may also like</h3>
            <div className="relative overflow-hidden">
                <ul 
                    className="flex gap-20 transition-transform duration-300" 
                    style={{ transform: `translateX(-${currentIndex * (230 + 20)}px)` }}
                >
                    {visibleProducts.map((product, index) => (
                        <li key={index}>
                            <img className="w-[230px] h-[300px] cursor-pointer" src={product.imageUrl} alt={product.name} />
                            <p className="font-[GucciSansPro-light] py-10">{product.name}</p>
                            <p className="font-[GucciSansPro-book]">{product.price}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
            >
                ←
            </button>
            <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
            >
                →
            </button>
        </div>
    );
}