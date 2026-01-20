"use client";


export default function App() {


    return (
        <div className="bg-gray-20">

            <section className="relative bg-gradient-to-r from-blue-50 via-sky-100 to-blue-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-50 items-center">
                        <div className="flex justify-center lg:justify-end">
                            <img
                                src="/assets/person-left.png"
                                alt="Healthcare Professional"
                                className="w-48 h-48 lg:w-56 lg:h-56 object-cover rounded-full border-4 border-white shadow-xl"
                            />
                        </div>
                        <div className="text-center mt-10  relative">
                            <img
                                src="\assets\Logo_Embossed.png"
                                alt="Center Icon"
                                className="absolute left-1/2 -top-40 transform -translate-x-1/2 w-50 h-50 object-contain"
                            />
                            <h1 className="text-3xl text-orange-600 drop-shadow-sm ml-[-80px] lg:whitespace-nowrap">


                                "नासै रोग हरे सब पीरा, जपत निरंतर हनुमत बीरा"
                            </h1>

                            <div className="flex justify-center mt-4">
                                <div className="w-20 h-1 bg-orange-500 rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex justify-center lg:justify-start">
                            <img
                                src="/assets/person-right.png"
                                alt="Healthcare Leader"
                                className="w-48 h-48 lg:w-56 lg:h-56 object-cover rounded-full border-4 border-white shadow-xl"
                            />
                        </div>

                    </div>
                </div>

            </section>
          
        </div>
    );
}
