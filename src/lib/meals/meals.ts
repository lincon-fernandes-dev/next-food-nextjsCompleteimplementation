import { MealEntity } from '@/domain/Entities/MealEntity';
import { IMeal } from '@/domain/interfaces.ts/IMeal';
import xss from 'xss';

const db = require('better-sqlite3')('meals.db'); // eslint-disable-line

export async function getMeals(): Promise<IMeal[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug: string): IMeal {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal: MealEntity) {
  meal.instructions = xss(meal.instructions);

  try {
    const insert = db.prepare(`
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
      )`);

    const json = meal.toJSON();
    const result = insert.run(json);
    return result;
  } catch(e) {
    console.error('Error saving meal:', e);
    throw e;
  }
}