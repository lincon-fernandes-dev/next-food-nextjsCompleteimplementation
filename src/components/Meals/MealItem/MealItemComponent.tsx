import Link from 'next/link';
import Image from 'next/image';

import classes from './mealItem.module.css';
import { IMeal } from '@/domain/interfaces.ts/IMeal';

export default function MealItemComponent({ mealItem }:
  {
    mealItem: IMeal
  }
) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image
            src={`/images/${mealItem.image}`}
            alt={mealItem.title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h2>{mealItem.title}</h2>
          <p>by {mealItem.creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{mealItem.summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${mealItem.slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}