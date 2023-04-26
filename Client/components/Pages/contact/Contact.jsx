"use client";

import { useState } from 'react';
import FormToggler from '@/components/common/Partials/Contact/FormToggler';
import Select from '@/components/common/Global/Select';

const Contact = () => {
  const [activeForm, setActiveForm] = useState('assistance');

  const toggleForm = (formType) => setActiveForm(formType);

  const categories = [
    { value: '1', label: 'Catégorie 1' },
    { value: '2', label: 'Catégorie 2' },
    { value: '3', label: 'Catégorie 3' },
  ]

  return (
    <section className="h-[100vh] flex items-center justify-center flex-col">
    <div className="w-[1000px] flex items-center flex-col gap-8">
        <div className="w-[50%] bg-zinc-800/90 h-[500px] py-4 rounded">
      {activeForm === "assistance" ? (
        <>
        <h1 className='text-center text-zinc-200 text-xl pb-[30px]'>Un souci ?</h1>
          <form className="flex justify-center items-center flex-col">
            <div className='w-full flex items-center justify-center'>
                <input className="border border-zinc-700/90 rounded w-[75%] px-4 py-2  outline-none" type="text" name="username" placeholder="Votre nom d'utilisateur" />
            </div>
            <div className='w-full flex items-center justify-center'>
                <input className="border border-zinc-700/90 rounded w-[75%] px-4 py-2  outline-none" type="text" name="username" placeholder="Votre adresse mail" />
            </div>
            <div className=' w-full flex items-center justify-center'>
                <Select options = {categories} placeholder = "Choisissez un type de problème" className="border border-zinc-700/90 rounded w-[75%] px-4 py-2 outline-none bg-red-400"/>
            </div>
            <div className='w-full flex items-center justify-center'>
                <textarea className="border border-zinc-700/90 rounded w-[75%] px-4 py-2 outline-none" type="text" name="username" placeholder="Votre message" />
            </div>
            <div className='w-full flex items-center justify-center'>
                <button className='rounded w-[75%] bg-red-400 h-10'>
                    Envoyer
                </button>
            </div>
          </form>
        </>
      ) : (
          <div className='h-[10vh] bg-blue-400'>
          <h2>Formulaire de retours</h2>
          {/* Ajoutez le contenu du formulaire de retours ici */}
        </div>
      )}
        <FormToggler activeForm={activeForm} toggleForm={toggleForm} />
        </div>
    </div>
    </section>
  );
};

export default Contact;
