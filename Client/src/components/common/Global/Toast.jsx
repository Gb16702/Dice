import { toast } from "react-hot-toast"
import { Cross } from "./Icons/HeroIcons/Cross"
import { Check } from "./Icons/HeroIcons/Check"
import { Informations } from "./Icons/HeroIcons/Informations"

const Toast = ({message, type, visible, variant}, t) => {
    return <div
    className={`${
      t.visible ? 'animate-enter' : 'animate-leave'
    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  >
    <div className="flex-1 w-0 p-4 h-full">
      <div className="flex items-start h-full">
        <div className="flex-shrink-0 flex items-center justify-center min-h-full">
          {variant == "error" ? <Cross /> : variant == "success" ? <Check /> : variant == "info" && <Informations /> }
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-zinc-900 font-semibold">
            {type}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {message}
          </p>
        </div>
      </div>
    </div>
    <div className="flex border-l border-gray-200">
      <button
        onClick={() => toast.dismiss(t.id)}
        className={variant == "error" ? "w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-400" : variant == "success" ? "w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-teal-500" : variant == "info" && "w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-slate-500"}
      >
        Fermer
      </button>
    </div>
  </div>
}

export default Toast