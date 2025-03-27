import { productsList } from "../../services/productService";
import { useQuery } from "@tanstack/react-query";
import { RootStore } from "../../redux/store";
import { useSelector } from "react-redux";
import { useState } from "react";

export const SuggestProducts: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsView = 5;
    const itemWidth = 230;
    const itemGap = 20;

    // Query data
    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: productsList
    });

    const productByCategory = useSelector((state: RootStore) => state.category.featureProductByWomen);

    // Filter products by category
    const filterProductsByCty = products.filter((product) => product.category === productByCategory)

    // Visible default products 
    // const visibleProducts = filterProductsByCty.slice(currentIndex, currentIndex + itemsView);
    const visibleProducts = Array.from({ length: itemsView }, (_, index) => {
        return filterProductsByCty[(currentIndex + index) % filterProductsByCty.length];
    });
    console.log(currentIndex, visibleProducts)

    // pagination
    const nextSlide = () => {
        setCurrentIndex(prev => 
            prev + 1 >= filterProductsByCty.length - itemsView + 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex(prev =>
            prev - 1 < 0 ? prev : prev - 1
        );
    };
    
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetcing products</p>;

    return (
        <div className="mt-[50px] pt-[50px]">
            <h3 className="uppercase font-[GucciSansPro-medium] pb-10">you may also like</h3>
            <div className="relative overflow-hidden max-w-auto">
                <ul 
                    className="flex gap-20 transition-transform duration-300 ease-in-out" 
                    style={{ 
                        transform: `translateX(-${currentIndex * (itemWidth + itemGap)}px)`
                    }}
                >
                    {visibleProducts.map((product, index) => (
                        <li
                            className="w-[230px] min-w-[230px] flex-none"
                            key={index}
                        >   
                            <div className="group relative overflow-hidden min-h-[300px]">
                                <img className="w-[230px] h-[300px] cursor-pointer transition-transform duration-500 group-hover:scale-110" src={product.imageUrl} alt={product.name} />
                            </div>
                            <p className="font-[GucciSansPro-light] pt-10 pb-6">{product.name}</p>
                            <p className="font-[GucciSansPro-book]">{product.price}</p>
                        </li>
                    ))}
                </ul>
                <button 
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-[90%] shadow-md"
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
        </div>
    );
}