export interface Book {
  ISBN: string;
  title: string;
}

export interface Author {
  name: string;
  books: Book[];
  lastUpdated?: Date;
}
