import React from 'react'

export default function Search_flight_section() {
    return (
        <>



            <div className="form_search_expedia padding_top ">
                <iframe
                    src="https://creator.expediagroup.com/widgets/search?program=us-expedia&network=pz&camref=1110lvIIC&lobs=flights"
                    width="100%"
                    height="360"
                    style={{ border: "none" }}
                    loading="lazy"
                    title="Expedia Flights"
                />
            </div>

        </>
    )
}
