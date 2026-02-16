export interface BookData {
  title: string;
  author: string;
  genre: string;
  quantity: number;
  isbn: string;
  [key: string]: any;
}

export interface UserData {
  name: string;
  email: string;
  contact: string;
  role: string; // Assuming 'role' is part of the user data
  [key: string]: any;
}

export interface IssueBookData {
  id: string;
  user: UserData;
  book: BookData;
  issueDate: string;
  dueDate: string;
  status?: string; // Optional for the initial issue
}

export interface ReturnBookData {
  id: string;
  issue: IssueBookData;
  returnDate: string;
  fineAmount: number;
  remarks: string;
}


export interface PieChartProps {
  isAnimationActive?: boolean;
  data: any[];
  colors?: string[];
}
