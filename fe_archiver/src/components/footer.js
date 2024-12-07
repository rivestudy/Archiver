

// src/pages/welcome.js
import React from 'react';
import logo from "../images/logo.png";

const Footer = () => {
  return (
<footer className="grid grid-cols-3 text-justify gap-7 text-xl p-16 bg-[#1d1d1d]">
<div className="flex justify-center col-span-1">
<img src={logo} className="size-[5vh] mr-2" alt="logo"></img>
<h3 className="text-3xl font-medium text-[#d0f0bf]">ARCHIVER</h3>
</div>
<div className="col-span-2">
  <p className="text-white">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ad
    earum impedit officia recusandae. Non voluptates similique laborum
    excepturi. Cum, minus architecto! Consequatur iure assumenda
    voluptatibus illo officia corporis porro?
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ad
    earum impedit officia recusandae. Non voluptates similique laborum
    excepturi. Cum, minus architecto! Consequatur iure assumenda
    voluptatibus illo officia corporis porro?</p>
</div>
</footer>
  );
};

export default Footer;
