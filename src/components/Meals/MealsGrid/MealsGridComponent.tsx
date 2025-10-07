
import { IMeal } from '@/domain/interfaces.ts/IMeal';
import MealItem from '../MealItem/MealItemComponent';
import classes from './mealsGrid.module.css';

export default function MealsGridComponent({ meals }: { meals: IMeal[] }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal: IMeal) => (
        <li key={meal.slug}>
          <MealItem mealItem={meal} />
        </li>
      ))}
    </ul>
  );
}