import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootStore } from '../../redux/store';
import { productsList } from '../../services/product/productService';
import images from '../../assets/images/images';
import { Product } from '../../types/product-type';
import config from '../../config/config';

export const ProductList: React.FC = () => {
    // Query data
    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: productsList
    });

    const selectedCategory = useSelector((state: RootStore) => state.category.selectedCategory);

    // Filter products by categories
    const filteredProducts = selectedCategory === "all"
        ? products
        : products.filter((product: Product) => product.category === selectedCategory);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching products</p>;

    return (
        <>
            <div>
                <ul className='grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-6 place-items-center'>    
                    {filteredProducts && filteredProducts.map((product: Product) => (
                        <Link key={product._id} to={config.routes.productDetail.replace(':id', product._id)}>
                            <li className='mb-35 max-w-[270px] w-full mx-auto'>
                                <div className='max-w-[270px] w-full overflow-hidden relative group'>
                                    <img 
                                        className='max-w-[270px] w-full h-[335px] cursor-pointer transition-transform duration-500 group-hover:scale-110' 
                                        src={product.imageUrl} 
                                        alt={product.name} 
                                    />
                                    <button 
                                        className='absolute cursor-pointer flex justify-center hover:bg-[#222] hover:text-[white] hover:border-[#222] items-center mb-20 bottom-[-20px] left-1/2 -translate-x-1/2 bg-white rounded-[20px] min-w-[139px] h-[40px] font-[Poppins-regular] text-[#333] text-[12px] opacity-0 scale-50 transition-all duration-500 ease-out group-hover:bottom-2 group-hover:text-lg group-hover:opacity-100 group-hover:scale-90'
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Quick view
                                    </button>
                                </div>
                                <div className='flex items-start justify-between pt-14 max-w-[270px]'>
                                    <div className='flex flex-col'>
                                        <span className='text-[#999] pb-6 font-[Poppins-regular] text-sm'>{product.name}</span>
                                        <span className='text-[#666] font-[Poppins-regular] text-sm'>{product.price}</span>
                                    </div>
                                    <div className='flex'>
                                        <button>
                                            <img className='w-18 h-16' src={images.heartIcon} alt="" />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </>
    );
}