
import Link from 'next/link';

import classes from './page.module.css';
import ImageSlideshowComponent from '@/components/ImageSlideshow/imageSlideshow';

export default function Home() {
  return (
    <>
      <header className='flex flex-col md:flex-row justify-center items-center md:gap-12 my-12 mx-auto w-[90%] max-w-6xl'>
        <div className='w-[90%] h-96 md:w-[40rem]'>
          <ImageSlideshowComponent />
        </div>
        <div>
          <div className={classes.hero}>
            <h1>NextLevel Food for NextLevel Foodies</h1>
            <p>Taste & share food from all over the world.</p>
          </div>
          <div className={classes.cta}>
            <Link href="/community">Join the Community</Link>
            <Link href="/meals">Explore Meals</Link>
          </div>
        </div>
      </header>
      <main>
        <section className={classes.section}>
          <h2 className='text-amber-50 mb-4'>How it works</h2>
          <p className='text-lg md:text-xl'>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p className='text-lg md:text-xl'>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>

        <section className={classes.section}>
          <h2 className='text-amber-50 mb-4'>Why NextLevel Food?</h2>
          <p className='text-lg md:text-xl'>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p className='text-lg md:text-xl'>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>
      </main>
    </>
  );
}
