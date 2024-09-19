'use client';

import { useState } from "react";
import Image from 'next/image'
import Link from "next/link";
import colors from "tailwindcss/colors";
import AuthModal from "@/app/components/AuthModal";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    console.log('click');
    setShowModal(!showModal);
  };

  return (
    <header className="bg-black text-white flex items-center p-4 px-8 justify-between">
      <div className="flex items-center space-x-8">
        <Link href="/">
          <Image
            src="images/logo.png"
            alt="Logo"
            width={164}
            height={42}
            className="w-60 h-auto"
          />
        </Link>
        <Link href="/popular">
          <p className="hover:underline">Popular</p>
        </Link>
        <Link href="/favorites">
          <p className="hover:underline">Favorites</p>
        </Link>
      </div>
      <div className="flex items-center">
        <button onClick={handleModalToggle}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} fill="none">
            <path
              d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
              stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

      </div>
      {showModal && <AuthModal isOpen={showModal} onClose={handleModalToggle} />}
    </header>

  );
};

export default Header;
