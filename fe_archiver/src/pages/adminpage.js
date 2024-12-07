import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

const getBaseUrl = () => {
    return "http://localhost:5001"; 
};

const AdminPage = () => {
    const [menu, setMenu] = useState("user");
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        division: ''
    });
    const [newDivision, setNewDivision] = useState('');
    const [divisions, setDivisions] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDivisions();
        fetchUsers();
    }, []);

    const fetchDivisions = async () => {
        try {
            const response = await fetch(`${getBaseUrl()}/divisions`);
            if (!response.ok) {
                throw new Error('Failed to fetch divisions');
            }
            const data = await response.json();
            setDivisions(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${getBaseUrl()}/users`);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleNewUserChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    };

    const handleAddUser = async () => {
        try {
            const response = await fetch(`${getBaseUrl()}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser)
            });

            if (!response.ok) {
                throw new Error('Failed to add user');
            }

            const addedUser = await response.json();
            setUsers([...users, addedUser]);
            setNewUser({ name: '', email: '', password: '', role: '', division: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAddDivision = async () => {
        try {
            const response = await fetch(`${getBaseUrl()}/divisions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newDivision })
            });

            if (!response.ok) {
                throw new Error('Failed to add division');
            }

            const addedDivision = await response.json();
            setDivisions([...divisions, addedDivision]);
            setNewDivision('');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(`${getBaseUrl()}/users/${userId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            setUsers(users.filter(user => user.id !== userId));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteDivision = async (divisionId) => {
        try {
            const response = await fetch(`${getBaseUrl()}/divisions/${divisionId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete division');
            }

            setDivisions(divisions.filter(division => division.id !== divisionId));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <Header />
            <div id="wrapper" className="min-h-[76vh] p-6 bg-gray-200">
                {error && (
                    <div className="p-4 mb-4 text-red-600 bg-red-100 rounded">
                        {error}
                    </div>
                )}
                <div className="container w-1/2 mx-auto">
                    <div className="mb-6 text-center">
                        <button
                            className={`px-6 py-2 w-40 mr-4 font-semibold text-white rounded-md ${menu === "user" ? "bg-[#4d5d53]" : "bg-gray-400"}`}
                            onClick={() => setMenu("user")}
                        >
                            User
                        </button>
                        <button
                            className={`px-6 w-40 py-2 font-semibold text-white rounded-md ${menu === "division" ? "bg-[#4d5d53]" : "bg-gray-400"}`}
                            onClick={() => setMenu("division")}
                        >
                            Divisi
                        </button>
                    </div>
                    
                    {menu === "user" && (
                        <div>
                            <div className="mb-6">
                                <h2 className="mb-4 text-2xl font-semibold">Tambah User Baru</h2>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <input
                                        className="w-full col-span-2 p-4 mb-2 border rounded-md"
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={newUser.name}
                                        onChange={handleNewUserChange}
                                    />
                                    <input
                                        className="w-full p-4 mb-2 border rounded-md"
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={newUser.email}
                                        onChange={handleNewUserChange}
                                    />
                                    <input
                                        className="w-full p-4 mb-2 border rounded-md"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={newUser.password}
                                        onChange={handleNewUserChange}
                                    />
                                    <select
                                        className="w-full p-4 mb-2 border rounded-md"
                                        name="role"
                                        value={newUser.role}
                                        onChange={handleNewUserChange}
                                    >
                                        <option value="">Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                    <select
                                        className="w-full p-4 mb-2 border rounded-md"
                                        name="division"
                                        value={newUser.division}
                                        onChange={handleNewUserChange}
                                    >
                                        <option value="">Division</option>
                                        {divisions.map((division) => (
                                            <option key={division.id} value={division.name}>
                                                {division.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        className="p-4 text-white bg-[#4d5d53] rounded-md col-span-2 w-1/4 ml-auto mr-0"
                                        onClick={handleAddUser}
                                    >
                                        Tambah User
                                    </button>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className="mb-4 text-2xl font-semibold">Semua User</h2>
                                <table className="min-w-full bg-white border border-collapse border-gray-300 rounded-md shadow-md">
                                    <thead>
                                        <tr className="text-gray-600 bg-gray-100">
                                            <th className="px-4 py-3 border-b">No</th>
                                            <th className="px-4 py-3 border-b">Name</th>
                                            <th className="px-4 py-3 border-b">Email</th>
                                            <th className="px-4 py-3 border-b">Division</th>
                                            <th className="px-4 py-3 border-b">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) => (
                                            <tr key={user.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 border-b">{index + 1}</td>
                                                <td className="px-4 py-3 border-b">{user.name}</td>
                                                <td className="px-4 py-3 border-b">{user.email}</td>
                                                <td className="px-4 py-3 border-b">{user.division}</td>
                                                <td className="px-4 py-3 border-b">
                                                    <button 
                                                        className="text-red-600 hover:text-red-800"
                                                        onClick={() => handleDeleteUser(user.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {menu === "division" && (
                        <div className="">
                            <div className="mb-6">
                                <h2 className="mb-4 text-2xl font-semibold">Tambah Divisi Baru</h2>
                                <div className="mb-4">
                                    <input
                                        className="w-full p-4 mb-4 border rounded-md"
                                        type="text"
                                        value={newDivision}
                                        onChange={(e) => setNewDivision(e.target.value)}
                                        placeholder="Division Name"
                                    />
                                    <button
                                        className="w-full p-4 text-white bg-[#4d5d53] rounded-md"
                                        onClick={handleAddDivision}
                                    >
                                        Tambah Divisi
                                    </button>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className="mb-4 text-2xl font-semibold">Semua Divisi</h2>
                                <table className="min-w-full bg-white border border-collapse border-gray-300 rounded-md shadow-md">
                                    <thead>
                                        <tr className="text-gray-600 bg-gray-100">
                                            <th className="py-4 pl-3 text-left">No</th>
                                            <th className="px-4 py-4 text-center">Division</th>
                                            <th className="px-4 py-4 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {divisions.map((division, index) => (
                                            <tr key={division.id} className="border-b-2 hover:bg-gray-50">
                                                <td className="py-4 pl-3 text-left">{index + 1}</td>
                                                <td className="px-4 py-4 text-center">{division.name}</td>
                                                <td className="px-4 py-4 text-center">
                                                    <button 
                                                        className="text-red-600 hover:text-red-800"
                                                        onClick={() => handleDeleteDivision(division.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminPage;