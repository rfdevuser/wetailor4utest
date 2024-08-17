"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { usePathname } from "next/navigation";
import Link from "next/link";
import SearchBox from '../Assests/SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '@/redux/reducers/form.reducer';
import DropdownMenu from '@/components/Assests/DropdownMenu'


const NavBar: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };
  const handleNavLinkClick = () => {
    // Close the mobile menu when a nav link is clicked
    setNavbarOpen(false);
  };

  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
    };
  }, []);

  // Fetch username from Redux store
  const userName = useSelector((state: any) => state.form.formData.name);

  useEffect(() => {
    // Load username from localStorage if available
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      // Set username in Redux store or wherever you manage state
      dispatch(
        updateFormData({
          fieldName: 'name', // Ensure this matches the field name in your reducer
          fieldValue: storedName,
        })
      );
    }
  }, []);

  // Update localStorage when userName changes
  useEffect(() => {
    if (userName) {
      localStorage.setItem('userName', userName);
    } else {
      localStorage.removeItem('userName');
    }
  }, [userName]);

  return (
    <nav>
      <div className={`relative ${sticky ? 'sticky top-0 z-50' : ''}`}>
        {/* Top Section: Logo, Login, and Cart Buttons */}
        <div className='bg-gradient-to-br from-[#FACBEA] to-[#FFE4D6]'>
          <div className="flex justify-between items-center py-2">
            <div className="text-white text-xl font-bold flex items-center mx-auto">
              <Image
                src='/images/logo/logo-4u.png'
                alt='wetailor4u_logo'
                width={80}
                height={60}
              />
            </div>
            <div className="flex items-center space-x-4">
              {userName ? (
                // If userName is available (user is logged in), show welcome message
                <span className="text-black text-sm mr-2" onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave} ><b>Welcome {userName}</b>
                  {showDropdown && <DropdownMenu />}
                </span>
              ) : (
                // If userName is not available (user is not logged in), show user icon
                <Link href='/MobileAuth'>
                  <button className="text-white bg-[#e2e2e2] px-4 py-1 rounded-full hover:bg-[#fda4af]">
                    <Image
                      src='/images/icons/user.png'
                      alt='user_icon'
                      width={30}
                      height={30}
                      loading='lazy'
                    />
                  </button>
                </Link>
              )}
              <button className="text-white bg-[#e2e2e2] px-2 py-1 rounded-full hover:bg-[#fda4af]">
                <Image
                  src='/images/icons/add-to-cart.png'
                  alt='cart_logo'
                  width={30}
                  height={30}
                  loading='lazy'
                />
              </button>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <div className='w-full border-t border-white'></div>
        <div className='bg-transparent'>
          <div className='w-full flex justify-center text-black bg-transparent shadow-xl mt-1 mb-1'>
            <div className='lg:w-1/2 md:w-full sm:w-full'>
              <SearchBox />
            </div>
          </div>
        </div>
        {/* Bottom Section: Menu Items */}
        {/* Add your menu items here */}
      </div>
    </nav>
  );
};

export default NavBar;
