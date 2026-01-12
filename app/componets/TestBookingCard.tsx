"use client";

import { useState } from "react";
import { Phone, MapPin, ChevronDown } from "lucide-react";
import { useCart } from "../context/CartContext";

interface TestBookingCardProps {
    test: any;
}

export function TestBookingCard({ test }: TestBookingCardProps) {
    const { addToCart } = useCart();
    const [selectedCentre, setSelectedCentre] = useState("");

    const handleBookNow = () => {
        
        const priceNumber = parseInt(test.price.replace(/[^0-9]/g, "")) || 0;
       

        addToCart({
            id: test.slug,
            name: test.name,
            price: priceNumber,
          
            type: "test",
            testPreparation: test.testPreparation,
            reportTat: test.reportTat,
            Item_ID: test.Item_ID || ""
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
            <h3 className="text-lg font-bold text-blue-900 mb-4">
                Visit Type
            </h3>

            <button className="w-full bg-orange-600 text-white py-3 rounded-lg mb-6 hover:bg-orange-700 transition-colors font-semibold">
                Visit Centre
            </button>

 
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">
                    Centres
                </h4>
                <div className="relative">
                    <select
                        value={selectedCentre}
                        onChange={(e) => setSelectedCentre(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white text-gray-700 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        {test.centres && test.centres.map((centre: string, idx: number) => (
                            <option key={idx} value={centre}>
                                {centre}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                <button className="mt-2 text-orange-600 hover:text-orange-700 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                </button>
            </div>


            <div className="mb-6">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">
                    Tests
                </h4>
                <div className="relative">
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white text-gray-700 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500">
                        <option>{test.name}</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
            </div>

 
            <div className="mb-6 text-center">
          
                <div className="text-3xl font-bold text-orange-600">
                  
                    {test.price}
                </div>
            </div>

   
            <button
                onClick={handleBookNow}
                className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors mb-3 font-semibold"
            >
                Book Now
            </button>

            <button className="w-full border-2 border-orange-600 text-orange-600 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-50 transition-colors font-semibold mb-3">
                <Phone className="w-4 h-4" />
                Call {selectedCentre}
            </button>

            <button className="w-full border-2 border-orange-600 text-orange-600 py-3 rounded-lg hover:bg-orange-50 transition-colors font-semibold">
                Request A Callback
            </button>
        </div>
    );
}
