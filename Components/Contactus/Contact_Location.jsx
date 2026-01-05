import React from "react";
import { IoLogoLinkedin } from "react-icons/io5";
import { RiFacebookFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
export default function Contact_Location() {
  return (
    <>
      <div className="contact_location">
        <div className="section_title relative">
          <h2 className="uppercase">Contact Us</h2>
          {/* *********************** */}
          {/* <div className="animation_icon relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 500 150"
              preserveAspectRatio="none"
            >
              <path
                pathLength="1"
                d="M7.7,145.6C109,125,299.9,116.2,401,121.3c42.1,2.2,87.6,11.8,87.3,25.7"
              />
            </svg>
          </div> */}
          {/* *********************** */}
        </div>

        <div className="contact_location_content">
          <h3>We’re also on social networks</h3>
          <div className="icon">
            <ul className="icon_wrapper">
              <li className="icon facebook">
                <span className="tooltip">Facebook</span>
                <RiFacebookFill />
              </li>

              <li className="icon instagram">
                <span className="tooltip">Instagram</span>
                <FaInstagram />
              </li>
              {/* ******* */}
              <li className="icon facebook">
                <IoLogoLinkedin />
              </li>
            </ul>
          </div>
          <div className="location_map">
            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448196.5259053188!2d76.76357451215983!3d28.64368472633456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1767459619939!5m2!1sen!2sin"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        {/* ************************* */}
      </div>
    </>
  );
}
