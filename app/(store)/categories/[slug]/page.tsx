// app/(store)/categories/[slug]/page.tsx

import React from "react";
import ProductsView from "../../../../components/ProductsView";

import { getAllCategories } from "../../../../sanity/lib/products/getAllCategories";
import { getProductsByCategory } from "../../../../sanity/lib/products/getProductsByCategory";

interface CategoryPageProps {
    params: {
        slug: string;
    };
}

interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    // Add other relevant fields based on your product structure
}

interface Category {
    id: string;
    name: string;
    slug: string;
    // Add other relevant fields based on your category structure
}

async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = params;

    let products: Product[] = [];
    let categories: Category[] = [];
    let productsError: string | null = null;
    let categoriesError: string | null = null;

    try {
        const fetchedProducts = await getProductsByCategory(slug);
        if (fetchProductsSuccess(fetchedProducts)) {
            products = fetchedProducts;
        } else {
            productsError = "Failed to load products.";
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        productsError = "An unexpected error occurred while fetching products.";
    }

    try {
        const fetchedCategories = await getAllCategories();
        if (fetchCategoriesSuccess(fetchedCategories)) {
            categories = fetchedCategories;
        } else {
            categoriesError = "Failed to load categories.";
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
        categoriesError = "An unexpected error occurred while fetching categories.";
    }

    const formattedTitle =
        slug
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
                    {productsError ? (
                        <p className="text-center text-red-600">{productsError}</p>
                    ) : products.length > 0 ? (
                        <ProductsView products={products} categories={categories} />
                    ) : (
                        <p className="text-center text-gray-600">No products found for this category.</p>
                    )}
                </section>
                {categoriesError && (
                    <section className="mt-4">
                        <p className="text-center text-red-600">{categoriesError}</p>
                    </section>
                )}
            </main>
        </div>
    );
}

export default CategoryPage;

/**
 * Placeholder functions to check fetch success.
 * Replace these with actual logic based on your API responses.
 */
function fetchProductsSuccess(fetchedProducts: any): fetchedProducts is Product[] {
    return Array.isArray(fetchedProducts);
}

function fetchCategoriesSuccess(fetchedCategories: any): fetchedCategories is Category[] {
    return Array.isArray(fetchedCategories);
}