import Input from "../Input";
import Button from "../Button";
import { useForm } from "react-hook-form";
import ConnectButton from "../ConnectButton";
import { signIn } from "next-auth/react";

const ConnexionForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async data => {
        console.log(data);
        const url = "http://localhost:3000/";
        try {
            const response = await signIn("credentials", {
                redirect: true,
                email : data.email,
                password : data.password,
                callbackUrl : url
            })

            if(response?.error) {
                console.log(response);
            }
            else {
                console.log("OK");
            }

        }

        catch(e) {
            console.log(e);
        }
    }

    return <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Input className="bg-white border border-[#c2c8d0] w-full h-[50px]  gap-4 flex items-center  text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-2 rounded-sm font-normal text-zinc-800" placeholder = "Votre adresse mail"
            {...register("email", { required: true })}
        />
        <Input type="password" className="bg-white border border-[#c2c8d0] w-full h-[50px] gap-4 flex items-center disabled:opacity-50 disabled:pointer-events-none px-3 mt-2 outline-none rounded-sm font-normal text-zinc-800 text-base" placeholder = "Votre mot de passe"
            {...register("password", { required: true })}
        />
        <ConnectButton />
    </form>
}

export default ConnexionForm;