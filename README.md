# Web-Based CAD Viewer

## Overview
A web-based CAD viewer that allows users to upload, view, and manipulate 3D models (STL/OBJ). Built using React (or Vue) for the frontend, Three.js for rendering, and Flask/Django for backend file handling.

## Features
- Upload and display 3D models (STL/OBJ format)
- Interactive UI for rotating, zooming, and panning
- Backend API for handling file uploads and retrieval

## Tech Stack
- **Frontend:** React/Vue.js, Three.js
- **Backend:** Flask/Django
- **Storage:** Local file system (or cloud storage)

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- Node.js & npm (for frontend)
- Python & pip (for backend)
- Flask/Django (depending on backend choice)

### Frontend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/web-cad-viewer.git
   cd web-cad-viewer/frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

### Backend Setup (Flask)
1. Navigate to the backend folder:
   ```sh
   cd ../backend
   ```
2. Create a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Run the Flask server:
   ```sh
   python app.py
   ```

### Backend Setup (Django)
1. Navigate to the backend folder:
   ```sh
   cd ../backend
   ```
2. Create a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Apply migrations and start the Django server:
   ```sh
   python manage.py migrate
   python manage.py runserver
   ```

## Usage
1. Open the frontend in your browser.
2. Upload an STL/OBJ file.
3. Use the controls to rotate, zoom, and pan the model.

## Directory Structure
```
web-cad-viewer/
│── frontend/        # React/Vue app
│── backend/         # Flask/Django API
│── models/          # Uploaded 3D models
│── README.md        # Project documentation
│── requirements.txt # Backend dependencies
```

## Contributing
Feel free to open issues or submit PRs!

## License
This project is licensed under the MIT License.


## Contact
For any queries, reach out at [anirudhreddy89201@gmail.com].

