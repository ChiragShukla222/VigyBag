import React, { useState, useEffect } from 'react';
import Header from './components/AdminNavbar';
import SearchBar from '../Admin/components/SearchBar';
import ExportButton from '../Admin/components/ExportButton';
import StatsSummary from '../Admin/components/StatsSummary';
import VigyTable from '../Admin/components/VigyTable';
import Pagination from '../Admin/components/Pagination';
import AddVigyModal from '../Admin/components/AddVigyModal';
import ProfileModal from '../Admin/components/ProfileModal';

const AdminPanel = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [selectedVigy, setSelectedVigy] = useState(null);
    const [showExportOptions, setShowExportOptions] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const savedData = localStorage.getItem('vigyData');
        if (savedData) {
            setData(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('vigyData', JSON.stringify(data));
    }, [data]);

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const itemsPerPage = 15;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const pageNumbers = Math.ceil(filteredData.length / itemsPerPage);

    const handleAddVigy = (newVigy) => {
        const newId = `#${Math.floor(1000 + Math.random() * 9000)}`;
        const newVigyWithId = { ...newVigy, id: newId };
        setData(prevData => [...prevData, newVigyWithId]);
        setShowAddModal(false);
    };

    const handleViewProfile = (vigy) => {
        setSelectedVigy(vigy);
        setShowProfileModal(true);
    };

    const handleDeleteVigy = (id) => {
        setData(prevData => prevData.filter(vigy => vigy.id !== id));
        setShowProfileModal(false);
    };

    return (
        <div className="min-h-screen bg-gray-100">
           
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row justify-between mb-6">
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <div className="flex space-x-2">
                        <button onClick={() => setShowAddModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded">+ Add New Vigy</button>
                        <ExportButton 
                            showExportOptions={showExportOptions} 
                            setShowExportOptions={setShowExportOptions} 
                            filteredData={filteredData} 
                        />
                    </div>
                </div>

                <StatsSummary data={data} />

                <VigyTable 
                    currentItems={currentItems} 
                    handleViewProfile={handleViewProfile} 
                />

                <Pagination 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageNumbers={pageNumbers}
                />
            </main>

            {showAddModal && (
                <AddVigyModal 
                    setShowAddModal={setShowAddModal} 
                    handleAddVigy={handleAddVigy} 
                />
            )}

            {showProfileModal && selectedVigy && (
                <ProfileModal 
                    selectedVigy={selectedVigy} 
                    setShowProfileModal={setShowProfileModal} 
                    handleDeleteVigy={handleDeleteVigy} 
                />
            )}
        </div>
    );
};

export default AdminPanel;