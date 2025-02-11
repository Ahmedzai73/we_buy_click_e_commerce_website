
    import { urlFor } from "@/sanity/lib/image";
    import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
    import { PortableText } from "next-sanity";
    import { notFound } from "next/navigation";
    import AddToBasketButton from "@/components/AddToBasketButton";
    import Image from "next/image";

    // Define the shape of the route parameters
    interface Params {
      slug: string;
    }

    // Asynchronous function to fetch and display the product page
    async function ProductPage({ params }: { params: Params }) {
      const { slug } = params;
      
      // Fetch the product data based on the slug
      const product = await getProductBySlug(slug);

      // If no product is found, display a 404 page
      if (!product) {
        return notFound();
      }

      // Determine if the product is out of stock
      const isOutOfStock = product.stock != null && product.stock <= 0;

      return (
        <section className="bg-gray-50 min-h-screen py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                
                {/* Image Section */}
                <div className="lg:w-1/2 p-6">
                  <div className="relative aspect-square">
                    <Image
                      alt={product.name || "Product image"} // Alternative text for the image
                      className="object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                      src={product.image ? urlFor(product.image).url() : "/placeholder-image.png"} // Product image or placeholder
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw" // Responsive image sizes
                      priority // Prefetch the image for better performance
                      quality={90} // Image quality setting
                    />
                  </div>
                </div>
                
                {/* Product Details Section */}
                <div className="lg:w-1/2 p-8 lg:p-12">
                  <div className="space-y-8">
                    
                    {/* Product Title */}
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                      {product.name}
                    </h1>
                    
                    {/* Price Section */}
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl font-bold text-red-600">
                        Rs.{product.price?.toFixed(0)}
                      </span>
                      {product.oldPrice && (
                        <span className="text-xl text-gray-500 line-through">
                          Rs.{product.oldPrice.toFixed(0)}
                        </span>
                      )}
                    </div>
                    
                    {/* Stock Status */}
                    <div className="flex items-center">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          isOutOfStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {isOutOfStock ? 'Out of Stock' : 'In Stock'}
                      </span>
                    </div>
                    
                    {/* Description */}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                    <hr className="border-t-2 border-red-500 my-4" />
                      <div className="prose prose-sm lg:prose-base text-gray-600">
                        {Array.isArray(product.description) && (
                          <PortableText value={product.description} /> // Render rich text description
                        )}
                      </div>
                            
                            
                    </div>
                    
                    {/* Add to Basket Button */}
                    <div className="pt-6">
                      <AddToBasketButton product={product} disabled={isOutOfStock} /> {/* Button to add product to basket */}
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </section>
      );
    }

    export default ProductPage;
