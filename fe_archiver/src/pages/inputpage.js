import React, { useState } from "react";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";

const id = localStorage.getItem('id');
const division = localStorage.getItem('division');

const InputPage = () => {
    
    const [formData, setFormData] = useState({
        accepted: false, 
        divisionUser: division,
        kodeklasifikasi: '',
        kurun: '',
        detail: '',
        jumlah: '',
        tipe: '',
        retensiaktif: '',
        retensiinaktif: '',
        asli: false,
        tekstural: false,
        kondisibaik: false, 
        userid: id 
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/archives/up', formData);
            alert('Archive successfully created');
        } catch (error) {
            console.error("Error creating archive:", error);
            alert('Error creating archive');
        }
    };

    return (
        <div>
            <Header></Header>
            <div className="space-y-4 min-h-[76vh] w-[80%] pt-6 mx-auto">
                <h1 className="text-3xl font-semibold text-center">Form Input Data Arsip</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div className="col-span-2">
                            <label className="block mb-2 text-xl font-bold" htmlFor="divisionUser">Nama Divisi</label>
                            <input
                                disabled
                                name="divisionUser"
                                className="w-full p-3 border border-gray-400 rounded-lg"
                                type="text"
                                placeholder="Nama Divisi"
                                value={formData.divisionUser}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-xl font-bold" htmlFor="kodeklasifikasi">Kode Klasifikasi</label>
                            <input
                                name="kodeklasifikasi"
                                className="w-full p-3 border border-gray-400 rounded-lg"
                                type="text"
                                placeholder="Kode Klasifikasi"
                                value={formData.kodeklasifikasi}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-xl font-bold" htmlFor="kurun">Kurun Waktu</label>
                            <input
                                name="kurun"
                                className="w-full p-3 border border-gray-400 rounded-lg"
                                type="number"
                                placeholder="Tahun"
                                value={formData.kurun}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 text-xl font-bold" htmlFor="detail">Informasi Arsip</label>
                        <textarea
                            name="detail"
                            className="w-full h-32 p-3 border border-gray-400 rounded-lg"
                            placeholder="Uraian Informasi Arsip"
                            value={formData.detail}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div>
                            <label className="block mb-2 text-xl font-bold" htmlFor="jumlah">Jumlah</label>
                            <div className="grid grid-cols-2 gap-x-3">
                                <input
                                    name="jumlah"
                                    className="p-3 border border-gray-400 rounded-lg"
                                    type="text"
                                    placeholder="Jumlah"
                                    value={formData.jumlah}
                                    onChange={handleInputChange}
                                />
                                <select
                                    name="tipe"
                                    className="p-3 border border-gray-400 rounded-lg"
                                    value={formData.tipe}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Tipe Berkas</option>
                                    <option value="berkas">Berkas</option>
                                    <option value="arsip">Arsip</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-xl font-bold" htmlFor="retensiaktif">Retensi Aktif</label>
                            <select
                                name="retensiaktif"
                                className="w-full p-3 border border-gray-400 rounded-lg"
                                value={formData.retensiaktif}
                                onChange={handleInputChange}
                            >
                                <option value="">Pilih Retensi Aktif</option>
                                <option value='1'>1 Tahun</option>
                                <option value='2'>2 Tahun</option>
                            </select>
                            <label className="block mb-2 text-xl font-bold" htmlFor="retensiaktif">Retensi Inaktif</label>
                            <select
                                name="retensiinaktif"
                                className="w-full p-3 border border-gray-400 rounded-lg"
                                value={formData.retensiinaktif}
                                onChange={handleInputChange}
                            >
                                <option value="">Pilih Retensi Inaktif</option>
                                <option value='1'>1 Tahun</option>
                                <option value='2'>2 Tahun</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 text-xl font-bold">Status Arsip</label>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="asli"
                                        name="asli"
                                        className="mr-2"
                                        checked={formData.asli}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="asli">Asli</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="tekstural"
                                        name="tekstural"
                                        className="mr-2"
                                        checked={formData.tekstural}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="tekstural">Tekstural</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="kondisi"
                                        name="kondisibaik"
                                        className="mr-2"
                                        checked={formData.kondisibaik}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="kondisi">Kondisi Arsip Baik</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-xl font-bold" htmlFor="others">Lainnya</label>
                            <textarea
                                name="others"
                                className="w-full h-20 p-3 mb-2 border border-gray-400 rounded-lg"
                                placeholder="Keterangan Lainnya"
                                value={formData.others}
                                onChange={handleInputChange}
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <button className="w-full p-3 font-bold text-gray-400 border border-gray-400 rounded-md" type="reset">Reset Data</button>
                                <button className="w-full p-3 font-bold text-white bg-gray-900 border rounded-md" type="submit">Submit Data</button>
                            </div>
                        </div>
                    </div>
                    {/* Hidden Input for userid */}
                    <input type="hidden" name="userid" value={formData.userid} />
                </form>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default InputPage;
