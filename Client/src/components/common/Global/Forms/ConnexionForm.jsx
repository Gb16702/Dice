import Input from "../Input";
import Button from "../Button";
import { useForm } from "react-hook-form";


const ConnexionForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async data => {
        console.log(data);

        try {
            await signIn("credentials", {
                redirect: false,
                email : data.email,
                password : data.password
            })
        }

        catch(e) {
            console.log(e);
        }
    }

    return <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Input className="bg-white border border-[#c2c8d0] text-white w-full h-[50px]  gap-4 flex items-center  text-base disabled:opacity-50 disabled:pointer-events-none outline-none px-3 mt-2 rounded-sm font-normal" placeholder = "Votre adresse mail"
            {...register("email", { required: true })}
        />
        <Input type="password" className="bg-white border border-[#c2c8d0] text-white w-full h-[50px] gap-4 flex items-center disabled:opacity-50 disabled:pointer-events-none px-3 mt-2 outline-none rounded-sm font-normal text-base" placeholder = "Votre mot de passe"
            {...register("password", { required: true, minLenght: 3 })}
        />
        <Button className = "bg-vtertiary text-white w-full h-[50px] gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3 mt-2 rounded-sm">
            Se connecter
        </Button>
    </form>

}

export default ConnexionForm;