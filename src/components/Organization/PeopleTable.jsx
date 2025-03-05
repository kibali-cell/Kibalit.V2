import React, { useState } from 'react';
import { FaSearch, FaPlus, FaChevronDown } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';

const PeopleTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterActive, setFilterActive] = useState(false);

    const peopleData = [
        {
            name: 'Salutary Kiria',
            email: 'Sal@drumfumo.com',
            role: 'Name',
            status: 'Name',
            phone: 'Name'
        },
        {
            name: 'Michael Obado',
            email: 'michael.obado@techhub.com',
            role: 'Developer',
            status: 'Active',
            phone: '+254700123456'
        },
        {
            name: 'Lucy Wanjiku',
            email: 'lucy.wanjiku@creativeflow.com',
            role: 'Designer',
            status: 'Inactive',
            phone: '+254700654321'
        },
        // {
        //     name: 'James Odhiambo',
        //     email: 'james.odhiambo@solutions.co.ke',
        //     role: 'Project Manager',
        //     status: 'Active',
        //     phone: '+254701234567'
        // },
        // {
        //     name: 'Aisha Noor',
        //     email: 'aisha.noor@futuremakers.com',
        //     role: 'Data Analyst',
        //     status: 'Pending',
        //     phone: '+254702345678'
        // },
        // {
        //     name: 'Brian Mutua',
        //     email: 'brian.mutua@innovations.africa',
        //     role: 'System Admin',
        //     status: 'Active',
        //     phone: '+254703456789'
        // },
        // {
        //     name: 'Cynthia Mwikali',
        //     email: 'cynthia.mwikali@smartworks.com',
        //     role: 'Marketing Specialist',
        //     status: 'Inactive',
        //     phone: '+254704567890'
        // },
        // {
        //     name: 'Patrick Mureithi',
        //     email: 'patrick.mureithi@bizspark.co.ke',
        //     role: 'Consultant',
        //     status: 'Active',
        //     phone: '+254705678901'
        // },
        // {
        //     name: 'Faith Nyambura',
        //     email: 'faith.nyambura@visionary.com',
        //     role: 'HR Manager',
        //     status: 'Pending',
        //     phone: '+254706789012'
        // },
        // {
        //     name: 'Kelvin Mwangi',
        //     email: 'kelvin.mwangi@thinklab.com',
        //     role: 'UI/UX Designer',
        //     status: 'Active',
        //     phone: '+254707890123'
        // },
        // {
        //     name: 'Beatrice Kamau',
        //     email: 'beatrice.kamau@synergy.ke',
        //     role: 'Accountant',
        //     status: 'Inactive',
        //     phone: '+254708901234'
        // }
    ];

    return (
        <div className="shadow-sm mb-6">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-900">People</h2>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-3">
                    <button
                            className="px-3 py-2 flex items-center gap-2 text-sm hover:bg-gray-50"
                            onClick={() => setFilterActive(!filterActive)}
                        >
                            <span>Filter</span>
                        </button>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by name or email"
                                className="w-64 pl-8 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                        </div>
                        
                        <button className="px-3 py-2 bg-gray-900 text-white rounded-md flex items-center gap-2 text-sm hover:bg-gray-800">
                            <IoPerson/>
                            <span>Add new</span>
                            <FaPlus className="text-sm" />
                        </button>
                    </div>
                </div>
            </div>


            <div className='bg-white p-2 rounded-sm'>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="w-6 p-4">
                                    {/* <input type="checkbox" className="rounded border-gray-300" /> */}
                                </th>
                                <th className="px-4 text-left font-medium text-sm text-gray-600">Name</th>
                                <th className="px-4 text-left font-medium text-sm text-gray-600">Email</th>
                                <th className="px-4 text-left font-medium text-sm text-gray-600">Role</th>
                                <th className="px-4 text-left font-medium text-sm text-gray-600">Status</th>
                                <th className="px-4 text-left font-medium text-sm text-gray-600">Phone number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {peopleData.map((person, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-4">
                                        <input type="checkbox" className="rounded border-gray-300" />
                                    </td>
                                    <td className="p-4 text-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                                            <span>{person.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">{person.email}</td>
                                    <td className="p-4 text-sm text-gray-600">{person.role}</td>
                                    <td className="p-4 text-sm text-gray-600">{person.status}</td>
                                    <td className="p-4 text-sm text-gray-600">{person.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 border-t border-gray-100 pt-4">
                    <button className="w-full text-sm text-gray-600 py-2 flex items-center justify-center gap-2 hover:bg-gray-50 rounded-md">
                        View all your people
                        <FaChevronDown className="text-gray-400" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PeopleTable;