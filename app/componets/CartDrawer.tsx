"use client";

import { useCart } from "../context/CartContext";
import { X, Trash2, MapPin, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function CartDrawer() {
    const { items, removeFromCart, isOpen, closeCart } = useCart();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;



    const total = items.reduce((sum, item) => sum + item.price, 0);

    const handleDelete = (id: string) => {
        setItemToDelete(id);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            removeFromCart(itemToDelete);
            setItemToDelete(null);
        }
    };

    const cancelDelete = () => {
        setItemToDelete(null);
    };

    // Get item name for the modal
    const itemToDeleteName = items.find(i => i.id === itemToDelete)?.name || "Item";

    return (
        <div className={`fixed inset-0 z-[100] flex justify-end pointer-events-none`}>
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={closeCart}
            ></div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full bg-slate-100 z-[100] transform transition-transform duration-300 ease-in-out shadow-2xl w-[360px] pointer-events-auto flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px" }}
            >

                {/* Header */}
                <div className="p-4 border-b flex items-center">
                    <button
                        onClick={closeCart}
                        className="flex items-center text-gray-800 text-lg font-bold hover:text-orange-600 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        Cart
                    </button>
                    {/* <h2 className="text-xl font-bold text-red-600">Centre Visit</h2> */}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4">

                    {/* Location Badge */}
                    {/* <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center gap-2">
                        <span className="text-red-500 font-medium text-sm">Visiting:</span>
                        <span className="font-bold text-gray-800 text-sm">HOD Karkardooma</span>
                        <MapPin className="w-4 h-4 text-red-500 ml-auto" />
                    </div> */}

                    {/* Patient Card */}
                    {/* <div className="bg-gray-200 p-2 rounded-t-lg text-xs font-bold text-gray-700">
                        Varaiy <span className="font-normal text-gray-500 ml-1">21 Y / M</span>
                    </div> */}

                    {/* Items */}
                    <div className="bg-white rounded-b-lg shadow-sm">
                        {items.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 text-sm">
                                Your cart is empty
                            </div>
                        ) : (
                            items.map((item, idx) => (
                                <div key={idx} className="p-4 flex justify-between items-start group">
                                    <div className="pr-4">
                                        <h4 className="font-bold text-gray-800 text-sm mb-1">{item.name}</h4>
                                        <div className="flex items-center gap-2 text-sm">
                                            {(item.originalPrice || 0) > item.price && (
                                                <span className="text-gray-400 line-through text-xs">₹{item.originalPrice}</span>
                                            )}
                                            <span className="font-bold text-gray-900">₹{item.price}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-500 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>



                    {/* Payment Summary */}
                    <div className="bg-white rounded-lg shadow-sm p-4 text-sm space-y-2">
                        <h3 className="font-bold text-gray-900 mb-2">Payment</h3>
                        <div className="flex justify-between text-gray-600">
                            <span>Sub Total</span>
                            <span>₹{items.length > 0 ? (items.reduce((s, i) => s + (i.originalPrice || i.price), 0)) : 0}</span>
                        </div>
                        <div className="flex justify-between font-bold text-gray-900 pt-2 mt-2">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-4 bg-white border-t">
                    <button
                        onClick={() => {
                            closeCart();
                            router.push('/cart');
                        }}
                        className="w-full bg-orange-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-orange-700 transition"
                    >
                        Proceed to Checkout
                    </button>
                    <p className="text-[10px] text-gray-400 text-center mt-2">
                        Safe & Secure Payment
                    </p>
                </div>

            </div>

            {/* DELETE CONFIRMATION MODAL */}
            {itemToDelete && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4 pointer-events-auto">
                    <div className="relative bg-white transform transition-all duration-300 overflow-y-auto rounded-sm shadow-lg p-4 w-full max-w-sm m-4 sm:m-6">
                        <div className="mb-4">
                            <div className="flex flex-row items-center justify-between border-b border-gray-200 pb-4 -mx-4 px-4">
                                <div className="flex flex-row items-center">
                                    {/* <p className="text-black font-bold text-lg mr-2">name from the account</p>
                                    <p className="text-sm text-gray-500 font-medium">and here age </p> */}
                                </div>
                                <button
                                    aria-label="close-modal"
                                    type="button"
                                    onClick={cancelDelete}
                                    className="p-1 text-red-600 hover:text-red-800 text-2xl font-bold leading-none"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p className="text-black text-xl font-bold max-w-68 text-center mx-auto w-full">
                                    Are You Sure want to delete the <span className="text-orange-600">{itemToDeleteName}</span> test
                                </p>
                                <p className="max-w-72 text-center mx-auto pt-3 text-gray-700">
                                    This Action cannot be undone. Are you sure you want to continue
                                </p>
                                <div className="flex flex-row justify-between gap-2 pt-10">
                                    <button
                                        type="button"
                                        onClick={cancelDelete}
                                        className="font-medium rounded border border-red-600 transition duration-200 flex items-center justify-center px-4 py-2 text-sm bg-transparent text-red-600 w-full hover:bg-red-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={confirmDelete}
                                        className="font-medium rounded border-none transition duration-200 flex items-center justify-center px-4 py-2 text-sm bg-orange-600 text-white w-full hover:bg-orange-700"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
