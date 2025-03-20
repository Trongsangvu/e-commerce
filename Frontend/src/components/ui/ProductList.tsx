import { useQuery } from '@tanstack/react-query';
import { productsList } from '../../services/productService';
import images from '../../assets/images/images';

export const ProductList: React.FC = () => {
    // Query data
    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: productsList
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching products</p>;

    return (
        <>
            <div>
                <ul className='grid grid-cols-4'>    
                    {products && products.map((product) => (
                        <li 
                            key={product._id} 
                            className='mb-35 w-[270px]'
                        >
                            <div className='overflow-hidden relative group'>
                                <img 
                                    className='w-full h-[335px] cursor-pointer transition-transform duration-500 group-hover:scale-110' 
                                    src={product.imageUrl} 
                                    alt={product.name} 
                                />
                                <a href="#" className='absolute flex justify-center hover:bg-[#222] hover:text-[white] hover:border-[#222] items-center mb-20 bottom-[-20px] left-1/2 -translate-x-1/2 bg-white rounded-[20px] min-w-[139px] h-[40px] font font-[Poppins-regular] text-[#333] text-[12px] opacity-0 scale-50 transition-all duration-500 ease-out group-hover:bottom-2 group-hover:text-lg group-hover:opacity-100 group-hover:scale-90'>
                                    Quick view
                                </a>
                            </div>
                            <div className='flex items-start justify-between pt-14 max-w-[270px]'>
                                <div className='flex flex-col'>
                                    <span className='text-[#999] pb-6 font font-[Poppins-regular] text-sm'>{product.name}</span>
                                    <span className='text-[#666] font font-[Poppins-regular] text-sm'>{product.price}</span>
                                </div>
                                <div className='flex'>
                                    <a href="#">
                                        <img className='w-18 h-16' src={images.heartIcon} alt="" />
                                    </a>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}