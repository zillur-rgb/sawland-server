export interface IOrder {
  name: string;
  email: string;
  quantity: string;
  city?: string;
  postcode?: string;
  country?: string;
  total: number;
  toolName: string;
  paid?: boolean;
  transactionId?: string;
}
