"use client"
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaHotel } from "react-icons/fa";
import { MdFlight } from "react-icons/md";
import { FaCar } from "react-icons/fa6";
import { GrBike } from "react-icons/gr";
import { IoIosDocument } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";
export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <>

            {/* ************************************************************************************************************ */}
            <section className='header_section ps-15 pe-15'>
                <div className="container-fluid p-0">


                    <Navbar expand="lg" className="">
                        <Container fluid className='p-0'>
                            <Navbar.Brand href="#">
                                <div className="logo">
                                    <img src="/logo/logo.png.webp" alt="" />
                                </div>
                            </Navbar.Brand>
                            {/* *********************** */}
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            {/* ************************ */}
                            <Navbar.Collapse id="navbarScroll" className='justify-end navbar_link_item'>
                                {/* ******** */}
                                <Nav
                                    className="gap-5"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                >
                                    <Nav.Link href="#action1"><span><FaHotel /></span><span>Hotels</span></Nav.Link>
                                    <Nav.Link href="#action2"><span><MdFlight /></span><span>Flights</span></Nav.Link>
                                    <Nav.Link href="#action2"><span><FaCar /></span><span>cars</span></Nav.Link>
                                    <Nav.Link href="#action2"><span><GrBike /></span><span>bikes</span></Nav.Link>
                                    <Nav.Link href="#action2"><span><IoIosDocument /></span><span>blogs</span></Nav.Link>
                                    <NavDropdown title="More" id="navbarScrollingDropdown">
                                        <NavDropdown.Item href="#action3">More</NavDropdown.Item>
                                        <NavDropdown.Item href="#action4">
                                            Another action
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action5">
                                            Something else here
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                    <div className="search_sign_button flex gap-2 items-center">



                                        <Link href={""} className='sign-in-button' variant="outline-success">Subscriber</Link>

                                    </div>

                                </Nav>
                                {/* ******** */}

                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </section>

        </>


    )
}
