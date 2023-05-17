import NavItem from "../../Header/Navigation/NavItem/NavItem"

const FooterNavigation = () => {
    return  <nav className='h-[72%] w-full flex justify-between items-center'>
                <NavItem link="/" text="Accueil" />
                <NavItem link="/jeux" text="Jeux" />
                <NavItem link="/actus" text="Actualités" />
                <NavItem link="/contact" text="Contact" />
                <NavItem link="/auth" text="Connexion" />
                <NavItem link="/auth" text="Inscription" />
            </nav>
}

export default FooterNavigation