// "use client";

// import {
//   addstories,
//   getAllstories,
//   getstoriesById,
//   updatestories,
//   deletestories,
//   searchstories
// } from "../api/CRUD";
// import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const StoriesForm = () => {
//   const [stories, setstories] = useState({
//     name: "",
//     email: "",
//     title: "",
//     body: "",
//     media: null, // Will store { fileData, fileName, fileType }
//   });

//   // const [stories, setstories] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showstoriesList, setShowstoriesList] = useState(false);

//   // Load stories on component mount
//   useEffect(() => {
//     loadstories();
//   }, []);

//   const loadstories = async () => {
//     const data = await getAllstories();
//     setstories(data);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setstories((prev) => ({ ...prev, [name]: value }));
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
//         setstories((prev) => ({
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
//         // Update existing stories
//         const data = await updatestories(editingId, stories);
//         if (data) {
//           toast.success("Story updated successfully", { position: "top-right" });
//           setEditingId(null);
//           resetForm();
//           loadstories();
//         } else {
//           toast.error("Failed to update story", { position: "top-right" });
//         }
//       } else {
//         // Add new stories
//         const data = await addstories(stories);
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

//   const handleEdit = async (id) => {
//     try {
//       const storiesData = await getstoriesById(id);
//       if (storiesData) {
//         setstories({
//           name: storiesData.name,
//           email: storiesData.email,
//           title: storiesData.title,
//           body: storiesData.body,
//           media: storiesData.media || null,
//         });
//         setEditingId(id);
//         setShowstoriesList(false);
//         toast.info("Story loaded for editing", { position: "top-right" });
//       }
//     } catch (error) {
//       toast.error("Failed to load story for editing", { position: "top-right" });
//       console.error("Edit error:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this story?")) {
//       try {
//         const success = await deletestories(id);
//         if (success) {
//           toast.success("Story deleted successfully", { position: "top-right" });
//           loadstories();
//         } else {
//           toast.error("Failed to delete story", { position: "top-right" });
//         }
//       } catch (error) {
//         toast.error("An error occurred while deleting", { position: "top-right" });
//         console.error("Delete error:", error);
//       }
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       if (searchQuery.trim()) {
//         const results = await searchstories(searchQuery);
//         setstories(results);
//       } else {
//         loadstories();
//       }
//     } catch (error) {
//       toast.error("Search failed", { position: "top-right" });
//       console.error("Search error:", error);
//     }
//   };

//   const resetForm = () => {
//     setstories({
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
//     toast.info("Edit cancelled", { position: "top-right" });
//   };

//   const removeMedia = () => {
//     setstories(prev => ({ ...prev, media: null }));
//   };

//   return (
//     <div className="overflow-hidden min-h-screen">
//       {!showstoriesList ? (
//         <div className="flex items-center min-h-screen justify-center bg-gray-900 text-white px-10">
//           {/* Form Container */}
//           <div className="w-full bg-gray-800 p-8 rounded-lg shadow-lg">
//             <h2 className="text-3xl font-bold text-center text-green-400 mb-6">
//               {editingId ? "Edit Story" : "Add a New Story"}
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
//                     value={stories.name}
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
//                     value={stories.email}
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
//                     value={stories.title}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* Media Upload */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300">
//                     {stories.media ? "Replace Media" : "Upload Image or Video"}
//                   </label>
//                   <input
//                     type="file"
//                     accept="image/*,video/*"
//                     className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none cursor-pointer"
//                     onChange={handleMediaChange}
//                   />
//                   <p className="text-xs text-gray-400 mt-1">Supports images and videos (max 5MB)</p>

//                   {/* Media Preview */}
//                   {stories.media && stories.media.fileType && (
//                     <div className="mb-4">
//                       {stories.media.fileType.match('image.*') ? (
//                         <img
//                           src={stories.media.fileData}
//                           alt="Story media"
//                           className="w-full h-auto rounded-md"
//                         />
//                       ) : stories.media.fileType.match('video.*') ? (
//                         <video
//                           muted
//                           loop
//                           src={stories.media.fileData}
//                           autoPlay
//                           className="w-full h-auto rounded-md"
//                         />
//                       ) : (
//                         <div className="text-gray-400 text-sm">
//                           Unsupported media type: {stories.media.fileType}
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-400 transition"
//                 >
//                   {editingId ? "Update Story" : "Add Story"}
//                 </button>
//               </div>

//               {/* Right Side */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-300">Body (Story Content)</label>
//                 <textarea
//                   name="body"
//                   className="w-full h-[375px] px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none resize-none"
//                   placeholder="Write your story here..."
//                   value={stories.body}
//                   onChange={handleChange}
//                   required
//                 ></textarea>

//                 <button
//                   type="button"
//                   onClick={() => setShowstoriesList(true)}
//                   className="w-full mt-2 py-2 text-white bg-green-500 rounded-md hover:bg-green-400 transition"
//                 >
//                   Show All Stories
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       ) : (
//         /* Stories List View */
//         <div className="bg-gray-900 text-white min-h-screen px-10 py-8">
//           <div className="max-w-6xl mx-auto">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-3xl font-bold text-green-400">All Stories</h2>
//               <button
//                 onClick={() => setShowstoriesList(false)}
//                 className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-400 transition"
//               >
//                 Add New Story
//               </button>
//             </div>

//             {/* Search Bar */}
//             <div className="mb-6 flex gap-2">
//               <input
//                 type="text"
//                 placeholder="Search stories..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
//               />
//               <button
//                 onClick={handleSearch}
//                 className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-400 transition"
//               >
//                 Search
//               </button>
//               <button
//                 onClick={loadstories}
//                 className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-500 transition"
//               >
//                 Reset
//               </button>
//             </div>

//             {/* Stories Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {stories.map((stories) => (
//                 <div key={stories.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
//                   <h3 className="text-xl font-bold text-green-400 mb-2">{stories.title}</h3>
//                   <p className="text-gray-300 mb-2"><strong>Author:</strong> {stories.name}</p>
//                   <p className="text-gray-300 mb-2"><strong>Email:</strong> {stories.email}</p>
//                   <p className="text-gray-400 text-sm mb-4">
//                     {stories.body.length > 100
//                       ? `${stories.body.substring(0, 100)}...`
//                       : stories.body}
//                   </p>

//                   {/* Media Display */}
//                   {stories.media && stories.media.fileType && (
//                     <div className="mb-4">
//                       {stories.media.fileType.match('image.*') ? (
//                         <img
//                           src={stories.media.fileData}
//                           alt="Story media"
//                           className="w-full h-auto rounded-md"
//                         />
//                       ) : stories.media.fileType.match('video.*') ? (
//                         <video
//                           src={stories.media.fileData}
//                           controls
//                           className="w-full h-auto rounded-md"
//                         />
//                       ) : (
//                         <div className="text-gray-400 text-sm">
//                           Unsupported media type: {stories.media.fileType}
//                         </div>
//                       )}
//                     </div>
//                   )}

//                   {/* Alternative: More defensive approach with additional checks */}
//                   {stories.media &&
//                     stories.media.fileData &&
//                     stories.media.fileType && (
//                       <div className="mb-4">
//                         {stories.media.fileType.match(/^image\//i) ? (
//                           <img
//                             src={stories.media.fileData}
//                             alt="Story media"
//                             className="w-full h-auto rounded-md"
//                             onError={(e) => {
//                               console.error('Image failed to load:', e);
//                               e.target.style.display = 'none';
//                             }}
//                           />
//                         ) : stories.media.fileType.match(/^video\//i) ? (
//                           <video
//                             src={stories.media.fileData}
//                             controls
//                             className="w-full h-auto rounded-md"
//                             onError={(e) => {
//                               console.error('Video failed to load:', e);
//                             }}
//                           >
//                             Your browser does not support the video tag.
//                           </video>
//                         ) : (
//                           <div className="text-gray-400 text-sm p-2 bg-gray-700 rounded">
//                             <p>📎 Media file: {stories.media.fileName || 'Unknown file'}</p>
//                             <p>Type: {stories.media.fileType}</p>
//                           </div>
//                         )}
//                       </div>
//                     )}

//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleEdit(stories.id)}
//                       className="flex-1 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-400 transition"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(stories.id)}
//                       className="flex-1 py-2 text-white bg-red-500 rounded-md hover:bg-red-400 transition"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {stories.length === 0 && (
//               <div className="text-center text-gray-400 py-8">
//                 No stories found. {searchQuery && "Try a different search term or"} Add your first story!
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default StoriesForm;

"use client";

import { Helmet } from "react-helmet";
import {
  addstories,
  getAllstories,
  getstoriesById,
  updatestories,
} from "../api/CRUD";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Removed Next.js imports since not using Next.js

const StoriesForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  // Fixed: Separate state for form data (single story) and stories list (array)
  const [storyForm, setStoryForm] = useState({
    name: "",
    email: "",
    title: "",
    body: "",
    badge: "",
    media: null, // Will store { fileData, fileName, fileType }
  });

  const [storiesList, setStoriesList] = useState([]); // Array for all stories
  const [editingId, setEditingId] = useState(null);
  const [showstoriesList, setShowstoriesList] = useState(false);

  // Load stories and check for ID parameter on component mount
  useEffect(() => {
    loadstories();



    if (id) {
      handleEditFromParams(id);
    }
  }, []);

  const loadstories = async () => {
    try {
      const data = await getAllstories();
      setStoriesList(data); // Fixed: Set to storiesList array
    } catch (error) {
      toast.error("Failed to load stories", { position: "top-right" });
      console.error("Load stories error:", error);
    }
  };

  // New function to handle editing from URL parameters
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
        setShowstoriesList(false); // Show form for editing
        // toast.info("Story loaded for editing from URL", { position: "top-right" });
      } else {
        toast.error("Story not found", { position: "top-right" });
      }
    } catch (error) {
      toast.error("Failed to load story from URL", { position: "top-right" });
      console.error("Edit from params error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMediaChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      if (!file.type.match('image.*') && !file.type.match('video.*')) {
        toast.error("Please upload an image or video file", { position: "top-right" });
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size too large (max 5MB)", { position: "top-right" });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setStoryForm((prev) => ({
          ...prev,
          media: {
            fileData: event.target.result,
            fileName: file.name,
            fileType: file.type
          }
        }));
      };
      reader.onerror = (error) => {
        toast.error("Error reading file", { position: "top-right" });
        console.error("Error reading file:", error);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Update existing story using editingId
        const data = await updatestories(editingId, storyForm);
        if (data) {
          toast.success("Story updated successfully", { position: "top-right" });
          setEditingId(null);
          resetForm();
          loadstories();
          // Clear URL parameter after successful update using standard browser API
          const url = new URL(window.location);
          url.searchParams.delete('id');
          window.history.replaceState({}, '', url);
          navigate("/")
        } else {
          toast.error("Failed to update story", { position: "top-right" });
        }
      } else {
        // Add new story
        const data = await addstories(storyForm);
        if (data) {
          toast.success("Story added successfully", { position: "top-right" });
          resetForm();
          loadstories();
        } else {
          toast.error("Failed to add story", { position: "top-right" });
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { position: "top-right" });
      console.error("Submission error:", error);
    }
  };


  const resetForm = () => {
    setStoryForm({
      name: "",
      email: "",
      title: "",
      body: "",
      media: null,
    });
    setEditingId(null);
  };

  const cancelEdit = () => {
    resetForm();
    // Clear URL parameter when canceling edit using standard browser API
    const url = new URL(window.location);
    url.searchParams.delete('id');
    window.history.replaceState({}, '', url);
    toast.info("Edit cancelled", { position: "top-right" });
  };

  const removeMedia = () => {
    setStoryForm(prev => ({ ...prev, media: null }));
  };

  return (
    <>
      <Helmet>
        <title>Submit Stories | New York Lore - Discover the Untold Stories</title>
        <meta name="description" content="A New York Lore platform showcasing New York’s hidden street-art, urban legends, and community stories—through photos, videos, poems, sketches, and interactive features." />
      </Helmet>
      <div className="overflow-hidden min-h-screen">
        <div className="flex items-center min-h-screen justify-center bg-gray-900 text-white px-10">
          {/* Form Container */}
          <div className="w-full bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-green-400 mb-6">
              {editingId ? "Edit Stories" : "Add New Stories"}
            </h2>

            {editingId && (
              <div className="text-center mb-4">
                <button
                  onClick={cancelEdit}
                  className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-400 transition mr-2"
                >
                  Cancel Edit
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Side */}
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
                    placeholder="Enter your name"
                    value={storyForm.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
                    placeholder="Enter your email"
                    value={storyForm.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-300">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
                    placeholder="Enter story title"
                    value={storyForm.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Badge Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-300">Badge</label>
                  <select
                    name="badge"
                    value={storyForm.badge}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
                    required
                  >
                    <option value="" >Select a badge</option>
                    <option value="Article">Article</option>
                    <option value="Poems">Poems</option>
                    <option value="Stories">Stories</option>
                  </select>
                </div>


                {/* Media Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    {storyForm.media ? "Replace Media" : "Upload Image or Video"}
                  </label>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none cursor-pointer"
                    onChange={handleMediaChange}
                  />
                  <p className="text-xs text-gray-400 mt-1">Supports images and videos (max 5MB)</p>

                  {/* Media Preview */}
                  {storyForm.media && storyForm.media.fileType && (
                    <div className="mb-4">
                      {storyForm.media.fileType.match('image.*') ? (
                        <img
                          src={storyForm.media.fileData}
                          alt="Story media"
                          className="w-full h-auto rounded-md"
                        />
                      ) : storyForm.media.fileType.match('video.*') ? (
                        <video
                          muted
                          loop
                          src={storyForm.media.fileData}
                          autoPlay
                          className="w-full h-auto rounded-md"
                        />
                      ) : (
                        <div className="text-gray-400 text-sm">
                          Unsupported media type: {storyForm.media.fileType}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side */}
              <div>
                <label className="block text-sm font-medium text-gray-300">Body (Story Content)</label>
                <textarea
                  name="body"
                  className="w-full h-[375px] px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none resize-none"
                  placeholder="Write your story here..."
                  value={storyForm.body}
                  onChange={handleChange}
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-400 transition"
                >
                  {editingId ? "Update Story" : "Add Story"}
                </button>
                <Link to="/stories">
                  <button
                    type="button"
                    onClick={() => setShowstoriesList(true)}
                    className="w-full mt-2 py-2 text-white bg-green-500 rounded-md hover:bg-green-400 transition"
                  >
                    Show All Stories
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default StoriesForm;