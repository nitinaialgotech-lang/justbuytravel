import React, { useState } from 'react'

export default function SideBar() {
    const [showClassDropdown, setShowClassDropdown] = useState(false);
    const [travelClass, setTravelClass] = useState("Economy");
    const economy = [
        {
            eco_name: "Economy",
            id: "1",
        },
        {
            eco_name: "Premium Economy",
            id: "2",
        },
        {
            eco_name: "Business Class",
            id: "3",
        },
        {
            eco_name: "First Class",
            id: "4",
        },
    ];
    return (
        <>
            <div className="hotel_filter_sidebar">
                {/* *************************************** */}
                <div className="sort_by">
                    <div className="box">
                        <div className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg">
                            <div className="item relative ">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowClassDropdown((prev) => !prev);
                                    }}
                                    className="flex items-center gap-1.5 cursor-pointer bg-transparent border-0 p-0 text-inherit"
                                >
                                    <span className="whitespace-nowrap">{travelClass}</span>
                                    <FiChevronDown
                                        className={`shrink-0 transition-transform duration-300 ease-out ${showClassDropdown ? "rotate-180" : "rotate-0"
                                            }`}
                                        size={18}
                                    />
                                </button>

                                {showClassDropdown && (
                                    <div className="absolute left-0 top-10 z-20 px-3  pt-1 pb-4 bg-white border border-gray-200 rounded-lg shadow-xl transition-all duration-300 ease-out origin-top">
                                        {economy?.map((item, index) => (
                                            <div className="flex flex-col width-btn border-b border-gray-200 py-2">
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => {
                                                        setTravelClass(item?.eco_name);

                                                        setShowClassDropdown(false);

                                                    }}
                                                    className="text-left text-eco  rounded-md  transition"
                                                >
                                                    {item?.eco_name}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* *************************************** */}



            </div>



        </>
    )
}
