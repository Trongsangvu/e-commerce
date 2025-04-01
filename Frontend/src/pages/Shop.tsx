import { Header } from "../components/layout/Header"
import { Footer } from "../components/layout/Footer";
import { Container } from "../features/home/component/Container";
import { ProductList } from '../components/ui/ProductList';

export const Shop: React.FC = () => {
    return (
        <div>
            <div>
                <Header />
            </div>
            <main className="container px-[173px] max-w-[1600px] h-auto mt-100">
                <Container showTitle={false}/>  
                <div>
                    <ProductList/>
                </div>
            </main>   
            <Footer />         
        </div>
    );
}