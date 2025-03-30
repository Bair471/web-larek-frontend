import { IBasketView, IEventEmitter } from "../types";
import { View } from "./base/View";

export class BasketView extends View implements IBasketView {
  protected items: {
    element: HTMLElement;
    id: string
    }[] = [];
  protected element: HTMLElement;
  protected container: HTMLElement;
  protected submitButton: HTMLButtonElement;
  protected priceContainer: HTMLSpanElement;
  protected events: IEventEmitter;
  protected itemsCount: HTMLSpanElement;
  protected itemIndexes: NodeListOf<HTMLSpanElement>;

  constructor(element: HTMLElement, events: IEventEmitter) {
    super(element, events);

    const cartButton = document.querySelector('.header__basket') as HTMLButtonElement;

    this.itemsCount = document.querySelector('.header__basket-counter') as HTMLSpanElement;
    
    this.container = this.element.querySelector('.basket__list') as HTMLElement;
    this.submitButton = this.element.querySelector('.basket__button') as HTMLButtonElement;
    
    this.priceContainer = this.element.querySelector('.basket__price') as HTMLSpanElement;

    cartButton.addEventListener('click', (event) => {
      this.events.emit('modal:open', {element: this.render()})
    })
    
    this.submitButton.addEventListener('click', (event) => {
      this.events.emit('cart:submit', this.items.map(item => item.id));
    })
    
  }

  addItem(item: HTMLElement, itemId: string, sum: number) {
    if(this.items.some(item => item.id === itemId)) return

    this.items.push({
      element: item,
      id: itemId
    });

    this.priceContainer.textContent = sum + " синапсов";


    this.updateItemsCount();
    this.render();
  }

  removeItem(itemId: string) {
    this.items = this.items.filter((item) => item.id !== itemId);
    this.updateItemsCount();
    this.render();
  }

  clear() {
    this.items = [];
    this.updateItemsCount();
    this.priceContainer.textContent = "0 синапсов";
    this.render();
  }

  protected updateItemsCount() {
    this.itemsCount.textContent = this.items.length + "";
  }

  render(): HTMLElement {
    this.container.replaceChildren(...this.items.map((item) => item.element));

    this.submitButton.disabled = (this.items.length === 0);

    // нумерация товаров в корзине
    this.itemIndexes = this.container.querySelectorAll('.basket__item-index') as NodeListOf<HTMLSpanElement>;
    if(this.itemIndexes) {
      this.itemIndexes.forEach((index, indexInArr) => {
        index.textContent = indexInArr + 1 + "";
      }, 0);  
    }

    return super.render();
  }

}
