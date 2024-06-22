// // File: ImageUploader.tsx

// import React, { useState } from 'react';

// interface ImageUploaderProps {
//     isConnected: boolean;
// }

// const ImageUploader: React.FC<ImageUploaderProps> = ({ isConnected }) => {
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);
//     const [errorMessage, setErrorMessage] = useState<string>('');

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files ? event.target.files[0] : null;
//         if (!file) {
//             return;
//         }

//         if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) {
//             setErrorMessage('Please upload an image in PNG, JPG, or JPEG format.');
//             return;
//         }

//         if (file.size > 5242880) { // 5 MB in bytes
//             setErrorMessage('File size should be less than 5 MB.');
//             return;
//         }

//         setSelectedFile(file);
//         setErrorMessage('');
//     };

//     const handleRemoveImage = () => {
//         setSelectedFile(null);
//     };

//     if (!isConnected) {
//         return <div>Please sign in with your wallet.</div>;
//     }

//     return (
//         <div>
//             <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
//             {selectedFile && (
//                 <div>
//                     <img src={URL.createObjectURL(selectedFile)} alt="Uploaded Image" />
//                     <button onClick={handleRemoveImage}>Remove Image</button>
//                 </div>
//             )}
//             {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
//         </div>
//     );
// };

// export default ImageUploader;


// better version 👇

// import React, { useState } from 'react';

// interface ImageUploaderProps {
//     isConnected: boolean;
// }

// const ImageUploader: React.FC<ImageUploaderProps> = ({ isConnected }) => {
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);
//     const [fileName, setFileName] = useState<string>(''); // New state variable for file name
//     const [errorMessage, setErrorMessage] = useState<string>('');

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files ? event.target.files[0] : null;
//         if (!file) {
//             return;
//         }

//         if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) {
//             setErrorMessage('Please upload an image in PNG, JPG, or JPEG format.');
//             return;
//         }

//         if (file.size > 5242880) { // 5 MB in bytes
//             setErrorMessage('File size should be less than 5 MB.');
//             return;
//         }

//         setSelectedFile(file);
//         setFileName(file.name); // Update file name state
//         setErrorMessage('');
//     };

//     const handleRemoveImage = () => {
//         setSelectedFile(null);
//         setFileName(''); // Clear file name state
//     };

//     if (!isConnected) {
//         return <div>Please sign in with your wallet.</div>;
//     }

//     return (
//         <div>
//             <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
//             {selectedFile && (
//                 <div>
//                     <img src={URL.createObjectURL(selectedFile)} alt="Uploaded Image" />
//                     <div>{fileName}</div> {/* Display the file name */}
//                     <button onClick={handleRemoveImage}>Remove Image</button>
//                 </div>
//             )}
//             {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
//         </div>
//     );
// };

// export default ImageUploader;



import React, { useState } from 'react';

interface ImageUploaderProps {
    isConnected: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ isConnected }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (!file) {
            return;
        }

        // Request permission and fetch current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    // Proceed with file handling and include location in metadata
                    
                },
                (error) => {
                    console.error('Error fetching location', error);
                    setLocation(null); // Handle error or set default location
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            setLocation(null); // Handle case where geolocation is not supported
        }

        setSelectedFile(file);
        setFileName(file.name);
        setErrorMessage('');
    };

    const handleRemoveImage = () => {
        setSelectedFile(null);
        setFileName('');
        setLocation(null); // Clear location state
    };

    if (!isConnected) {
        return <div>Please sign in with your wallet.</div>;
    }

    return (
        <div>
            <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
            {selectedFile && (
                <div>
                    <img src={URL.createObjectURL(selectedFile)} alt="Uploaded Image" />
                    <div>{fileName}</div> {/* Display the file name */}
                    <button onClick={handleRemoveImage} className="border border-red-500">Remove Image</button>
                    {location && (
                        <div>
                            Location: Latitude {location.latitude}, Longitude {location.longitude}
                        </div>
                    )}
                    <button className='border border-green-500'>Mint as NFT 🚀</button>
                </div>
            )}
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </div>
    );
};

export default ImageUploader;