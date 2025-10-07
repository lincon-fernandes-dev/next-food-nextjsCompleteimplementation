import slugify from "slugify";
import { IMeal } from "../interfaces.ts/IMeal";

export class MealEntity implements IMeal {
  private _slug: string;
  private _title: string;
  private _image: string;
  private _summary: string;
  private _instructions: string;
  private _creator: string;
  private _creator_email: string;

  constructor(meal: IMeal) {
    this._slug = slugify(meal.title, { lower: true });
    this._title = meal.title;
    this._image = meal.image;
    this._summary = meal.summary;
    this._instructions = meal.instructions;
    this._creator = meal.creator;
    this._creator_email = meal.creator_email;
    
    this.validate();
  }

  // Factory method para criação com validação
  static create(meal: IMeal): MealEntity {
    return new MealEntity(meal);
  }

  // Factory method para reconstituir de persistência
  static reconstitute(meal: IMeal): MealEntity {
    return new MealEntity(meal);
  }

  get slug(): string { return this._slug; }
  get title(): string { return this._title; }
  get image(): string { return this._image; }
  get summary(): string { return this._summary; }
  get instructions(): string { return this._instructions; }
  get creator(): string { return this._creator; }
  get creator_email(): string { return this._creator_email; }

  // Setters com validação
  set slug(slug: string) {
    this.validateSlug(slug);
    this._slug = slug;
  }

  set title(title: string) {
    this.validateTitle(title);
    this._title = title;
  }

  set image(image: string) {
    this.validateImage(image);
    this._image = image;
  }

  set summary(summary: string) {
    this.validateSummary(summary);
    this._summary = summary;
  }

  set instructions(instructions: string) {
    this.validateInstructions(instructions);
    this._instructions = instructions;
  }

  set creator(creator: string) {
    this.validateCreator(creator);
    this._creator = creator;
  }

  set creator_email(creator_email: string) {
    this.validateEmail(creator_email);
    this._creator_email = creator_email;
  }

  // Validação principal
  private validate(): void {
    this.validateSlug(this._slug);
    this.validateTitle(this._title);
    this.validateImage(this._image);
    this.validateSummary(this._summary);
    this.validateInstructions(this._instructions);
    this.validateCreator(this._creator);
    this.validateEmail(this._creator_email);
  }

  // Validações específicas
  private validateSlug(slug: string): void {
    if (!slug || slug.length < 4 || slug.length > 30) {
      throw new Error("Slug must be between 4 and 30 characters");
    }
    if (!/^[a-z0-9-]+$/.test(slug)) {
      throw new Error("Slug can only contain lowercase letters, numbers and hyphens");
    }
  }

  private validateTitle(title: string): void {
    if (!title || title.length < 4 || title.length > 30) {
      throw new Error("Title must be between 4 and 30 characters");
    }
  }

  private validateImage(image: string): void {
    if (!image || image.length < 4) {
      throw new Error("Image URL must be at least 4 characters long");
    }
    
    // Validação básica de URL
    
  }

  private validateSummary(summary: string): void {
    if (!summary || summary.length < 10 || summary.length > 160) {
      throw new Error("Summary must be between 10 and 160 characters");
    }
  }

  private validateInstructions(instructions: string): void {
    if (!instructions || instructions.length < 20) {
      throw new Error("Instructions must be at least 20 characters long");
    }
  }

  private validateCreator(creator: string): void {
    if (!creator || creator.length < 2 || creator.length > 50) {
      throw new Error("Creator name must be between 2 and 50 characters");
    }
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!email || !emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }
  }

  // Comportamentos de domínio
  updateTitle(newTitle: string): void {
    this.title = newTitle;
    this.slug = this.generateSlug(newTitle);
  }

  updateImage(newImage: string): void {
    this.image = newImage;
  }

  updateSummary(newSummary: string): void {
    this.summary = newSummary;
  }

  updateInstructions(newInstructions: string): void {
    this.instructions = newInstructions;
  }

  // Método auxiliar para gerar slug
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 30);
  }

  // Método para serialização
  toJSON(): IMeal {
    return {
      slug: this._slug,
      title: this._title,
      image: this._image,
      summary: this._summary,
      instructions: this._instructions,
      creator: this._creator,
      creator_email: this._creator_email
    };
  }

  // // Método para verificar igualdade
  // equals(other: MealEntity): boolean {
  //   return this._id === other._id;
  // }
}