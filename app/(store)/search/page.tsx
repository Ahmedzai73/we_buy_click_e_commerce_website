import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{
        query: string;
    }>;
}) {
    const { query } = await searchParams;
    const products = await searchProductsByName(query);
    const categories = await getAllCategories();

    if (!products.length) {
        return (
            <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-screen">
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            No results found for {query}
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We couldn&quot;t find any products matching your search. Try using different keywords or check your spelling.
                        </p>
                        <div className="mt-8">
                            <div className="inline-flex items-center justify-center space-x-2 text-sm text-gray-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <span>Try searching for something else</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-screen">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-4">Search Results</h1>
                    <p className="text-lg text-gray-600">
                        Found {products.length} {products.length === 1 ? 'product' : 'products'} for {query}
                    </p>
                </div>
                <ProductsView products={products} categories={categories} />
            </div>
        </div>
    );
}

export default SearchPage;
