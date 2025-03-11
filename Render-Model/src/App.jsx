import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FileUpload } from "./components/FileUpload.jsx";
import ModelViewer from './components/ModelViewer.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FileUpload />} />
        <Route path="/viewer/:filename" element={<ModelViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
