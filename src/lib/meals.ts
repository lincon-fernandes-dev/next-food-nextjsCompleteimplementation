import { IMeal } from '@/domain/IMeal';
import slugify from 'slugify';
import xss from 'xss';

const db = require('better-sqlite3')('meals.db');

export async function getMeals(): Promise<IMeal[]> {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug: string) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal: IMeal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}