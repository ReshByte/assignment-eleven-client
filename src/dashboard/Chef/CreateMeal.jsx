import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import useTitle from "../../hooks/useTitle";

const CreateMeal = () => {
  useTitle("Create Meal");
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [chefId, setChefId] = useState("");
  const { register, handleSubmit, reset, setValue } = useForm();

  // Generate chefId automatically on mount
  useEffect(() => {
    if (user) {
      // Example: CHEF-123456
      const generatedChefId = "CHEF-" + Math.floor(100000 + Math.random() * 900000);
      setChefId(generatedChefId);
      setValue("chefId", generatedChefId); // react-hook-form এ set
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const imageFile = data.foodImage[0];

      const formData = new FormData();
      formData.append("image", imageFile);

      const uploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
      const imgBBRes = await axios.post(uploadUrl, formData);
      const imageURL = imgBBRes.data.data.url;

      const newMeal = {
        foodName: data.foodName,
        chefName: data.chefName,
        foodImage: imageURL,
        price: parseFloat(data.price),
        rating: 0,
        ingredients: data.ingredients.split(","),
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        chefExperience: data.chefExperience,
        chefId: data.chefId, // auto generated
        userEmail: user.email,
        createdAt: new Date(),
      };

      const res = await axios.post("http://localhost:3000/meals", newMeal);

      if (res.data.insertedId) {
        Swal.fire("Success!", "Meal created successfully!", "success");
        reset();
        // reset chefId after creation
        const newGeneratedChefId = "CHEF-" + Math.floor(100000 + Math.random() * 900000);
        setChefId(newGeneratedChefId);
        setValue("chefId", newGeneratedChefId);
      }
    } catch (error) {
      console.log("UPLOAD ERROR:", error);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Create Meal</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("foodName", { required: true })} placeholder="Food Name" className="input input-bordered w-full" />
        <input {...register("chefName", { required: true })} placeholder="Chef Name" className="input input-bordered w-full" />
        <input {...register("foodImage", { required: true })} type="file" className="file-input file-input-bordered w-full" />
        <input {...register("price", { required: true })} placeholder="Price" type="number" step="0.01" className="input input-bordered w-full" />
        <textarea {...register("ingredients", { required: true })} placeholder="Ingredients (comma separated)" className="textarea textarea-bordered w-full" />
        <input {...register("estimatedDeliveryTime", { required: true })} placeholder="Estimated Delivery Time" className="input input-bordered w-full" />
        <input {...register("chefExperience", { required: true })} placeholder="Chef Experience" className="input input-bordered w-full" />
        <input {...register("chefId", { required: true })} value={chefId} readOnly className="input input-bordered w-full bg-gray-100" />
        <input value={user?.email} readOnly className="input input-bordered w-full bg-gray-100" />

        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Creating..." : "Create Meal"}
        </button>
      </form>
    </div>
  );
};

export default CreateMeal;
