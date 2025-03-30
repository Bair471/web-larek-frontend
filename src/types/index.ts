// интерфейс api
export interface IDataApi {
  getItems(): Promise<{items: IItem[]}>;
  getItem(id: string): Promise<IItem>;
  sendOrder(data: IOrder): Promise<object>;
}

// тип оплаты
export enum PaymentType {
  Online = 'online',
  Cash = 'cash',
}

// данные товара
export interface IItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null; // есть товар, у которого нет цены
}

// модель заказа
export interface IOrderModel {
  customerFullInfo: IOrder;
  payment: PaymentType;
  address: string;
  email: string;
  phone: string;
  items: string[];
  total: number;
}

// данные заказа
export interface IOrder {
  payment: PaymentType;
  address: string;
  email: string;
  phone: string;
  items: string[];
  total: number;
}

// интерфейс корзины
export interface ICartModel {
  add(item: Partial<IItem>): void;
  remove(item: Partial<IItem>): void;
  clear(): void;
  total: number;
}

// интерфейс eventEmitter
export interface IEventEmitter {
  emit: (event: string, data?: unknown) => void
}

// интерфейс корзины
export interface IBasketView {
  addItem(item: HTMLElement, itemId: string, sum: number): void;
  removeItem(itemId: string): void;
  clear(): void;
}

// интерфейс товара
export interface IItemView {
  getCartItemView(element: HTMLElement): HTMLElement;
  getModalItemView(element: HTMLElement): HTMLElement;
  data: Partial<IItem>;
}

// интерфейс модального окна
export interface IModalView {
  openModal: (element: HTMLElement) => void;
  closeModal: () => void;
}

// интерфейс базового класса вью
export interface IView {
  render(data?: unknown): HTMLElement;
  toggleClass(element: HTMLElement, className: string): void;
}

// данные для передачи в eventEmitter
export interface IEventData {
  element: HTMLElement;
  data?: Partial<IItem>;
}
