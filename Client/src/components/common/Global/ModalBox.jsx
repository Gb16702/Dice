"use client"

const ModalBox  = ({children}) => {
    return (
        <div className="absolute bg-black/[.5] w-full top-1/2 left-1/2 h-[100vh] -translate-x-1/2 -translate-y-1/2">
          <div className="fixed top-1/2 left-1/2 w-[500px] h-[220px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-[20px]">
            {children}
          </div>
        </div>
    )
}

export default ModalBox;