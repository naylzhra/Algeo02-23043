import React, { useState } from 'react';

export default function SideBar({ type }) {
    const [selectedAudioFile, setSelectedAudioFile] = useState(null);
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [selectedMapperFile, setSelectedMapperFile] = useState(null);
    const [selectedQueryFile, setSelectedQueryFile] = useState(null);
    const [isDatabaseLoaded, setIsDatabaseLoaded] = useState(false);

    const handleDatabaseAudio = async () => {
        if (!selectedAudioFile) {
            alert('Please select an audio file.');
            return false;
        }

        const formData = new FormData();
        formData.append('file', selectedAudioFile);

        try {
            const response = await fetch('http://localhost:8000/upload-database-audio/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Failed to upload audio file');

            const result = await response.json();
            alert(result.message);
            return true;
        } catch (error) {
            alert('Audio database upload failed!');
            setSelectedAudioFile(null);
            return false;
        }
    };

    const handleDatabaseImage = async () => {
        if (!selectedImageFile) {
            alert('Please select an image file.');
            return false;
        }

        const formData = new FormData();
        formData.append('file', selectedImageFile);

        try {
            const response = await fetch('http://localhost:8000/upload-database-image/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Failed to upload image file');

            const result = await response.json();
            alert(result.message);
            return true;
        } catch (error) {
            alert('Image upload failed!');
            setSelectedImageFile(null);
            return false;
        }
    };

    const handleMapper = async () => {
        if (!selectedMapperFile) {
            alert('Please select a mapper file.');
            return false;
        }

        const formData = new FormData();
        formData.append('file', selectedMapperFile);

        try {
            const response = await fetch('http://localhost:8000/upload-mapper/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Failed to upload mapper file');

            const result = await response.json();
            alert(result.message);
            return true;
        } catch (error) {
            alert('Mapper upload failed!');
            setSelectedMapperFile(null);
            return false;
        }
    };

    const handleLoadDatabase = async (e) => {
        e.preventDefault();
        const audioUploaded = await handleDatabaseAudio();
        const imageUploaded = await handleDatabaseImage();
        const mapperUploaded = await handleMapper();

        if (audioUploaded && imageUploaded && mapperUploaded) {
            setIsDatabaseLoaded(true);
            alert('Database successfully uploaded!');
        }
    };

    const handleStart = async (e) => {
        e.preventDefault();
        if (!isDatabaseLoaded) {
            alert('Please load the database before starting a query.');
            return;
        }

        if (!selectedQueryFile) {
            alert('Please select a query file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedQueryFile);

        try {
            const response = await fetch('http://localhost:8000/start-query/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Failed to start query');

            const result = await response.json();
            alert(result.message);
        } catch (error) {
            alert('Query process failed!');
            setSelectedQueryFile(null);
        }
    };

    return (
        <div className="bg-opacity-40 bg-white-25 h-[80vh] rounded-[23px] p-6 flex flex-col items-center gap-2">
            <div className="w-full h-[200px] bg-white-50 rounded-xl flex items-center justify-center cursor-pointer">
                <label className="text-black font-medium flex flex-col items-center">
                    {type === 'album' ? 'Upload Image' : 'Upload Humming'}
                    <input
                        type="file"
                        accept={type === 'album' ? '.jpg,.jpeg,.png' : '.mid'}
                        className="hidden"
                        onChange={(e) => setSelectedQueryFile(e.target.files[0])}
                    />
                </label>
            </div>
            <p className="text-sm text-white-25">
                Query: {selectedQueryFile ? selectedQueryFile.name : 'none'}
            </p>
            <button
                onClick={handleStart}
                className="text-blue-25 font-semibold mt-5 w-full bg-yellow-25 hover:bg-amber-500 py-2 rounded-lg font-medium"
            >
                START
            </button>
            <div className="file-upload-container w-full flex flex-col items-center">
                <label className="text-white-25 mt-4 w-full bg-pink-25 hover:bg-red-500 py-2 rounded-lg font-medium text-center cursor-pointer">
                    Dataset Audio
                    <input
                        type="file"
                        accept=".zip,.rar"
                        className="hidden"
                        onChange={(e) => setSelectedAudioFile(e.target.files[0])}
                    />
                </label>
                <p className="text-sm text-white-25">
                    Selected: {selectedAudioFile ? selectedAudioFile.name : 'none'}
                </p>
                <label className="text-white-25 mt-1 w-full bg-pink-25 hover:bg-red-500 py-2 rounded-lg font-medium text-center cursor-pointer">
                    Dataset Image
                    <input
                        type="file"
                        accept=".zip,.rar"
                        className="hidden"
                        onChange={(e) => setSelectedImageFile(e.target.files[0])}
                    />
                </label>
                <p className="text-sm text-white-25">
                    Selected: {selectedImageFile ? selectedImageFile.name : 'none'}
                </p>
                <label className="text-white-25 mt-1 w-full bg-pink-25 hover:bg-red-500 py-2 rounded-lg font-medium text-center cursor-pointer">
                    Mapper
                    <input
                        type="file"
                        accept=".json,.txt"
                        className="hidden"
                        onChange={(e) => setSelectedMapperFile(e.target.files[0])}
                    />
                </label>
                <p className="text-sm text-white-25">
                    Selected: {selectedMapperFile ? selectedMapperFile.name : 'none'}
                </p>
                <button
                    onClick={handleLoadDatabase}
                    className="text-bold text-white-25 mt-2 w-[80%] bg-pink-25 hover:bg-red-500 py-2 rounded-lg font-medium"
                >
                    Load Database
                </button>
            </div>
        </div>
    );
}
