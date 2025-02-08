import React from "react";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { notFound } from "next/navigation";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import { PortableText } from "next-sanity";

import AddToBasketButton from "@/components/AddToBasketButton";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {product.name}
        </h1>
      </div>
    </div>
  );
}

export default ProductPage;




