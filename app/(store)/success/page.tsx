"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useBasketStore from "@/store/store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function SuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || ""; // Ensure orderNumber is a string
  const clearBasket = useBasketStore((state) => state.clearBasket);
  // const categorySlug = searchParams.get("categorySlug") || "defaultCategory"; // Provide a default value

  useEffect(() => {
    if (orderNumber && orderNumber !== "undefined") { // Check if orderNumber is not "undefined"
      clearBasket();
    }
  }, [orderNumber, clearBasket]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-xl max-w-lg w-full mx-4">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-red-100 rounded-full flex items-center justify-center shadow-md">
            <svg
              className="h-10 w-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-semibold mb-4 text-center text-gray-800">
          Order Confirmed!
        </h1>
        <p className="text-lg text-gray-600 mb-4 text-center">
          Thank you for your order! It will be shipped shortly.
        </p>
        <div className="border-t border-b border-gray-300 py-4 mb-4">
          {orderNumber && (
            <p className="text-gray-700 flex justify-center items-center space-x-2">
              <span className="font-semibold">Order Number:</span>
              <span className="font-mono text-sm text-red-600">
                {orderNumber}
              </span>
            </p>
          )}
        </div>
        <p className="text-gray-600 text-center mb-6">
          A confirmation email has been sent to your registered email address.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-red-600 hover:bg-red-700 transition duration-200 text-white">
            <Link href="/orders">View Order Details</Link>
          </Button>
          <Button asChild variant="outline" className="transition duration-200 text-gray-700 border-gray-300">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
