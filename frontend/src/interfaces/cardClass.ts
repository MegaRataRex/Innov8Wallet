export interface Card {
  id: number;
  userId: number;
  token: string;
  last_four: string;
  type: string;
  exp_date: Date;
  cardType: string;
  brand: string;
}
