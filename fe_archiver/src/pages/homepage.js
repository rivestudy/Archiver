import React from 'react';
import { Link } from 'react-router-dom';
import bgimage from "../images/bgdark.jpg";
import { CgAddR } from "react-icons/cg";
import { IoDocumentOutline } from "react-icons/io5";
import Header from "../components/header";
import Footer from "../components/footer";

const role = localStorage.getItem('role') || 'role'; // 'role' from localStorage or default to 'role'
const division = localStorage.getItem('division') || 'division';


const userview = () => {
  return (
    <div className="mx-auto bg-white w-[70vw] items-center p-2 flex h-16 rounded-lg mt-[10vh]">
      <input type="text" disabled value={division}  className="items-center h-12 border-gray-600 w-[50vw] p-4" readOnly />
      <Link to="/input">
        <button className="flex items-center text-white bg-[#4d5d53] rounded-lg w-[9.5vw] ml-[0.6vw] text-lg h-12">
          <CgAddR className="mx-4" />
          Input Data
        </button>
      </Link>
      <Link to="/view">
        <button className="flex items-center text-green-950 bg-[#d0f0bf] rounded-lg w-[9.5vw] ml-[0.6vw] text-lg h-12">
          <IoDocumentOutline className="mx-4" />
          Lihat Daftar
        </button>
      </Link>
    </div>
  );
};

const adminview = () => {
  return (
    <div className="mx-auto bg-white w-[70vw] items-center p-2 flex h-16 rounded-lg mt-[10vh]">
       <input type="text" disabled value={division}  className="items-center h-12 border-gray-600 w-[50vw] p-4" readOnly />
      <Link to="/input">
        <button className="flex items-center text-white bg-[#4d5d53] rounded-lg w-[9.5vw] ml-[0.6vw] text-lg h-12">
          <CgAddR className="mx-4" />
          Input Data
        </button>
      </Link>
      <Link to="/view">
        <button className="flex items-center text-green-950 bg-[#d0f0bf] rounded-lg w-[9.5vw] ml-[0.6vw] text-lg h-12">
          <IoDocumentOutline className="mx-4" />
          Lihat Daftar
        </button>
      </Link>
    </div>
  );
};

const HomePage = () => {
  return (
    <div id="homepage">
      <Header />
      <div
        className="text-black text-center justify-center flex-1 h-[60vh] bg-gray-400 relative "
        id="herosection"
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-6xl font-bold pt-[12vh] text-stone-200">
          Selamat Datang
        </h1>
        <h3 className="mt-5 text-2xl text-stone-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          voluptatem error aliquam illum laboriosam, incidunt assumenda commodi
          officiis perspiciatis consequatur?
        </h3>
        <div className="pb-20 mb-20">
          {role === 'admin' ? adminview() : userview()}
        </div>
      </div>
      <div className="pt-5 mx-20 mb-20 font-inter">
        <h1 className="my-8 text-4xl font-bold text-center font-inter">
          Tentang
        </h1>
        <div className="grid grid-cols-3 text-xl text-justify gap-7">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ad
            earum impedit officia recusandae. Non voluptates similique laborum
            excepturi. Cum, minus architecto! Consequatur iure assumenda
            voluptatibus illo officia corporis porro?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ad
            earum impedit officia recusandae. Non voluptates similique laborum
            excepturi. Cum, minus architecto! Consequatur iure assumenda
            voluptatibus illo officia corporis porro?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ad
            earum impedit officia recusandae. Non voluptates similique laborum
            excepturi. Cum, minus architecto! Consequatur iure assumenda
            voluptatibus illo officia corporis porro?
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
