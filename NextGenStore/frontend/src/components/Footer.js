import React from 'react';
import { Icon } from '@iconify/react';
import './Footer.css'; // CSS file for styling the footer component

const Footer = () => {
  // Get the current year for the copyright notice
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      {/* Main container for footer with dark background */}
      <div className="bg-[#122e42] text-gray-200 p-4">
        {/* Flex container for the footer sections */}
        <div className="flex justify-around">
          
          {/* Footer section for main links */}
          <div className="footer-section mt-8 mb-8">
            <h4 className="text-lg font-semibold mb-2">Main Links</h4>
            <ul className="list-none">
              {/* List of main links with hover effect */}
              {/* Each link should be updated with the correct href attribute */}
              <li><a href="#" className="hover:text-[#29b6ff] block py-1 font-light">New Arrivals</a></li>
              <li><a href="#" className="hover:text-[#29b6ff] block py-1 font-light">Gift Combos</a></li>
              <li><a href="#" className="hover:text-[#29b6ff] block py-1 font-light">Clearance Zone</a></li>
              <li><a href="#" className="hover:text-[#29b6ff] block py-1 font-light">Coupons & Offers</a></li>
              <li><a href="#" className="hover:text-[#29b6ff] block py-1 font-light">Photos & Reviews</a></li>
            </ul>
          </div>

          {/* Footer section for side links */}
          <div className="footer-section mt-8 mb-8">
            <h4 className="text-lg font-semibold mb-2">Side Links</h4>
            <ul className="list-none">
              {/* Similar to main links, update hrefs accordingly */}
              <li><a href="#" className="hover:text-[#29b6ff] block py-1 font-light">FAQ</a></li>
              <li><a href="#" className="hover:text-[#29b6ff] block py-1 font-light">100 Days Return Policy</a></li>
              <li><a href="#" className="hover:text-[#29b6ff] block py-1 font-light">About Us</a></li>
              <li><a href="#" className="hover:text-[#29b6ff] block py-1 font-light">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#29b6ff] block py-1 font-light">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Section for external platform links */}
          <div className="footer-section mt-8 mb-8">
            <h4 className="text-lg font-semibold mb-2">Also Available On:</h4>
            <ul className="list-none">
              {/* Icons with external platform links */}
              <li><a href="#" className="hover:text-[#29b6ff] flex items-center pl-3 py-1">
                <Icon icon="ri:amazon-fill" />
                <span className="">&nbsp;Amazon</span></a></li>
              <li><a href="#" className="hover:text-[#29b6ff] flex items-center pl-3 py-1">
                <Icon icon="simple-icons:flipkart" />
                <span className="">&nbsp;Flipkart</span></a></li>
              <li><a href="#" className="hover:text-[#29b6ff] flex items-center pl-3 py-1">
                <Icon icon="arcticons:myntra" />
                <span className="">&nbsp;Myntra</span></a></li>
            </ul>
          </div>

          {/* Section for social media links */}
          <div className="footer-section mt-8 mb-8">
            <h4 className="text-lg font-semibold mb-2">Social Media</h4>
            <ul className="list-none">
              {/* Social media icons and links */}
              <li><a href="#" className="hover:text-[#29b6ff] flex items-center py-1">
                <Icon icon="line-md:discord" />
                <span className="">&nbsp;Discord</span></a></li>
              <li><a href="#" className="hover:text-[#29b6ff] flex items-center py-1">
                <Icon icon="line-md:instagram" />
                <span className="">&nbsp;Instagram</span></a></li>
              <li><a href="#" className="hover:text-[#29b6ff] flex items-center py-1">
                <Icon icon="icon-park-outline:youtube" />
                <span className="">&nbsp;YouTube</span></a></li>
              <li><a href="#" className="hover:text-[#29b6ff] flex items-center py-1">
                <Icon icon="mingcute:linkedin-line" />
                <span className="">&nbsp;LinkedIn</span></a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Footer copyright section */}
      <div className="bg-[#d9e2e5] text-gray-800 p-4 text-center font-extralight text-xs">
        <p className="mb-2 mt-4">
          All images displayed on this website are for demonstration purposes only and are not claimed to be our original work unless stated otherwise. If you have any inquiries or issues regarding the imagery, please contact us at contact@mayankkashyap.com.
        </p>
        {/* Dynamically display the current year */}
        <a href='/home' className="mb-4">Copyright © {currentYear} NextGenStore.</a>
      </div>
    </footer>
  );
};

export default Footer;