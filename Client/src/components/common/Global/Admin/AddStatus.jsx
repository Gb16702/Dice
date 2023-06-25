"use client"

import { useState } from "react"
import Add from "../Icons/HeroIcons/admin/Add"
import Button from "../Button"
import { toast } from "react-hot-toast"
import Toast from "../Toast"
import { useRouter } from "next/navigation"
import { SketchPicker } from "react-color"
import Paint from "../Icons/HeroIcons/admin/Paint";
import Cross from "../Icons/HeroIcons/admin/Cross"
import { config } from "@/security/config"
import EnhancedSelect from "../EnhancedSelect";

const fetcher = async ( value, description, content, selectedOptions, { pathname, blockPickerColor, data, session }) => {
    let bodyValue;

    if (pathname === "status") {
      bodyValue = { state: value };
    } else if (pathname === "tags") {
      bodyValue = {
        tag: value,
        color: blockPickerColor,
      };
    } else if (pathname === "categories") {
      bodyValue = {
        category: value,
        description: description,
        data: data,
      };
    }
    else if (pathname === "articles") {
      bodyValue = {
        title : value,
        description : description,
        content : content,
        picture : data,
        author : session?.id,
        tags : selectedOptions
      }
    }

    try {
      const response = await fetch(`http://localhost:8000/api/${pathname}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...bodyValue,
        }),
      });

      console.log("Envoyé", response, bodyValue);
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const AddStatus = ({ pathname, session, tags }) => {
    const [isModalOpen, setIsModalOpen] = useState(false),
      [loading, setLoading] = useState(false),
      [value, setValue] = useState(""),
      [blockPickerColor, setBlockPickerColor] = useState(""),
      [isBlockPickerOpen, setIsBlockPickerOpen] = useState(false),
      [selectedFile, setSelectedFile] = useState(null),
      [showSelectedFile, setShowSelectedFile] = useState(true),
      [description, setDescription] = useState(""),
      [content, setContent] = useState(""),
      [selectedOptions, setSelectedOptions] = useState([])

    const getPathname = () => {
      if (pathname === "tags") {
        return "tag";
      } else if (pathname === "status") {
        return "statut";
      } else if (pathname === "categories") {
        return "catégorie";
      }
      else if (pathname === "articles") {
        return "article";
      }
    };

    const router = useRouter();

    const handleClick = () => {
      setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const target = e.currentTarget;
        const fileInput = Array.from(target.elements).find((e) => e.id === "fileInput");

        const reader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);
        reader.onloadend = async () => {
          const base64EncodedImage = reader.result;

          await fetcher(value, description, content, selectedOptions, { pathname, blockPickerColor, data: base64EncodedImage, session });

          setLoading(false);
          setIsModalOpen(false);
          router.refresh();
        };

        reader.onerror = () => {
          console.log("Erreur");
        };
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    };

    const handleChange = (e) => {
      setSelectedFile(e.target.files[0].name);
      setShowSelectedFile(true);
    };

    const handleSelectChange = (newSelectedOptions) => {
      setSelectedOptions(newSelectedOptions);
    };

    const handleSelectDelete = (deletedOptions) => {
      setSelectedOptions(deletedOptions)
    };


    return (
      <>
        {isModalOpen && (
          <>
            <div className="fixed z-10 w-full top-0 left-0 h-full bg-black/[.5]"></div>
            <div
              className={`fixed z-20 top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 bg-adminBgAlt rounded-xl p-[20px] border border-zinc-800 ${
                pathname === "articles" ? "w-[700px]" : "w-[500px]"
              }`}
            >
              <div className="justify-between items-center flex">
                <h3 className="text-zinc-100 font-medium text-[20px] tracking-tight">
                  {pathname === "articles"
                    ? "Ajout d'article"
                    : "Ajout de " + getPathname()}
                </h3>
                <Cross
                  className="w-5 h-5 cursor-pointer stroke-zinc-100"
                  onClick={() => setIsModalOpen(false)}
                />
              </div>
              <form
                className="mt-7 flex flex-col gap-y"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  placeholder={
                    getPathname() === "catégorie"
                      ? `Ajouter la ${getPathname()}`
                      : pathname === "articles"
                      ? "Titre de l'article"
                      : `Ajouter le ${getPathname()}`
                  }
                  className="w-full h-[46px] rounded-md px-3 outline-none bg-zinc-900 border border-zinc-900 text-zinc-200 focus:border-vprimary transition duration-200 text-sm font-light placeholder-zinc-400"
                  onChange={(e) => setValue(e.target.value)}
                />
                {pathname === "tags" && (
                  <>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Couleur du tag"
                        value={blockPickerColor}
                        className="w-full h-[46px] rounded-md px-3 outline-none mt-2 bg-zinc-900 border border-zinc-900 text-zinc-200 focus:border-vprimary transition duration-200 text-sm font-light placeholder-zinc-400"
                        onChange={(e) => setValue(e.target.value)}
                      />
                      {isBlockPickerOpen ? (
                        <div onClick={() => setIsBlockPickerOpen(false)}>
                          <Cross className="w-5 h-5 stroke-vprimary absolute top-[57%] -translate-y-1/2 right-2 cursor-pointer" />
                        </div>
                      ) : (
                        <div onClick={() => setIsBlockPickerOpen(true)}>
                          <Paint className="w-5 h-5 stroke-vprimary absolute top-[57%] -translate-y-1/2 right-2 cursor-pointer" />
                        </div>
                      )}
                      {isBlockPickerOpen && (
                        <div className="absolute">
                          <SketchPicker
                            color={blockPickerColor}
                            onChangeComplete={(color) =>
                              setBlockPickerColor(color.hex)
                            }
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}
                {pathname === "categories" && (
                  <>
                    <div className="relative">
                      <textarea
                        type="text"
                        placeholder="Description de la catégorie"
                        className="w-full rounded-md px-3 py-2  max-h-[250px] min-h-[100px] outline-none mt-2 bg-zinc-900 border border-zinc-900 text-zinc-200 focus:border-vprimary transition duration-200 text-sm font-light placeholder-zinc-400"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="relative w-full bg-zinc-900 rounded-md h-[46px] flex overflow-hidden">
                      <input
                        type="file"
                        name="file"
                        className="hidden"
                        id="fileInput"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="fileInput"
                        className="bg-zinc-900 border-r border-vprimary flex items-center justify-center h-[46px] w-[130px] cursor-pointer text-sm text-zinc-400 font-light"
                      >
                        Sélec. fichier
                      </label>
                      <span
                        className="ml-2 text-zinc-400 text-sm font-light flex items-center justify-center"
                        id="selectedFile"
                      >
                        {selectedFile}
                      </span>
                    </div>
                  </>
                )}
                {pathname === "articles" && (
                  <>
                    <textarea
                      type="text"
                      placeholder="Description de l'article"
                      className="w-full rounded-md px-3 py-2  max-h-[200px] min-h-[70px] outline-none mt-2 bg-zinc-900 border border-zinc-900 text-zinc-200 focus:border-vprimary transition duration-200 text-sm font-light placeholder-zinc-400"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <textarea
                      type="text"
                      placeholder="Contenu de l'article"
                      className="w-full rounded-md px-3 py-2  max-h-[400px] min-h-[100px] outline-none mt-2 bg-zinc-900 border border-zinc-900 text-zinc-200 focus:border-vprimary transition duration-200 text-sm font-light placeholder-zinc-400"
                      onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="relative w-full bg-zinc-900 rounded-md h-[46px] flex overflow-hidden mt-2">
                      <input
                        type="file"
                        name="file"
                        className="hidden"
                        id="fileInput"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="fileInput"
                        className="bg-zinc-900 border-r border-vprimary flex items-center justify-center h-[46px] w-[130px] cursor-pointer text-sm text-zinc-400 font-light"
                      >
                        Sélec. fichier
                      </label>
                      <span
                        className="ml-2 text-zinc-400 text-sm font-light flex items-center justify-center"
                        id="selectedFile"
                      >
                        {selectedFile ? selectedFile : "Image de l'article" }
                      </span>
                    </div>
                    <EnhancedSelect options={tags} onChange={handleSelectChange} onDelete={handleSelectDelete} />
                  </>
                )}
                <Button
                  className={`w-full h-[46px] gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3 mt-2 rounded-[5px] transition-all dureation-300 bg-vprimary text-zinc-200`}
                >
                  {pathname === "articles"
                    ? "Ajouter l'article"
                    : getPathname() === "catégorie"
                    ? "Ajouter la catégorie"
                    : "Ajouter le " + getPathname()}
                </Button>
              </form>
            </div>
          </>
        )}

        <button onClick={handleClick}>
          <Add className="w-9 h-9 p-[6px] stroke-zinc-300 rounded-md bg-zinc-800" />
        </button>
      </>
    );


}
export default AddStatus