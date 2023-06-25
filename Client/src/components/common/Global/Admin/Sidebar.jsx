"use client"

import AdminTag from "./AdminTag";
import Home from "../Icons/HeroIcons/admin/Home";
import User from "../Icons/HeroIcons/admin/User";
import Role from "../Icons/HeroIcons/admin/Role";
import Status from "../Icons/HeroIcons/admin/Status";
import Back from "../Icons/HeroIcons/admin/Back";
import Tag from "../Icons/HeroIcons/admin/Tag";
import Category from "../Icons/HeroIcons/admin/Category";
import Article from "../Icons/HeroIcons/admin/Article";

const Sidebar = ({ children }) => {
    const defaultIconClassName = "w-6 h-6 stroke-white"

    return (
    <>
      <aside
        className={`w-[260px] h-[100vh] bg-adminBgAlt transition-all duration-100 relative border-r border-zinc-800`}
      >
        <AdminTag linkTo="/administration/dashboard" text="Dashboard">
          <Home className={`${defaultIconClassName}`} />
        </AdminTag>
        <AdminTag linkTo="/administration/utilisateurs" text="Utilisateurs">
          <User className={`${defaultIconClassName}`} />
        </AdminTag>
        <AdminTag linkTo="/administration/roles" text="Rôles">
          <Role className={`${defaultIconClassName}`} />
        </AdminTag>
        <AdminTag linkTo="/administration/status" text="Status">
          <Status className={`${defaultIconClassName}`} />
        </AdminTag>
        <AdminTag linkTo="/administration/articles" text="Articles">
          <Article className={`${defaultIconClassName}`} />
        </AdminTag>
        <AdminTag linkTo="/administration/categories" text="Catégories">
          <Category className={`${defaultIconClassName}`} />
        </AdminTag>
        <AdminTag linkTo="/administration/tags" text="Tags">
          <Tag className={`${defaultIconClassName}`} />
        </AdminTag>
        <AdminTag linkTo="/" text="Retour au site">
          <Back className={`${defaultIconClassName}`} />
        </AdminTag>
      </aside>
      </>
    );
  };

  export default Sidebar;
