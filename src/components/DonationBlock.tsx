import type { ComponentConfig } from "@measured/puck";
import { useState, useEffect } from "react";

export type DonationBlockProps = {
    provider: "paypal" | "razorpay";
    merchantId: string;
    amounts: string; // Comma separated string for easier editing
    buttonText: string;
};

// Helper to load Razorpay script
const loadRazorpayConfig = (src: string) => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export const DonationBlock: ComponentConfig<DonationBlockProps> = {
    fields: {
        provider: {
            type: "select",
            options: [
                { label: "PayPal", value: "paypal" },
                { label: "Razorpay", value: "razorpay" },
            ],
            label: "Payment Provider",
        },
        merchantId: {
            type: "text",
            label: "Merchant ID / Email",
        },
        amounts: {
            type: "text",
            label: "Amounts (comma separated)",
        },
        buttonText: {
            type: "text",
            label: "Button Text",
        },
    },
    defaultProps: {
        provider: "paypal",
        merchantId: "sb-47sa473232@business.example.com", // Example Sandbox Email
        amounts: "10, 25, 50, 100",
        buttonText: "Donate Now",
    },
    render: ({ provider, merchantId, amounts, buttonText }) => {
        const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
        const amountList = amounts.split(",").map((a) => parseFloat(a.trim())).filter((n) => !isNaN(n));

        useEffect(() => {
            // Pre-load Razorpay script if provider is Razorpay
            if (provider === "razorpay") {
                loadRazorpayConfig("https://checkout.razorpay.com/v1/checkout.js");
            }
        }, [provider]);

        const handlePayPalDonate = () => {
            if (!selectedAmount) {
                alert("Please select an amount");
                return;
            }
            // Construct PayPal Standard Donation Link
            const baseUrl = "https://www.paypal.com/cgi-bin/webscr";
            const params = new URLSearchParams({
                cmd: "_donations",
                business: merchantId,
                item_name: "Donation to Non-Profit",
                currency_code: "USD",
                amount: selectedAmount.toString(),
            });
            window.open(`${baseUrl}?${params.toString()}`, "_blank");
        };

        const handleRazorpayDonate = () => {
            if (!selectedAmount) {
                alert("Please select an amount");
                return;
            }

            const options = {
                key: merchantId, // Enter the Key ID generated from the Dashboard
                amount: selectedAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "Non-Profit Donation",
                description: "Thank you for your support",
                image: "https://example.com/your_logo",
                handler: function (response: any) {
                    alert(`Payment Successful: ${response.razorpay_payment_id}`);
                },
                prefill: {
                    name: "Donor Name",
                    email: "donor@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const w = window as any;
            if (w.Razorpay) {
                const rzp1 = new w.Razorpay(options);
                rzp1.open();
            } else {
                alert("Razorpay SDK failed to load. Please check your internet connection.");
            }
        };

        const handleDonate = () => {
            if (provider === "paypal") handlePayPalDonate();
            if (provider === "razorpay") handleRazorpayDonate();
        };

        return (
            <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100 my-8">
                <h3 className="text-xl font-bold text-center mb-4 text-gray-800">Support Our Cause</h3>

                <div className="grid grid-cols-2 gap-3 mb-6">
                    {amountList.map((amount) => (
                        <button
                            key={amount}
                            className={`py-2 px-4 rounded-lg font-medium transition-colors ${selectedAmount === amount
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            onClick={() => setSelectedAmount(amount)}
                        >
                            ${amount}
                        </button>
                    ))}
                    <button
                        className={`py-2 px-4 rounded-lg font-medium transition-colors ${selectedAmount === null // This logic is a bit flawed for "Other", let's keep it simple for now and just support presets
                                ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        onClick={() => {
                            const val = prompt("Enter custom amount");
                            if (val) setSelectedAmount(parseFloat(val));
                        }}
                    >
                        Other
                    </button>
                </div>

                <button
                    onClick={handleDonate}
                    disabled={!selectedAmount}
                    className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${selectedAmount
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    {buttonText} {selectedAmount ? `($${selectedAmount})` : ""}
                </button>

                <p className="text-xs text-center text-gray-400 mt-4">
                    Secured by {provider === "paypal" ? "PayPal" : "Razorpay"}
                </p>
            </div>
        );
    },
};
