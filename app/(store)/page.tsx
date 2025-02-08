

import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import BlackFridayBanner from "@/components/BlackFridayBanner";


export default async function Home() {
  const [products, categories,] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  
  ]);

  return (
    <div>
   <BlackFridayBanner/>
      
      
      <div>
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
