import React from 'react'

export default function AboutHotelDetail({ detail, sub_desc, load }) {

    console.log(load, ".......................");


    const sub = sub_desc?.flat(1);
    const ShimmerAboutHotel = () => {
        return (
            <div className="about_hotel rounded-2xl">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="about_hotel_detail">
                            {/* Shimmer for the heading */}
                            <div
                                className="shimmer-text mb-4"
                                style={{ width: "40%", height: "32px", borderRadius: "6px" }}
                            ></div>

                            {/* Shimmer for paragraph lines */}
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="shimmer-text mb-2"
                                    style={{ width: `${90 - i * 10}%`, height: "18px", borderRadius: "4px" }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Shimmer CSS */}
                <style dangerouslySetInnerHTML={{
                    __html: `
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        .shimmer-text {
          display: inline-block;
          position: relative;
          overflow: hidden;
          background-color: #e5e7eb;
        }
        .shimmer-text::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: linear-gradient(
            90deg,
            #e5e7eb 0%,
            #f3f4f6 50%,
            #e5e7eb 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
      `}} />
            </div>
        );
    };

    return (
        <>
            <div className="section_about_hotel_detail ">
                <div className="container">
                    {
                        load ? <ShimmerAboutHotel /> :
                            <div className="about_hotel rounded-2xl ">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="about_hotel_detail">
                                            <h3 className=''>
                                                {detail}
                                            </h3>
                                            {
                                                sub?.map((item) => {
                                                    return (
                                                        <>
                                                            <p>
                                                                {item}
                                                            </p>

                                                        </>
                                                    )
                                                })
                                            }


                                        </div>
                                    </div>
                                </div>
                            </div>
                    }

                </div>

            </div>


        </>
    )
}
