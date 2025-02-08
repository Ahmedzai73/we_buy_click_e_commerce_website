import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";

async function BlackFridayBanner() {
    const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFZOAD25);
    
    if (!sale?.isActive) {
        return null;
    }

    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-800 to-black text-white px-4 sm:px-8 py-6 sm:py-8 mx-2 sm:mx-6 mt-4 rounded-2xl shadow-2xl border border-red-600 animate-fade-in">
            <div className="container mx-auto flex flex-row items-center justify-between text-center">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-black tracking-tight animate-bounce-slow">
                    {sale.title}
                </h2>
                
                <div className="bg-white text-red-600 px-4 sm:px-8 py-8 md:py-2 rounded-lg shadow-lg transform hover:scale-110 transition-all duration-300">
                    <span className="text-2xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold animate-pulse">
                        {sale.discountAmount}% OFF
                    </span>
                </div>
                

                <p className="text-base sm:text-md md:text-lg mx-1 font-medium text-gray-100 max-w-2xl leading-relaxed animate-fade-in-delay">
                    {sale.description}
                </p>

                <div className="group bg-white/95 backdrop-blur-lg text-black py-2 sm:py-3 px-4 sm:px-6 md:px-7 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 cursor-pointer border-2 border-red-200">
                    <div className="flex flex-col items-center gap-1">
                        <span className="font-bold text-xs sm:text-sm md:text-base text-gray-800">
                            Use code:
                        </span>
                        <span className="text-red-600 text-base sm:text-lg md:text-xl font-extrabold group-hover:text-red-700 transition-colors tracking-wider">
                            {sale.couponCode}
                        </span>
                    </div>
                </div>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-black rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-red-800 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
        </div>
    );
}

export default BlackFridayBanner;
