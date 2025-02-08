"use client";
import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import useBasketStore from "@/store/store";

// Custom Hook for Basket Item Count
function useBasketItemCount() {
    const items = useBasketStore((state) => state.items);
    return useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);
}

function Header() {
    const { user } = useUser();
    const itemCount = useBasketItemCount();

    const createClerkPasskey = async () => {
        try {
            const response = await user?.createPasskey();
            console.log(response);
            alert("Passkey created successfully!"); // Or use a toast library
        } catch (error) {
            console.error("Error:", JSON.stringify(error, null, 2));
            alert("Failed to create passkey. Please try again."); // Or use a toast library
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            {/* Top Row */}
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 sm:py-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 transition duration-300 transform hover:scale-100" aria-label="Buyclik Home">
                        <Image
                            src="/webuyclicklogo.png"
                            alt="Buyclik Logo"
                            width={170}
                            height={50}
                            className="h-12 w-auto sm:h-16"
                        />
                    </Link>

                    {/* Desktop Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-4">
                        <form action="/search" className="w-full">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="query"
                                    placeholder="Search for products..."
                                    className="w-full bg-gray-50 text-gray-800 pl-4 pr-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white border border-gray-200 transition-all"
                                    aria-label="Search products"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                    aria-label="Submit search"
                                >
                                    <svg
                                        className="w-5 h-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Actions Section */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        {/* Cart Button */}
                        <Link
                            href="/basket"
                            className="relative flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2.5 rounded-full hover:from-red-600 hover:to-red-700 transition-all shadow-sm hover:shadow-md"
                            aria-label="View Cart"
                        >
                            <TrolleyIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                            {itemCount > 0 && (
                                <span
                                    className="absolute -top-2 -right-2 bg-orange-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center font-semibold shadow-sm"
                                    title={`${itemCount} items in cart`}
                                >
                                    {itemCount}
                                </span>
                            )}
                            <span className="hidden sm:inline text-sm font-medium">Cart</span>
                        </Link>

                        {/* Orders Button */}
                        <ClerkLoaded>
                            <SignedIn>
                                <Link
                                    href="/orders"
                                    className="hidden sm:flex items-center space-x-2 bg-white text-red-600 px-4 py-2.5 rounded-full border border-red-600 hover:bg-red-50 transition-all shadow-sm hover:shadow-md"
                                    aria-label="View Orders"
                                >
                                    <PackageIcon className="w-5 h-5" />
                                    <span className="text-sm font-medium">Orders</span>
                                </Link>
                            </SignedIn>
                            <div className="flex items-center gap-4">
                                {user ? (
                                    <div className="flex items-center gap-3">
                                        <UserButton
                                            appearance={{
                                                elements: {
                                                    avatarBox: "w-10 h-10 rounded-full border-2 border-red-500",
                                                },
                                            }}
                                        />
                                        <div className="hidden lg:block text-sm">
                                            <p className="text-gray-600">Welcome Back,</p>
                                            <p className="font-semibold text-gray-900">
                                                {user.fullName || "Guest"}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <SignInButton mode="modal">
                                        <button
                                            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 px-4 rounded-full transition-all"
                                            aria-label="Sign In"
                                        >
                                            Sign In
                                        </button>
                                    </SignInButton>
                                )}
                                {user?.passkeys.length === 0 && (
                                    <button
                                        onClick={createClerkPasskey}
                                        className="hidden sm:block bg-white hover:bg-red-50 text-red-600 font-medium py-2.5 px-4 rounded-full border border-red-200 transition-all hover:border-red-300"
                                        aria-label="Create Passkey"
                                    >
                                        Create Passkey
                                    </button>
                                )}
                            </div>
                        </ClerkLoaded>
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="block md:hidden border-t border-gray-100">
                <div className="px-4 py-3">
                    <form action="/search" className="w-full">
                        <div className="relative">
                            <input
                                type="text"
                                name="query"
                                placeholder="Search for products..."
                                className="w-full bg-gray-50 text-gray-800 pl-4 pr-10 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white border border-gray-200 transition-all"
                                aria-label="Search products"
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                aria-label="Submit search"
                            >
                                <svg
                                    className="w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </header>
    );
}

export default Header;