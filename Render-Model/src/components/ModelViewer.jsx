import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import * as THREE from "three";

const ModelViewer = () => {
    const { filename } = useParams();
    console.log(filename);
    const modelPath = `http://localhost:5000/models/${filename}`;
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                position: "relative",
                background: "linear-gradient(135deg, #e0e7ff 0%, #dbeafe 100%)",
                overflow: "hidden",
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }} // Initial position, will be adjusted
                style={{ width: "100%", height: "100%" }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Model url={modelPath} />
                <OrbitControls enableZoom enablePan enableRotate />
            </Canvas>

            <div
                style={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    fontFamily: "'Roboto', sans-serif",
                    color: "#333",
                    fontSize: "18px",
                    fontWeight: "600",
                }}
            >
                Viewing: {filename}
            </div>
        </div>
    );
};

const Model = ({ url }) => {
    const geometry = useLoader(STLLoader, url);
    const { camera, scene } = useThree();

    useEffect(() => {
        if (!geometry) return;

        // Center the geometry at the origin
        geometry.center();

        // Create a mesh to compute the bounding box
        const mesh = new THREE.Mesh(geometry);
        const box = new THREE.Box3().setFromObject(mesh);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Calculate the distance to fit the model in view
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180); // Convert FOV to radians
        const distance = Math.abs(maxDim / (2 * Math.tan(fov / 2))) * 1.5; // Add padding with *1.5

        // Position the camera
        camera.position.set(0, 0, distance); // Along Z-axis
        camera.lookAt(center); // Look at the model's center
        camera.updateProjectionMatrix(); // Apply changes

        // Optional: Log for debugging
        console.log("Model Size:", size);
        console.log("Camera Distance:", distance);
    }, [geometry, camera]);

    return (
        <mesh>
            <primitive object={geometry} attach="geometry" />
            <meshStandardMaterial color="gray" />
        </mesh>
    );
};

export default ModelViewer;