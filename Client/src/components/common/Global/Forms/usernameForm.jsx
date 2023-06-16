import { useSession } from "next-auth/react";
import Input from "../Input";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Submit } from "../Icons/HeroIcons/Submit";
import Lottie from "lottie-web";
import { Spinner } from "../Icons/Loaders/Spinner";
import Toast from "../Toast";
import { toast } from "react-hot-toast";

const UsernameForm = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const animationContainer = useRef(null);
  const [formState, setFormState] = useState("initial");
  const [isVisible, setIsVisible] = useState(true);
  const [value, setValue] = useState(session?.user?.username);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (formState === "success") {
      const animation = Lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: require("../Icons/anim/check.json"),
      });
      animation.addEventListener("complete", () => {
        setIsVisible(false);
      });
    }
  }, [formState]);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value !== session?.user?.username) setIsDirty(true);
    else setIsDirty(false);
    if (formState === "success") {
      setIsVisible(true);
      setFormState("initial");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState("submitting");
    const response = await fetch(
      `http://localhost:8000/api/users/${session?.user?.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: value }),
      }
    );

    if (!response.ok) {
      return setFormState("error");
    }
    await response.json();
    console.log(response);

    if (response.ok) {
      setFormState("success");
      if (session) {
        await update({
          ...session,
          user: {
            ...session.user,
            username: value,
          },
        });
        toast.custom(<Toast message={`Votre nom d'utilisateur a été modifié pour ${value}`} variant = "success" type="Succès" />)
        router.refresh();
      }
    } else {
      console.log(response);
      setFormState("error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username" className="text-zinc-500">
        Nom d'utilisateur
      </label>
      <div className="relative w-full border rounded-md h-[46px] flex overflow-hidden">
        <Input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-300 placeholder-zinc-400/[.8] transition duration-200"
          defaultValue={session?.user?.username}
          onChange={handleChange}
        />
        {isDirty && (
          <button
            className="absolute top-1/2 -translate-y-1/2 right-[25px] rounded-full p-1"
            disabled={formState === "submitting"}
          >
            {formState === "submitting" ? (
              <Spinner size={20} color="#B5B5B5" />
            ) : formState === "success" ? (
              <div
                className="w-12 h-12 relative left-[10px]"
                ref={animationContainer}
              ></div>
            ) : (
              isVisible && (
                <Submit className="w-6 h-6 stroke-zinc-500" />
              )
            )}
          </button>
        )}
      </div>
    </form>
  );
};

export default UsernameForm;