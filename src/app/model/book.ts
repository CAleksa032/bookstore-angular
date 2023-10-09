import { Author } from "./author";
import { Genre } from "./genre";

export class Book {
  bookId: number;
  bookTitle: string;
  bookDescription: string;
  publicationYear: string;
  authors: Array<Author>;
  genres: Array<Genre>;
  userId: number;
}
