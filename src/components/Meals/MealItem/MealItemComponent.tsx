import Link from 'next/link';
import Image from 'next/image';

import classes from './mealItem.module.css';
import { Iimage } from '@/domain/IMeal';

import BurguerImage from '@/public/images/burger.jpg';

export default function MealItemComponent({ title, slug, image, summary, creator }:
  {
    title: string;
    slug: string;
    image: Iimage;
    summary: string;
    creator: string;
  }
) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image
            src={BurguerImage.src}
            alt={title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}