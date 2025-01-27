import Header from '@/components/Header';
import ProductList from '@/components/ProductList';
import IProduct from '@/types/products';
export default async function Home() {
  const response = await fetch(
    'https://sanity-nextjs-rouge.vercel.app/api/foods'
  );

  const products: IProduct[] = await response.json();

  return (
    <>
    
        <Header />
        <ProductList products={products} />
    </>
  );
}
