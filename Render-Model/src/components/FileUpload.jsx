import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FileUpload.css";

export const FileUpload = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submitHandler = async (event) => {
        event.preventDefault();
        
        const selectedFile = event.target.ThreeDModel.files[0];

        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }

        if (!selectedFile.name.endsWith(".stl") && !selectedFile.name.endsWith(".obj")) {
            alert("Please upload an STL or OBJ file only.");
            return;
        }

        setIsUploading(true);
        setError("");
        
        try {
            const formData = new FormData();
            formData.append("file", selectedFile);

            const response = await fetch("http://localhost:5000/model", {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            
            if (response.ok && result.filename) {
                navigate(`/viewer/${result.filename}`);
            } else {
                setError(result.error || "File upload failed.");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="upload-container">
            <form onSubmit={submitHandler} className="upload-form">
                <h2>Upload a 3D Model</h2>
                <input
                    type="file"
                    name="ThreeDModel"
                    accept=".stl,.obj"
                    className="upload-input"
                />
                <button
                    type="submit"
                    disabled={isUploading}
                    className="upload-button"
                >
                    {isUploading ? "Uploading..." : "Submit"}
                </button>

                {error && <h3 className="error-message">{error}</h3>}
            </form>
        </div>
    );
};