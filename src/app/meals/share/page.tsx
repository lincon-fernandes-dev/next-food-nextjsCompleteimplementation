'use client';

import { shareMeal } from '@/lib/meals/actions';
import classes from './page.module.css';
import ImagePicker from '@/components/Meals/ImagePicker/imagePicker';
import MealsFormSubmit from '@/components/Meals/MealsFormSubmit/MealsFormSubmit';
import { useActionState } from 'react';

export default function ShareMealPage() {
  type State = { message: string; error?: string };

  const [state, formAction] = useActionState<State, FormData>(
    async (prevState, formData) => {
      const result = await shareMeal(prevState, formData);
      if (
        typeof result === 'object' &&
        result !== null &&
        typeof (result as any).message === 'string' // eslint-disable-line
      ) {
        return result as State;
      }
      return { message: '', error: 'Unknown error' };
    },
    { message: '' }
  );

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input minLength={4} maxLength={30} type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input minLength={4} maxLength={30} type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input minLength={10} maxLength={160} type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows={10}
              required
              minLength={20}
            ></textarea>
          </p>
          <ImagePicker label="Your image" name="image" />
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}