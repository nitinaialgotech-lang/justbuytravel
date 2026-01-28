"use client";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaHotel } from "react-icons/fa";
import { MdFlight } from "react-icons/md";
import { FaCar } from "react-icons/fa6";
import { GrBike } from "react-icons/gr";
import { IoIosDocument } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";
import { CgMenuRightAlt } from "react-icons/cg";
import { FiPlus } from "react-icons/fi";
import { IoPricetag } from "react-icons/io5";
import Offcanvas from "react-bootstrap/Offcanvas";
import { getAssetPath } from "../app/utils/assetPath";
import { useCurrency } from "@/context/CurrencyContext";
import { CURRENCY_LABELS } from "@/context/CurrencyContext";
import "../app/globals.css";
import "../style/responsive.css";
import { HotelIcon, FlightIcon, CruiseIcon } from "./icons";

export default function Header() {
    const { currency, setCurrency, supportedCurrencies } = useCurrency();
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
            <section className="header_section">
                <div className="container">
                    <Navbar expand="lg" className="">
                        <Container fluid className="p-0">
                            <Navbar.Brand as={Link} href="/" onClick={() => window.dispatchEvent(new Event("reset-search"))}>
                                <div className="logo">
                                    <img
                                        src={"/justbuytravel_next/demo/logo/logo.png.webp"}
                                        alt="Just Buy Travel - Your Trusted Travel Companion"
                                    />
                                </div>
                            </Navbar.Brand>
                            {/* *********************** */}
                            <button onClick={handleShow} className="d-block d-lg-none">
                                <CgMenuRightAlt size={30} />
                            </button>

                            {/* ************************ */}
                            <Navbar.Collapse className="justify-end navbar_link_item">
                                {/* ******** */}
                                <Nav
                                    className="gap-4 nav-max-height-100"
                                    navbarScroll
                                >
                                    <Nav.Link as={Link} href="/book-hotels" className="capitalize">
                                        <span>
                                            {/* <img
                                                className="icon_link"
                                                src="/justbuytravel_next/demo/header_icon/icon_hotel.webp"
                                                alt=""
                                            /> */}
                                            <HotelIcon />
                                        </span>
                                        <span>Hotels</span>

                                    </Nav.Link>
                                    <Nav.Link as={Link} href="/book-flights" className="capitalize">
                                        <span>
                                            {/* <img
                                                className="icon_link"
                                                src="/justbuytravel_next/demo/header_icon/icon_flight.webp"
                                                alt=""
                                            /> */}
                                            <FlightIcon />
                                        </span>
                                        <span>Flights</span>
                                    </Nav.Link>
                                    <Nav.Link as={Link} href="/book-cruises" className="capitalize">
                                        <span>
                                            <CruiseIcon />
                                        </span>
                                        <span>Cruises</span>
                                    </Nav.Link>
                                    <Nav.Link as={Link} href="/book-packages" className="capitalize">
                                        <span>
                                            <img
                                                className="icon_link"
                                                src="/justbuytravel_next/demo/header_icon/package-1.webp"
                                                alt=""
                                            />
                                        </span>
                                        <span>Packages</span>
                                    </Nav.Link>
                                    <Nav.Link as={Link} href="/blog" className="capitalize">
                                        <span>
                                            <img
                                                className="icon_link"
                                                src="/justbuytravel_next/demo/header_icon/icon_blog.webp"
                                                alt=""
                                            />
                                        </span>
                                        <span>blogs</span>
                                    </Nav.Link>
                                    <Nav.Link as={Link} href="/aboutus" className="capitalize">
                                        <span>
                                            <img
                                                className="icon_link"
                                                src="/justbuytravel_next/demo/header_icon/icon_about.webp"
                                                alt=""
                                            />
                                        </span>
                                        <span>about us</span>
                                    </Nav.Link>
                                    <div className="d-flex align-items-center gap-2">
                                        <NavDropdown title={<><IoPricetag className="me-1" />{(CURRENCY_LABELS[currency]?.symbol || currency)} {currency}</>} id="currency-dropdown" className="lang-currency-dropdown">
                                            {supportedCurrencies.map((code) => (
                                                <NavDropdown.Item key={code} onClick={() => setCurrency(code)} active={currency === code}>
                                                    {CURRENCY_LABELS[code]?.symbol} {code} – {CURRENCY_LABELS[code]?.name}
                                                </NavDropdown.Item>
                                            ))}
                                        </NavDropdown>
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
                        className="fullscreen-offcanvas"
                    >
                        <Offcanvas.Header closeButton className="text-light header_shadow">
                            <Offcanvas.Title>
                                <div className="logo">
                                    <img
                                        src={"/justbuytravel_next/demo/logo/logo.png.webp"}
                                        width={100}
                                        height={"auto"}
                                        alt="Just Buy Travel - Your Trusted Travel Companion"
                                    />
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
                                                            <Link
                                                                href={"/book-hotels"}
                                                                className="flex justify-between items-center"
                                                            >
                                                                <span className="flex gap-2 items-center capitalize">
                                                                    <span>
                                                                        <img
                                                                            className="icon_link"
                                                                            src="/justbuytravel_next/demo/header_icon/icon_hotel.webp"
                                                                            alt=""
                                                                        />
                                                                    </span>
                                                                    <span>Hotels</span>
                                                                </span>{" "}
                                                                {/* <span>
                                  <FiPlus />
                                </span> */}
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                href={"/book-flights"}
                                                                className="flex justify-between items-center"
                                                            >
                                                                <span className="flex gap-2 items-center capitalize">
                                                                    <span>
                                                                        <img
                                                                            className="icon_link"
                                                                            src="/justbuytravel_next/demo/header_icon/icon_flight.webp"
                                                                            alt=""
                                                                        />
                                                                    </span>
                                                                    <span>Flights</span>
                                                                </span>{" "}
                                                                {/* <span>
                                  <FiPlus />
                                </span> */}
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                href={"/book-cruises"}
                                                                className="flex justify-between items-center"
                                                            >
                                                                <span className="flex gap-2 items-center capitalize">
                                                                    <span>
                                                                        <CruiseIcon />
                                                                    </span>
                                                                    <span>cruises</span>
                                                                </span>{" "}
                                                                {/* <span>
                                  <FiPlus />
                                </span> */}
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                href={"/book-packages"}
                                                                className="flex justify-between items-center"
                                                            >
                                                                <span className="flex gap-2 items-center capitalize">
                                                                    <span>
                                                                        <img
                                                                            className="icon_link"
                                                                            src="/justbuytravel_next/demo/header_icon/package-1.webp"
                                                                            alt=""
                                                                        />
                                                                    </span>
                                                                    <span>Packages</span>
                                                                </span>{" "}
                                                                {/* <span>
                                  <FiPlus />
                                </span> */}
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                href={"/blog"}
                                                                className="flex justify-between items-center"
                                                            >
                                                                <span className="flex gap-2 items-center capitalize">
                                                                    <span>
                                                                        <img
                                                                            className="icon_link"
                                                                            src="/justbuytravel_next/demo/header_icon/icon_blog.webp"
                                                                            alt=""
                                                                        />
                                                                    </span>
                                                                    <span>blogs</span>
                                                                </span>{" "}
                                                                {/* <span>
                                  <FiPlus />
                                </span> */}
                                                            </Link>
                                                        </li>
                                                        <li className="">
                                                            <Link
                                                                href={"/aboutus"}
                                                                className="flex justify-between items-center"
                                                            >
                                                                <span className="flex gap-2 items-center capitalize">
                                                                    <NavDropdown title={<><IoPricetag className="me-1" />{(CURRENCY_LABELS[currency]?.symbol || currency)} {currency}</>} id="currency-dropdown" className="lang-currency-dropdown">
                                                                        {supportedCurrencies.map((code) => (
                                                                            <NavDropdown.Item key={code} onClick={() => setCurrency(code)} active={currency === code}>
                                                                                {CURRENCY_LABELS[code]?.symbol} {code} – {CURRENCY_LABELS[code]?.name}
                                                                            </NavDropdown.Item>
                                                                        ))}
                                                                    </NavDropdown>
                                                                </span>


                                                                {" "}
                                                                {/* <span>
                                  <FiPlus />
                                </span> */}
                                                            </Link>
                                                        </li>
                                                        <li className="">
                                                            <Link
                                                                href={"/aboutus"}
                                                                className="flex justify-between items-center"
                                                            >
                                                                <span className="flex gap-2 items-center capitalize">
                                                                    <span>
                                                                        <img
                                                                            className="icon_link"
                                                                            src="/justbuytravel_next/demo/header_icon/icon_about.webp"
                                                                            alt=""
                                                                        />
                                                                    </span>
                                                                    <span>about us</span>
                                                                </span>{" "}
                                                                {/* <span>
                                  <FiPlus />
                                </span> */}
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
            </section>
        </>
    );
}