import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getMeal } from '@/lib/meals/meals';
import classes from './page.module.css';
import { Metadata } from 'next';
type Props = {
  params: { mealSlug: string };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {mealSlug} = await params;
  const meal = getMeal(mealSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default async function MealDetailsPage({ params }: { params: { mealSlug: string } }) {
  const {mealSlug} = await params;
  const meal = getMeal(mealSlug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

  return (
    <>
      <section className={`${classes.header} 'flex flex-col md:flex md:flex-row mx-auto gap-12 px-8 py-4 justify-center items-center max-w-7xl`}>
        <div className="relative w-10/12 max-w-xl h-80">
          <Image
            src={`/images/${meal.image}`}
            alt={meal.title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </section>
      <main className='m-12'>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}