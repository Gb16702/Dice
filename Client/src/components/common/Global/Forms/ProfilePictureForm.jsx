"use client";

import Input from "../Input";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { config } from "@/security/config";
import { useRouter } from "next/navigation";
import { Submit } from "../Icons/HeroIcons/Submit";
import { Spinner } from "../Icons/Loaders/Spinner";
import Lottie, { LottiePlayer } from "lottie-web";
import Toast from "../Toast";
import { toast } from "react-hot-toast";

const ProfilePictureForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formState, setFormState] = useState("initial");
  const { data: session, update } = useSession();
  const { cloud_name } = config;
  const router = useRouter();
  const [showSelectedFile, setShowSelectedFile] = useState(true);


  const animationContainer = useRef(null);

  useEffect(() => {
    const animation = Lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: require("../Icons/anim/check.json")
    });
  })

  const handleChange = (e) => {
    setSelectedFile(e.target.files[0].name);
    setShowSelectedFile(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState("submitting");
    const target = e.currentTarget;
    const fileInput = Array.from(target.elements).find(
      (e) => e.id === "fileInput"
    );

    const formData = new FormData();

    try {
      for (const file of fileInput.files) {
        formData.append("file", file);
      }
      formData.append("upload_preset", "dice-website");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!response.ok) {
        throw new Error("Something went wrong" + response.statusText);
      } else {
        const responseData = await response.json();

        const data = await fetch(
          `http://localhost:8000/api/users/${session?.user?.id}/image`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              profilePicture: responseData.secure_url,
              format: responseData.format,
              size: responseData.bytes,
              imageId: responseData.public_id,
            }),
          }
        );
        if (!data.ok) {
          setFormState("error");
          return;
        } else {
          setFormState("success");
          await update({
            ...session,
            user: {
              ...session.user,
              avatar: responseData.secure_url,
            },
          });
          toast.custom(<Toast message={`Votre avatar a correctement été modifié`} variant = "success" type="Succès" />)
          router.refresh();
          setTimeout(() => {
            setFormState("initial");
            setShowSelectedFile(false);
          }, 2000)
        }
      }
    } catch (e) {
      console.log(e);
      setFormState("error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="image" className="mt-4 block text-zinc-900">
        Image de profil
      </label>
      <div className="relative w-full border rounded-md h-[46px] flex overflow-hidden">
        <input
          type="file"
          className="hidden"
          id="fileInput"
          onChange={handleChange}
        />
        <label
          htmlFor="fileInput"
          className="bg-zinc-200 flex items-center justify-center h-[46px] w-[130px] cursor-pointer text-zinc-900"
        >
          Sélec. fichier
        </label>
        <span
          className="ml-2 flex items-center justify-center"
          id="selectedFile"
        >
          {showSelectedFile && selectedFile && (
            <>
              {selectedFile}
              <button
                className="absolute right-[15px] rounded-full flex items-center"
                disabled={formState === "submitting"}
              >
                {formState === "submitting" ? (
                  <Spinner size={20} color="#B5B5B5" />
                )
               : (
                 formState === "success" ? (
                  <div className="w-12 h-12 relative left-[10px]" ref={animationContainer}></div>
                ) : (
                  <Submit className="w-6 h-6 stroke-zinc-500" />
                )
               )
              }
              </button>
            </>
          )}
        </span>
      </div>
    </form>
  );
};

export default ProfilePictureForm;