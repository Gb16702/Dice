const FormToggler = ({ activeForm, toggleForm }) => {
    return  <div className="flex flex-row justify-between relative h-[45px]">
                {activeForm === "assistance" ? (
                    <p className="text-vprimary cursor-pointer" onClick={() => toggleForm("feedback")}>
                        Un avis à donner ? Ecrivez-nous
                    </p>
                ) : (
                    <p className="text-vprimary cursor-pointer" onClick={() => toggleForm("assistance")}>
                        Un souci ? Contactez-nous
                    </p>
                )}
            </div>
    };

export default FormToggler;