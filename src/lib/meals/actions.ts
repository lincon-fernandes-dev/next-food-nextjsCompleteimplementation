"use server";
import fs from "fs/promises";
import { redirect } from "next/navigation";
import path from "path";
import { saveMeal } from "./meals";
import { IMeal } from "@/domain/interfaces.ts/IMeal";
import { MealEntity } from "@/domain/Entities/MealEntity";
import { revalidatePath } from "next/cache";

export async function shareMeal(prevState: any, formData: FormData) { // eslint-disable-line
  if(!verifyAmbient()){
    const formResponse = { message: "", error: "notAllowed" };
    return formResponse;
  }

  const title = formData.get("title") as string;
  const summary = formData.get("summary") as string;
  const instructions = formData.get("instructions") as string;
  const creator = formData.get("name") as string;
  const creator_email = formData.get("email") as string;
  const imageFile = formData.get("image") as File;

  const mealData: IMeal = {
    title,
    summary,
    instructions,
    creator,
    creator_email,
    image: "/images/default-meal.jpg",
    slug: "",
  };

  const meal = new MealEntity(mealData);

  if (imageFile && imageFile.size > 0) {
    meal.image = nameImagePath(imageFile, meal.slug);
    await saveImage(imageFile, meal.image);
  } else {
    throw new Error("it's necessary to include a image");
  }

  try {
    await saveMeal(meal);
    revalidatePath('/meals');
    redirect('/meals');
  } catch (error) {
    console.error("Error sharing meal:", error);
    return {
      error:
        error instanceof Error ? error.message : "Erro ao salvar a refeição",
    };
  }
}

async function saveImage(imageFile: File, fileName: string): Promise<string> {
  try {
    if (!imageFile.type.startsWith("image/")) {
      throw new Error("File must be an image");
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const publicPath = path.join(process.cwd(), "public", "images");
    const filePath = path.join(publicPath, fileName);

    await fs.mkdir(publicPath, { recursive: true });

    await fs.writeFile(filePath, buffer);

    return `/images/${fileName}`;
  } catch (error) {
    console.error("Error saving image:", error);
    throw new Error("Failed to save image");
  }
}

function nameImagePath(imageFile: File, slug: string): string {
  const randomString = Math.random().toString(36).substring(2, 8);
  const fileExtension = imageFile.type.split("/")[1] || "jpg";
  return `meal-${slug}-${randomString}.${fileExtension}`;
}

function verifyAmbient(): boolean{
  if(process.env.IS_PUBLIC_ENVIROMENT){
    return false;
  }
  return true;
}