"use client"

import { Product } from "@/sanity.types";
import { AnimatePresence, motion } from "framer-motion"
import ProductThumb from "./ProductThumb";

function ProductGrid({ products }: { products: Product[] }) {
    return (
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {products?.map((product) => (
                    <AnimatePresence>
                        <motion.div key={product._id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ 
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.5,
                                    ease: "easeOut"
                                }
                            }}
                            exit={{ 
                                opacity: 0,
                                y: -20,
                                transition: {
                                    duration: 0.3
                                }
                            }}
                            whileHover={{ 
                                scale: 1.02,
                                transition: {
                                    duration: 0.2
                                }
                            }}
                            className="w-full transform transition-all duration-300"
                        >
                            <div className="h-full">
                                <ProductThumb key={product._id} product={product} />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                ))}
            </div>
        </div>
    );
}

export default ProductGrid;