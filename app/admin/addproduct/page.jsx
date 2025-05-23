"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "startup",
    author: "Wasif Ansari",
  });

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("image", image);

    try {
      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(null);
        setData({
          title: "",
          description: "",
          category: "Technology",
          author: "Wasif Ansari",
        });
      } else {
        toast.error("Error!");
      }
    } catch (err) {
      toast.error("Failed to submit blog.");
    }
  };

  return (
    <div className="flex-1 ml-80 mr-18 mt-10 mb-10">
      <div className="bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-xl border border-fuchsia-500 overflow-auto h-full">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Add New Product</h2>
        <form onSubmit={onsubmitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Upload Thumbnail */}
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="image" className="text-xl font-semibold text-gray-200 block mb-2">Upload Thumbnail</label>
            <label htmlFor="image" className="cursor-pointer block w-fit">
              <Image
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                width={140}
                height={70}
                alt="Upload Area"
                className="rounded-md border border-gray-600 hover:border-fuchsia-500 transition-colors duration-300"
              />
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
                required
              />
            </label>
          </div>

          {/* Blog Title */}
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="title" className="text-xl font-semibold text-gray-200 block mb-2">Blog Title</label>
            <input
              name="title"
              onChange={onchangeHandler}
              value={data.title}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300"
              type="text"
              placeholder="Enter Title"
            />
          </div>

          {/* Blog Description */}
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="description" className="text-xl font-semibold text-gray-200 block mb-2">Blog Description</label>
            <textarea
              name="description"
              onChange={onchangeHandler}
              value={data.description}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300"
              placeholder="Enter Description"
              rows={6}
            />
          </div>

          {/* Blog Category */}
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="category" className="text-xl font-semibold text-gray-200 block mb-2">Blog Category</label>
            <select
              name="category"
              onChange={onchangeHandler}
              value={data.category}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300"
            >
              <option value="startup">Startup</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
          </div>

          {/* Blog Author */} {/* Full width on small screens, half on medium+ */}
          <div className="col-span-1 md:col-span-1">
            <label htmlFor="author" className="text-xl font-semibold text-gray-200 block mb-2">Blog Author</label>
            <input
              name="author"
              onChange={onchangeHandler}
              value={data.author}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300"
              type="text"
              placeholder="Enter Author Name"
            />
          </div>

          {/* Add Button */}
          <div className="col-span-1 md:col-span-2 text-center mt-4">
            <button
              className="px-10 py-3 bg-fuchsia-500 text-white font-bold rounded-lg shadow-lg hover:bg-fuchsia-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-600 focus:ring-opacity-50 hover:cursor-pointer"
              type="submit"
            >
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
