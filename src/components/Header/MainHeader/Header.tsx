import Link from 'next/link';
import Image from 'next/image';
import classes from './mainHeader.module.css';
import logoImg from '@/assets/logo.png';
import MainHeaderBackground from '../HeaderBackground/HeaderBackground';
import HeaderNavLinkComponent from '../HeaderNavLink/HeaderNavLink';

export default function MainHeaderComponent() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImg} alt="A plate with food on it" priority />
          <span className={classes.brand}>NextLevel Food</span>
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <HeaderNavLinkComponent href="/meals">Browse Meals</HeaderNavLinkComponent>
            </li>
            <li>
              <HeaderNavLinkComponent href="/community">Foodies Community</HeaderNavLinkComponent>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}