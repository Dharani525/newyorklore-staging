// "use client";

// import { Helmet } from "react-helmet";
// import {
//   addstories,
//   getAllstories,
//   getstoriesById,
//   updatestories,
// } from "../api/CRUD";
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// // Removed Next.js imports since not using Next.js

// const StoriesForm = () => {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   // Fixed: Separate state for form data (single story) and stories list (array)
//   const [storyForm, setStoryForm] = useState({
//     name: "",
//     email: "",
//     title: "",
//     body: "",
//     badge: "",
//     media: null, // Will store { fileData, fileName, fileType }
//   });

//   const [storiesList, setStoriesList] = useState([]); // Array for all stories
//   const [editingId, setEditingId] = useState(null);
//   const [showstoriesList, setShowstoriesList] = useState(false);

//   // Load stories and check for ID parameter on component mount
//   useEffect(() => {
//     loadstories();



//     if (id) {
//       handleEditFromParams(id);
//     }
//   }, []);

//   const loadstories = async () => {
//     try {
//       const data = await getAllstories();
//       setStoriesList(data); // Fixed: Set to storiesList array
//     } catch (error) {
//       toast.error("Failed to load stories", { position: "top-right" });
//       console.error("Load stories error:", error);
//     }
//   };

//   // New function to handle editing from URL parameters
//   const handleEditFromParams = async (id) => {
//     try {
//       const storiesData = await getstoriesById(id);
//       if (storiesData) {
//         setStoryForm({
//           name: storiesData.name || "",
//           email: storiesData.email || "",
//           title: storiesData.title || "",
//           body: storiesData.body || "",
//           badge: storiesData.badge || "",
//           media: storiesData.media || null,
//         });
//         setEditingId(id);
//         setShowstoriesList(false); // Show form for editing
//         // toast.info("Story loaded for editing from URL", { position: "top-right" });
//       } else {
//         toast.error("Story not found", { position: "top-right" });
//       }
//     } catch (error) {
//       toast.error("Failed to load story from URL", { position: "top-right" });
//       console.error("Edit from params error:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setStoryForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleMediaChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];

//       // Validate file type
//       if (!file.type.match('image.*') && !file.type.match('video.*')) {
//         toast.error("Please upload an image or video file", { position: "top-right" });
//         return;
//       }

//       // Validate file size (5MB limit)
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error("File size too large (max 5MB)", { position: "top-right" });
//         return;
//       }

//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setStoryForm((prev) => ({
//           ...prev,
//           media: {
//             fileData: event.target.result,
//             fileName: file.name,
//             fileType: file.type
//           }
//         }));
//       };
//       reader.onerror = (error) => {
//         toast.error("Error reading file", { position: "top-right" });
//         console.error("Error reading file:", error);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (editingId) {
//         // Update existing story using editingId
//         const data = await updatestories(editingId, storyForm);
//         if (data) {
//           toast.success("Story updated successfully", { position: "top-right" });
//           setEditingId(null);
//           resetForm();
//           loadstories();
//           // Clear URL parameter after successful update using standard browser API
//           const url = new URL(window.location);
//           url.searchParams.delete('id');
//           window.history.replaceState({}, '', url);
//           navigate("/")
//         } else {
//           toast.error("Failed to update story", { position: "top-right" });
//         }
//       } else {
//         // Add new story
//         const data = await addstories(storyForm);
//         if (data) {
//           toast.success("Story added successfully", { position: "top-right" });
//           resetForm();
//           loadstories();
//         } else {
//           toast.error("Failed to add story", { position: "top-right" });
//         }
//       }
//     } catch (error) {
//       toast.error("An error occurred. Please try again.", { position: "top-right" });
//       console.error("Submission error:", error);
//     }
//   };


//   const resetForm = () => {
//     setStoryForm({
//       name: "",
//       email: "",
//       title: "",
//       body: "",
//       media: null,
//     });
//     setEditingId(null);
//   };

//   const cancelEdit = () => {
//     resetForm();
//     // Clear URL parameter when canceling edit using standard browser API
//     const url = new URL(window.location);
//     url.searchParams.delete('id');
//     window.history.replaceState({}, '', url);
//     toast.info("Edit cancelled", { position: "top-right" });
//   };

//   const removeMedia = () => {
//     setStoryForm(prev => ({ ...prev, media: null }));
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Submit Stories | New York Lore - Discover the Untold Stories</title>
//         <meta name="description" content="A New York Lore platform showcasing New York’s hidden street-art, urban legends, and community stories—through photos, videos, poems, sketches, and interactive features." />
//       </Helmet>
//       <div className="overflow-hidden min-h-screen">
//         <div className="flex items-center min-h-screen justify-center bg-gray-900 text-white px-10">
//           {/* Form Container */}
//           <div className="w-full bg-gray-800 p-8 rounded-lg shadow-lg">
//             <h2 className="text-3xl font-bold text-center text-green-400 mb-6">
//               {editingId ? "Edit Stories" : "Add New Stories"}
//             </h2>

//             {editingId && (
//               <div className="text-center mb-4">
//                 <button
//                   onClick={cancelEdit}
//                   className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-400 transition mr-2"
//                 >
//                   Cancel Edit
//                 </button>
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Left Side */}
//               <div className="space-y-4">
//                 {/* Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300">Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
//                     placeholder="Enter your name"
//                     value={storyForm.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
//                     placeholder="Enter your email"
//                     value={storyForm.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* Title */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300">Title</label>
//                   <input
//                     type="text"
//                     name="title"
//                     className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
//                     placeholder="Enter story title"
//                     value={storyForm.title}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* Badge Dropdown */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300">Badge</label>
//                   <select
//                     name="badge"
//                     value={storyForm.badge}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
//                     required
//                   >
//                     <option value="" >Select a badge</option>
//                     <option value="Article">Article</option>
//                     <option value="Poems">Poems</option>
//                     <option value="Stories">Stories</option>
//                   </select>
//                 </div>


//                 {/* Media Upload */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300">
//                     {storyForm.media ? "Replace Media" : "Upload Image or Video"}
//                   </label>
//                   <input
//                     type="file"
//                     accept="image/*,video/*"
//                     className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none cursor-pointer"
//                     onChange={handleMediaChange}
//                   />
//                   <p className="text-xs text-gray-400 mt-1">Supports images and videos (max 5MB)</p>

//                   {/* Media Preview */}
//                   {storyForm.media && storyForm.media.fileType && (
//                     <div className="mb-4">
//                       {storyForm.media.fileType.match('image.*') ? (
//                         <img
//                           src={storyForm.media.fileData}
//                           alt="Story media"
//                           className="w-full h-auto rounded-md"
//                         />
//                       ) : storyForm.media.fileType.match('video.*') ? (
//                         <video
//                           muted
//                           loop
//                           src={storyForm.media.fileData}
//                           autoPlay
//                           className="w-full h-auto rounded-md"
//                         />
//                       ) : (
//                         <div className="text-gray-400 text-sm">
//                           Unsupported media type: {storyForm.media.fileType}
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Right Side */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-300">Body (Story Content)</label>
//                 <textarea
//                   name="body"
//                   className="w-full h-[375px] px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none resize-none"
//                   placeholder="Write your story here..."
//                   value={storyForm.body}
//                   onChange={handleChange}
//                   required
//                 ></textarea>
//                 <button
//                   type="submit"
//                   className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-400 transition"
//                 >
//                   {editingId ? "Update Story" : "Add Story"}
//                 </button>
//                 <Link to="/stories">
//                   <button
//                     type="button"
//                     onClick={() => setShowstoriesList(true)}
//                     className="w-full mt-2 py-2 text-white bg-green-500 rounded-md hover:bg-green-400 transition"
//                   >
//                     Show All Stories
//                   </button>
//                 </Link>
//               </div>
//             </form>
//           </div>
//         </div>
//         <ToastContainer />
//       </div>
//     </>
//   );
// };

// export default StoriesForm;

// "use client";

// import { Helmet } from "react-helmet";
// import { useState, useEffect } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { AdvancedImage, AdvancedVideo } from '@cloudinary/react';
// import { Cloudinary } from '@cloudinary/url-gen';
// import { addstories, getAllstories, getstoriesById } from "../api/CRUD";

// // Initialize Cloudinary instance
// const cld = new Cloudinary({
//   cloud: {
//     cloudName: 'dcevzhfy9' // Replace with your Cloudinary cloud name
//   }
// });

// const StoriesForm = () => {
//   const { id } = useParams();
//   console.log(id)
//   const navigate = useNavigate();
//   const [storyForm, setStoryForm] = useState({
//     name: "",
//     email: "",
//     title: "",
//     body: "",
//     badge: "",
//     media: null, // Will store { publicId, url, fileType, format }
//   });

//   const [storiesList, setStoriesList] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [showstoriesList, setShowstoriesList] = useState(false);

//   useEffect(() => {
//     loadstories();
//     if (id) {
//       handleEditFromParams(id);
//     }
//   }, []);

//   const loadstories = async () => {
//     try {
//       const data = await getAllstories();
//       setStoriesList(data);
//     } catch (error) {
//       console.error("Load stories error:", error);
//     }
//   };

//   const handleEditFromParams = async (id) => {
//     try {
//       const storiesData = await getstoriesById(id);
//       if (storiesData) {
//         setStoryForm({
//           name: storiesData.name || "",
//           email: storiesData.email || "",
//           title: storiesData.title || "",
//           body: storiesData.body || "",
//           badge: storiesData.badge || "",
//           media: storiesData.media || null,
//         });
//         setEditingId(id);
//         setShowstoriesList(false);
//       } else {
//         toast.error("Story not found", { position: "top-right" });
//       }
//     } catch (error) {
//       console.error("Edit from params error:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setStoryForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleMediaChange = async (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];

//       // Validate file
//       if (!file.type.match('image.*') && !file.type.match('video.*')) {
//         toast.error("Only images and videos are allowed");
//         return;
//       }

//       try {
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('upload_preset', 'stories_upload'); // Your preset name
//         formData.append('folder', 'TechAssignment');

//         // Use original filename as public_id
//         formData.append('public_id', file.name.split('.')[0]); // Remove extension

//         const response = await fetch(
//           `https://api.cloudinary.com/v1_1/dcevzhfy9/upload`,
//           {
//             method: 'POST',
//             body: formData
//           }
//         );

//         const data = await response.json();

//         if (data.error) {
//           throw new Error(data.error.message);
//         }

//         // Update state with Cloudinary response
//         setStoryForm(prev => ({
//           ...prev,
//           media: {
//             publicId: data.public_id,
//             url: data.secure_url,
//             fileType: data.resource_type,
//             format: data.format
//           }
//         }));

//         toast.success({
//           render: "Media uploaded successfully!",
//           type: "success",
//           isLoading: false,
//           autoClose: 3000
//         });
//       } catch (error) {
//         toast.error(`Upload failed: ${error.message}`, { position: "top-right" });
//         console.error("Upload error:", error);
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (editingId) {
//         // Update existing story using editingId
//         const data = await updatestories(editingId, storyForm);
//         if (data) {
//           toast.success("Story updated successfully", { position: "top-right" });
//           setEditingId(null);
//           resetForm();
//           loadstories();
//           const url = new URL(window.location);
//           url.searchParams.delete('id');
//           window.history.replaceState({}, '', url);
//           navigate("/");
//         } else {
//           toast.error("Failed to update story", { position: "top-right" });
//         }
//       } else {
//         // Add new story
//         const data = await addstories(storyForm);
//         if (data) {
//           toast.success("Story added successfully", { position: "top-right" });
//           resetForm();
//           loadstories();
//         } else {
//           toast.error("Failed to add story", { position: "top-right" });
//         }
//       }
//     } catch (error) {
//       toast.error("An error occurred. Please try again.", { position: "top-right" });
//       console.error("Submission error:", error);
//     }
//   };

//   const resetForm = () => {
//     setStoryForm({
//       name: "",
//       email: "",
//       title: "",
//       body: "",
//       badge: "",
//       media: null,
//     });
//     setEditingId(null);
//   };

//   const cancelEdit = () => {
//     resetForm();
//     const url = new URL(window.location);
//     url.searchParams.delete('id');
//     window.history.replaceState({}, '', url);
//     toast.info("Edit cancelled", { position: "top-right" });
//   };

//   const removeMedia = () => {
//     setStoryForm(prev => ({ ...prev, media: null }));
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Submit Stories | New York Lore - Discover the Untold Stories</title>
//         <meta name="description" content="A New York Lore platform showcasing New York's hidden street-art, urban legends, and community stories—through photos, videos, poems, sketches, and interactive features." />
//       </Helmet>
//       <div className="overflow-hidden min-h-screen">
//         <div className="flex items-center min-h-screen justify-center bg-gray-900 text-white px-10">
//           {/* Form Container */}
//           <div className="w-full bg-gray-800 p-8 rounded-lg shadow-lg">
//             <h2 className="text-3xl font-bold text-center text-green-400 mb-6">
//               {editingId ? "Edit Stories" : "Add New Stories"}
//             </h2>

//             {editingId && (
//               <div className="text-center mb-4">
//                 <button
//                   onClick={cancelEdit}
//                   className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-400 transition mr-2"
//                 >
//                   Cancel Edit
//                 </button>
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Left Side */}
//               <div className="space-y-4">
//                 {/* Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300">Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
//                     placeholder="Enter your name"
//                     value={storyForm.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
//                     placeholder="Enter your email"
//                     value={storyForm.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* Title */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300">Title</label>
//                   <input
//                     type="text"
//                     name="title"
//                     className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
//                     placeholder="Enter story title"
//                     value={storyForm.title}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* Badge Dropdown */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300">Badge</label>
//                   <select
//                     name="badge"
//                     value={storyForm.badge}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
//                     required
//                   >
//                     <option value="">Select a badge</option>
//                     <option value="Article">Article</option>
//                     <option value="Poems">Poems</option>
//                     <option value="Stories">Stories</option>
//                   </select>
//                 </div>

//                 {/* Media Upload */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300">
//                     {storyForm.media ? "Replace Media" : "Upload Image or Video"}
//                   </label>
//                   <input
//                     type="file"
//                     accept="image/*,video/*"
//                     className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none cursor-pointer"
//                     onChange={handleMediaChange}
//                   />
//                   <p className="text-xs text-gray-400 mt-1">Supports images and videos (max 5MB)</p>

//                   {/* Media Preview */}
//                   {storyForm.media && storyForm.media.publicId && (
//                     <div className="mb-4">
//                       {storyForm.media.fileType === 'image' ? (
//                         <AdvancedImage
//                           cldImg={cld.image(storyForm.media.publicId)}
//                           className="w-full h-auto rounded-md"
//                           alt="Story media"
//                         />
//                       ) : storyForm.media.fileType === 'video' ? (
//                         <AdvancedVideo
//                           cldVid={cld.video(storyForm.media.publicId)}
//                           className="w-full h-auto rounded-md"
//                           autoPlay
//                           muted
//                           loop
//                         />
//                       ) : (
//                         <div className="text-gray-400 text-sm">
//                           Unsupported media type
//                         </div>
//                       )}
//                       <button
//                         type="button"
//                         onClick={removeMedia}
//                         className="mt-2 px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-400 transition"
//                       >
//                         Remove Media
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Right Side */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-300">Body (Story Content)</label>
//                 <textarea
//                   name="body"
//                   className="w-full h-[375px] px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none resize-none"
//                   placeholder="Write your story here..."
//                   value={storyForm.body}
//                   onChange={handleChange}
//                   required
//                 ></textarea>
//                 <button
//                   type="submit"
//                   className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-400 transition"
//                 >
//                   {editingId ? "Update Story" : "Add Story"}
//                 </button>
//                 <Link to="/stories">
//                   <button
//                     type="button"
//                     onClick={() => setShowstoriesList(true)}
//                     className="w-full mt-2 py-2 text-white bg-green-500 rounded-md hover:bg-green-400 transition"
//                   >
//                     Show All Stories
//                   </button>
//                 </Link>
//               </div>
//             </form>
//           </div>
//         </div>
//         <ToastContainer />
//       </div>
//     </>
//   );
// };

// export default StoriesForm;


"use client";

import { Helmet } from "react-helmet";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdvancedImage, AdvancedVideo } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { addstories, getAllstories, getstoriesById, updatestories } from "../api/CRUD";

// Initialize Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: 'dcevzhfy9'
  }
});

const StoriesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [storyForm, setStoryForm] = useState({
    name: "",
    email: "",
    title: "",
    body: "",
    badge: "",
    media: null,
  });

  const [storiesList, setStoriesList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showstoriesList, setShowstoriesList] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadstories();
    if (id) {
      handleEditFromParams(id);
    }
  }, [id]);

  const loadstories = async () => {
    try {
      const data = await getAllstories();
      setStoriesList(data);
    } catch (error) {
      toast.error("Failed to load stories", { position: "top-right" });
      console.error("Load stories error:", error);
    }
  };

  const handleEditFromParams = async (id) => {
    try {
      const storiesData = await getstoriesById(id);
      if (storiesData) {
        setStoryForm({
          name: storiesData.name || "",
          email: storiesData.email || "",
          title: storiesData.title || "",
          body: storiesData.body || "",
          badge: storiesData.badge || "",
          media: storiesData.media || null,
        });
        setEditingId(id);
        setShowstoriesList(false);
      }
    } catch (error) {
      toast.error("Failed to load story", { position: "top-right" });
      console.error("Edit from params error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMediaChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!file.type.match('image.*') && !file.type.match('video.*')) {
        toast.error("Only images and videos are allowed");
        return;
      }

      try {
        setIsUploading(true);
        const toastId = toast.loading("Uploading media...", { position: "top-right" });

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'stories_upload');
        formData.append('folder', 'TechAssignment');
        formData.append('public_id', `${Date.now()}_${file.name.split('.')[0]}`);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dcevzhfy9/upload`,
          { method: 'POST', body: formData }
        );

        const data = await response.json();

        if (!response.ok) throw new Error(data.error?.message || 'Upload failed');

        setStoryForm(prev => ({
          ...prev,
          media: {
            publicId: data.public_id,
            url: data.secure_url,
            fileType: data.resource_type,
            format: data.format
          }
        }));

        toast.update(toastId, {
          render: "Media uploaded successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000
        });
      } catch (error) {
        toast.error(`Upload failed: ${error.message}`);
        console.error("Upload error:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const data = await updatestories(editingId, storyForm);
        if (data) {
          toast.success("Story updated successfully");
          resetForm();
          navigate("/");
        }
      } else {
        const data = await addstories(storyForm);
        if (data) {
          toast.success("Story added successfully");
          resetForm();
        }
      }
      loadstories();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Submission error:", error);
    }
  };

  const resetForm = () => {
    setStoryForm({
      name: "",
      email: "",
      title: "",
      body: "",
      badge: "",
      media: null,
    });
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeMedia = () => {
    setStoryForm(prev => ({ ...prev, media: null }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const cancelEdit = () => {
    resetForm();
    navigate("/");
    toast.info("Edit cancelled");
  };

  return (
    <>
      <Helmet>
        <title>Submit Stories | New York Lore</title>
        <meta name="description" content="Share your New York stories through photos, videos, and more." />
      </Helmet>
      <div className="overflow-hidden min-h-screen">
        <div className="flex items-center min-h-screen justify-center bg-gray-900 text-white px-10">
          <div className="w-full bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-green-400 mb-6">
              {editingId ? "Edit Story" : "Add New Story"}
            </h2>

            {editingId && (
              <div className="text-center mb-4">
                <button
                  onClick={cancelEdit}
                  className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-400 transition"
                >
                  Cancel Edit
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Author Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
                    value={storyForm.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
                    value={storyForm.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
                    value={storyForm.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">Badge</label>
                  <select
                    name="badge"
                    value={storyForm.badge}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
                    required
                  >
                    <option value="">Select a badge</option>
                    <option value="Article">Article</option>
                    <option value="Poems">Poems</option>
                    <option value="Stories">Stories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    {storyForm.media ? "Replace Media" : "Upload Image or Video"}
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*,video/*"
                    disabled={isUploading}
                    className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none cursor-pointer disabled:opacity-50"
                    onChange={handleMediaChange}
                  />
                  <p className="text-xs text-gray-400 mt-1">Supports images and videos (max 5MB)</p>

                  {storyForm.media && storyForm.media.publicId && (
                    <div className="mb-4 mt-2">
                      {storyForm.media.fileType === 'image' ? (
                        <AdvancedImage
                          key={`img-${storyForm.media.publicId}`}
                          cldImg={cld.image(storyForm.media.publicId)}
                          className="w-full h-auto rounded-md"
                          alt="Story media"
                        />
                      ) : (
                        <AdvancedVideo
                          key={`vid-${storyForm.media.publicId}`}
                          cldVid={cld.video(storyForm.media.publicId)}
                          className="w-full h-auto rounded-md"
                          autoPlay
                          muted
                          loop
                        />
                      )}
                      <button
                        type="button"
                        onClick={removeMedia}
                        className="mt-2 px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-400 transition"
                        disabled={isUploading}
                      >
                        Remove Media
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Story Content</label>
                <textarea
                  name="body"
                  className="w-full h-[375px] px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none resize-none"
                  value={storyForm.body}
                  onChange={handleChange}
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-400 transition mt-4"
                  disabled={isUploading}
                >
                  {editingId ? "Update Story" : "Add Story"}
                </button>
                <Link to="/stories">
                  <button
                    type="button"
                    className="w-full mt-2 py-2 text-white bg-green-500 rounded-md hover:bg-green-400 transition"
                  >
                    Show All Stories
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
};

export default StoriesForm;