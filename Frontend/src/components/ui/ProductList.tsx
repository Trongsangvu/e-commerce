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
                        <li key={product._id} className='mb-35'>
                            <div className='overflow-hidden w-[270px]'>
                                <a href="#" className='block'>
                                    <img 
                                        className='w-full max-w-[270px] h-[335px] transition-transform duration-500 hover:scale-110' 
                                        src={product.imageUrl} 
                                        alt={product.name} 
                                    />
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