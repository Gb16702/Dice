import Input from "../Input";
import Button from "../Button";
import { useForm } from "react-hook-form";
import generateSecurePassword from "@/src/lib/generateSecurePassword";

const InscriptionForm = () => {

    const {register, handleSubmit, setValue, formState: {errors}} = useForm();

    const onSubmit = async data => {
        console.log(data);
    }

    const handleClick = () => {
        const password = generateSecurePassword(12);
        setValue("password", password);
        setValue("passwordConfirmation", password)

    }

    return  <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <Input className="bg-white border border-[#c2c8d0] text-white w-full h-[50px]  gap-4 flex items-center  text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-2 rounded-sm font-normal" placeholder = "Nom d'utilisateur"
                    {...register("pseudo", { required: true })}
            />
            <Input className="bg-white border border-[#c2c8d0] text-white w-full h-[50px]  gap-4 flex items-center  text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-2 rounded-sm font-normal" placeholder = "Adresse mail"
                    {...register("email", { required: true })}
            />
            <Input className="bg-white border border-[#c2c8d0]  w-full h-[50px]  gap-4 flex items-center  text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-2 rounded-sm font-normal text-black" placeholder = "Mot de passe"
                    {...register("password", { required: true })}
            />

            <h4 onClick = {handleClick} className="cursor-pointer">Générer un mot de passe sécurisé</h4>

            <Input className="bg-white border border-[#c2c8d0]  w-full h-[50px]  gap-4 flex items-center  text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-2 rounded-sm font-normal text-black" placeholder = "Confirmation du mot de passe"
                    {...register("passwordConfirmation", { required: true })}
            />

            <Button className = "bg-vtertiary text-white w-full h-[50px] gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3 mt-2 rounded-sm">
            Se connecter
            </Button>

            </form>
    }

export default InscriptionForm;