export interface IQuestion {
  id: string;
  priority: number;
  description: string;
  answer?: 'Yes' | 'No';
}
