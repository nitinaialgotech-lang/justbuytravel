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
import { CgMenuRightAlt } from "react-icons/cg";
import { FiPlus } from "react-icons/fi";
import Offcanvas from "react-bootstrap/Offcanvas";
import { getAssetPath } from '../app/utils/assetPath';
export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [navOpen, setNavOpen] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [servicesOpen, setServicesOpen] = useState(false);

    let closeTimeout;

    function openMenu() {
        clearTimeout(closeTimeout);
        setServicesOpen(true);
    }

    function closeMenu() {
        closeTimeout = setTimeout(() => {
            setServicesOpen(false);
        }, 150); // 150ms delay
    }
    return (
        <>

            {/* ************************************************************************************************************ */}
            <section className='header_section ps-15 pe-15'>
                <div className="container-fluid p-0">


                    <Navbar expand="lg" className="">
                        <Container fluid className='p-0'>
                            <Navbar.Brand href={getAssetPath("/")}>
                                <div className="logo">
                                    <img src={getAssetPath("/logo/logo.png.webp")} alt="Just Buy Travel - Your Trusted Travel Companion" />
                                </div>
                            </Navbar.Brand>
                            {/* *********************** */}
                            <button onClick={handleShow} className='d-block d-lg-none' >
                                <CgMenuRightAlt size={30} />
                            </button>

                            {/* ************************ */}
                            <Navbar.Collapse className='justify-end navbar_link_item'>
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


                                    <div className="search_sign_button flex gap-2 items-center">



                                        <Link href={""} className='sign-in-button' variant="outline-success">Subscriber</Link>

                                    </div>

                                </Nav>
                                {/* ******** */}

                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                    {/* ********************  offcanvas */}
                    <Offcanvas
                        show={show}
                        onHide={handleClose}
                        placement="end"
                        className="fullscreen-offcanvas" >
                        <Offcanvas.Header
                            closeButton
                            className="text-light text-amber-400"
                        >
                            <Offcanvas.Title>
                                <div className="logo">
                                    <img src={getAssetPath("/logo/logo.png.webp")} width={100} height={"auto"} alt="Just Buy Travel - Your Trusted Travel Companion" />
                                </div>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        {/* ******************* */}
                        <Offcanvas.Body className="p-0">
                            <div className="mega-menu">
                                <div className="container p-0">
                                    <div className="row flex justify-center items-center">
                                        <div className="col-md-12">
                                            <div className="mega_menu_item">
                                                <div className="mega_menu_link">
                                                    <ul>
                                                        <li>
                                                            <Link href={"#"} className='flex justify-between items-center'>
                                                                <span>Home</span> <span><FiPlus /></span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href={"#"} className='flex justify-between items-center'>
                                                                <span>Home</span> <span><FiPlus /></span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href={"#"} className='flex justify-between items-center'>
                                                                <span>Home</span> <span><FiPlus /></span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href={"#"} className='flex justify-between items-center'>
                                                                <span>Home</span> <span><FiPlus /></span>
                                                            </Link>
                                                        </li>
                                                        <div className="button_nav  text-center px-2 py-2 rounded">
                                                            <Link href={"#"} className=''>
                                                                Subscriber</Link>
                                                        </div>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </Offcanvas.Body>
                        {/* ******************** */}
                    </Offcanvas>
                </div>
            </section >

        </>


    )
}
