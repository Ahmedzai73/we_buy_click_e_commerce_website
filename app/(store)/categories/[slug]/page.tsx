import ProductsView from "@/components/ProductsView"; // Importing the ProductsView component to display products
import { getAllCategories } from "@/sanity/lib/products/getAllCategories"; // Importing function to fetch all categories
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory"; // Importing function to fetch products by category

// Async function to handle the category page rendering
async function CategoryPage({ params }: { params: { slug: string } }) {
    const { slug } = params; // Directly destructuring slug from params

    // Fetching products based on the category slug and handling potential errors
    const products = await getProductsByCategory(slug).catch((error) => {
        console.error("Error fetching products:", error);
        return []; // Return an empty array if there's an error
    });

    // Fetching all categories and handling potential errors
    const categories = await getAllCategories().catch((error) => {
        console.error("Error fetching categories:", error);
        return []; // Return an empty array if there's an error
    });

    // Transform the slug into a formatted title for display
    const title = slug
        .split("-") // Splitting the slug into words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalizing the first letter of each word
        .join(" ") + " Collection"; // Joining words back into a string and appending " Collection"

    return (
        <div className="bg-red-600"> {/* Main container with a red background */}
            <main className="min-h-screen bg-gray-100 p-6 flex flex-col"> {/* Main content area */}
                <div className="container mx-auto bg-white p-10 rounded-xl shadow-lg uppercase"> {/* Inner container for content */}
                    <header className="mb-8 py-3 bg-zinc-600 rounded-lg"> {/* Header section */}
                        <h1 className="text-4xl sm:text-5xl font-bold text-center text-white"> {/* Title of the category */}
                            {title} {/* Displaying the formatted title */}
                        </h1>
                    </header>
                    <section aria-label="Products Collection"> {/* Section for products */}
                        <ProductsView products={products} categories={categories} /> {/* Rendering the ProductsView with fetched products and categories */}
                    </section>
                </div>
            </main>
        </div>
    );
}

export default CategoryPage; // Exporting the CategoryPage component for use in other parts of the application
