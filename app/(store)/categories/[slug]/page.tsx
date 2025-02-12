import ProductsView from "../../../../components/ProductsView";
import { getAllCategories } from "../../../../sanity/lib/products/getAllCategories";
import { getProductsByCategory } from "../../../../sanity/lib/products/getProductsByCategory";

interface CategoryPageProps {
    params: {
        slug: string;
    };
}

async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = params;

    let products = [];
    let categories = [];

    try {
        products = await getProductsByCategory(slug);
    } catch (error) {
        console.error("Error fetching products:", error);
    }

    try {
        categories = await getAllCategories();
    } catch (error) {
        console.error("Error fetching categories:", error);
    }

    const formattedTitle = slug
        .replace(/-/g, " ") // Replace hyphens with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()) + " Collection";

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <main className="container mx-auto bg-white p-10 rounded-xl shadow-lg">
                <header className="mb-8 py-3 bg-zinc-600 rounded-lg text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white">
                        {formattedTitle}
                    </h1>
                </header>
                <section aria-label="Products Collection">
                    {products.length > 0 ? (
                        <ProductsView products={products} categories={categories} />
                    ) : (
                        <p className="text-center text-gray-600">No products found for this category.</p>
                    )}
                </section>
            </main>
        </div>
    );
}

export default CategoryPage;
