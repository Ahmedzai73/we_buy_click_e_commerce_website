import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";

function ProductThumb({ product }: { product: Product }) {
    const isOutOfStock = product.stock != null && product.stock <= 0;

    return (
        <Link
            href={`/product/${product.slug?.current}`}
            className={`group relative flex flex-col bg-white rounded-2xl border border-gray-100 
            shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full
            transform hover:-translate-y-1 ${isOutOfStock ? "opacity-75 hover:opacity-90" : ""}`}
        >
            {/* Image Container */}
            <div className="relative aspect-square w-full overflow-hidden">
                <Image
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                    src={product.image ? urlFor(product.image)?.url() ?? "/placeholder-image.png" : "/placeholder-image.png"}
                    alt={product.name || "Product image"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority
                />

                {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-[2px]">
                        <span className="text-white font-bold text-lg px-4 py-2 bg-red-600 rounded-lg shadow-lg">
                            Out of Stock
                        </span>
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="p-4 sm:p-5 flex flex-col flex-1">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                    {product.name}
                </h2>
                
                <div className="flex-1 min-h-[4rem]">
                    <p className="text-sm sm:text-base text-gray-600 line-clamp-2 mt-2">
                        {product.description
                            ?.map((block) =>
                                block._type === "block"
                                    ? block.children?.map((child) => child.text).join("") 
                                    : ""
                            )
                            .join("") || "No description available"}
                    </p>
                </div>

                <div className="mt-4">
                    <div className="flex items-center space-x-3">
                        <p className="text-xl sm:text-2xl font-bold text-red-600">
                            Rs.{product.price?.toFixed(0)}
                        </p>
                        {product.oldPrice && (
                            <p className="text-base sm:text-lg text-gray-400 line-through">
                                Rs.{product.oldPrice?.toFixed(0)}
                            </p>
                        )}
                    </div>

                    {!isOutOfStock && (
                        <div className="mt-3 inline-flex items-center text-sm text-green-600">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            In Stock
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default ProductThumb;