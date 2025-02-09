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
        .join(" "); // Joining words back into a string

    return (
        <div className="bg-gradient-to-r from-gray-50 to-red-100 min-h-screen flex items-center justify-center"> {/* Main container with a gradient background */}
            <main className="container mx-auto p-12 bg-white  flex flex-col"> {/* Main content area */}
                <header className="mb-12 py-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700"> {/* Header section with reduced height for a professional style */}
                    <h1 className="text-4xl font-bold text-center text-white"> {/* Title of the category */}
                        {title} {/* Displaying the formatted title */}
                    </h1>
                </header>
                <section aria-label="Products Collection" className="flex flex-col items-center"> {/* Section for products */}
                    <ProductsView products={products} categories={categories} /> {/* Rendering the ProductsView with fetched products and categories */}
                </section>
                <footer className="mt-12 text-center text-gray-700"> {/* Footer section */}
                    <p className="text-lg font-medium">Discover our exclusive collection and find your perfect match!</p>
                </footer>
            </main>
        </div>
    );
}

export default CategoryPage; // Exporting the CategoryPage component for use in other parts of the application
