import './scss/styles.scss';

import { AppData } from './components/DataApp';
import { Card } from './components/Card';
import { OrderForm } from './components/Order';
import { Page } from './components/Page';
import { WebLarekAPI } from './components/LarekApi';
import { EventEmitter } from './components/base/events';
import { Basket } from './components/Basket';
import { Modal } from './components/common/Modal';
import { Success } from './components/Success';
import './scss/styles.scss';
import { IProduct, TOrder } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ContactsForm } from './components/Contacts';

const api = new WebLarekAPI(CDN_URL, API_URL);

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const modalCardTemplate =
	ensureElement<HTMLTemplateElement>('#modal-container');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const events = new EventEmitter();

// Модель данных приложения
const appData = new AppData(events);

// Глобальные контейнеры
const modal = new Modal(modalCardTemplate, events);
const page = new Page(document.body, events);
const basket = new Basket(events);
const orderForm = new OrderForm(cloneTemplate(orderTemplate), events);
const contactsForm = new ContactsForm(cloneTemplate(contactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), events, {
	onClick: () => modal.close(),
});
