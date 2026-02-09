import { CustomToggle } from '@/component/CustomToggle';
import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

export default function SearchFilter() {
    const [showDropdown, setShowDropdown] = useState(false);
    return (
        <>

            <section className='search_filter_section padding_bottom d-block d-lg-none'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 p-0">
                            <div className="search_filter">
                                <div className="filter_items">
                                    <div className="default flex justify-end">
                                        <Dropdown show={showDropdown}
                                            onToggle={(isOpen) => setShowDropdown(isOpen)}>
                                            <Dropdown.Toggle as={CustomToggle} show={showDropdown} className='bg-color-green border-0' id="dropdown-basic">
                                                Default
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Cheapest</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Middle</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Top Hotels</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>




        </>
    )
}
