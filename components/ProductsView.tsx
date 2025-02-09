import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import  CategorySelectorComponent  from "./ui/category-selector";

interface ProductsViewProps {
    products: Product[];
    categories: Category[];
}

const ProductsView: React.FC<ProductsViewProps> = ({ products, categories }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-4 w-full">
            {/* categories */}
            <div className="w-full sm:w-[200px] shrink-0">
                <CategorySelectorComponent categories={categories} />
            </div>

            {/* products */}
            <div className="flex-1">
                <ProductGrid products={products} />
                <hr className="w-1/2 sm:w-3/4 mt-4" />
            </div>
        </div>
    );
};

export default ProductsView;