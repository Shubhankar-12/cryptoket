import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';
import images from '../assets';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  return (<nav>Navbar</nav>);
};

export default Navbar;
