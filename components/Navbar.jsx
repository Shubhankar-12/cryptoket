import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';
import images from '../assets';
import { Button } from '.';

const MenuItems = ({ isMobile, active, setActive }) => {
  const generateLinks = (i) => {
    switch (i) {
      case 0:
        return '/';
      case 1:
        return '/created-nfts';
      case 2:
        return '/my-nfts';

      default:
        return '/';
    }
  };
  return (
    <ul className={`list-none flexCenter flex-row ${isMobile && 'flex-col h-full'}`}>
      {['Explore NFTs', 'Listed NFTs', 'My NFTs'].map((item, i) => (
        <li
          key={i}
          onClick={() => setActive(item)}
          className={`flex flex-row items-center font-poppins font-semibold text-base
        dark:hover:text-white hover:text-nft-dark mx-3 ${active === item
            ? 'dark:text-white text-nft-black-1'
            : 'dark:text-nft-gray-3 text-nft-gray-2'
        }`}
        >
          <Link href={generateLinks(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

const ButtonGroup = () => {
  const hasConnected = false;

  return hasConnected
    ? (<Button btnName="Create" classStyles="mx-2 rounded-xl" />)
    : (<Button btnName="Connect" classStyles="mx-2 rounded-xl" />);
};

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState('Explore NFTs');
  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b
   dark:bg-nft-dark bg-white
   dark:border-nft-dark-black-1 border-nft-gray-1"
    >
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div className="flexCenter md:hidden cursor-pointer" onClick={() => {}}>
            <Image src={images.logo02} objectFit="contain" height={32} width={32} alt="logo" />
            <p className=" dark:text-white text-nft-black-1 font-semibold text-lg ml-1">Cryptoket</p>
          </div>
        </Link>
        <Link href="/">
          <div className="hidden md:flex" onClick={() => {}}>
            <Image src={images.logo02} objectFit="contain" height={32} width={32} alt="logo" />
          </div>
        </Link>
      </div>
      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2">
          <input type="checkbox" className="checkbox" id="checkbox" onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
          <label htmlFor="checkbox" className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label">
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />
            <div className="w-3 h-3 rounded-full bg-white absolute ball" />
          </label>
        </div>
      </div>
      <div className="md:hidden flex">
        <MenuItems active={active} setActive={setActive} />
        <div className="ml-4">
          <ButtonGroup />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
