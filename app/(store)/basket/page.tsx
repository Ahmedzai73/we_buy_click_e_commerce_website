"use client";

// Import necessary components and utilities
import AddToBasketButton from "@/components/AddToBasketButton";
import { urlFor } from "@/sanity/lib/image";
import useBasketStore from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";

function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  if (groupedItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-lg">Start adding items to your cart!</p>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(), // example: ab3lks-aslks-k5sljs-lksj0f
        customerName: user?.fullName ?? "Unknown User",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown Email",
        clerkUserId: user!.id,
      };
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Cart Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groupedItems.map((item) => (
          <div
            key={item.product._id}
            className="border rounded-lg flex flex-col p-4 shadow-md transition-transform duration-300 hover:shadow-lg bg-gray-50"
          >
            <div
              className="flex items-center cursor-pointer"
              onClick={() =>
                router.push(`/product/${item.product.slug?.current}`)
              }
            >
              <div className="w-32 h-32 flex-shrink-0 rounded-md overflow-hidden mr-4">
                <Image
                  className="object-cover"
                  src={
                    item.product.image
                      ? urlFor(item.product.image).url()
                      : "/placeholder-image.png"
                  }
                  alt={item.product.name || "Product image"}
                  width={128}
                  height={128}
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.product.name}
                </h2>
                <p className="text-gray-600">Price: Rs.{item.product.price}</p>
                <p className="text-gray-600">
                  Total: Rs.
                  {((item.product.price ?? 0) * item.quantity).toFixed(0)}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <AddToBasketButton
                product={item.product}
                disabled={item.product.stock === 0}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800">Order Summary</h3>
        <p className="flex justify-between mt-4">
          <span>Items:</span>
          <span>
            {groupedItems.reduce((total, item) => total + item.quantity, 0)}
          </span>
        </p>
        <p className="flex justify-between text-2xl font-bold border-t pt-2 text-gray-800">
          <span>Total:</span>
          <span>Rs.{useBasketStore.getState().getTotalPrice().toFixed(0)}</span>
        </p>
        {isSignedIn ? (
          <button
            onClick={handleCheckout}
            disabled={isLoading}
            className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Checkout"}
          </button>
        ) : (
          <SignInButton mode="modal">
            <Button className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200">
              Sign In to Checkout
            </Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}

export default BasketPage;
