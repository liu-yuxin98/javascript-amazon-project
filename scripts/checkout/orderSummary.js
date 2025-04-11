import {cart,removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';   
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';  
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';


export function renderOrderSummary(){

  let cartSummaryHTML = '';
  // Extend dayjs with plugins

  const today = dayjs();
  // const deliveryDate = today.add(3, 'day').format('dddd, MMMM D');
  // const deliveryDate2 = today.add(7, 'day').format('dddd, MMMM D');
  // const deliveryDate3 = today.add(10, 'day').format('dddd, MMMM D');

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    
    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const deliveryDateString = today.add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D');

    cartSummaryHTML += 
    `
      <div class="cart-item-container
      js-cart-item-container-${matchingProduct.id}">
        <div class="time-now js-time-now">
          <span class="time-now-value">Time now:${today.format('dddd, MMMM D, HH:mm:ss')}</span>
        </div>
        <div class="delivery-date">
          <span class="delivery-date-value">Delivery Date: ${deliveryDateString}</span>
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
            ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}

          </div>
        </div>
      </div>
    `

  });

  function deliveryOptionsHTML(matchingProduct, cartItem){ 
    let deliveryOptionsHTML = '';

    deliveryOptions.forEach((deliveryOption) => {

      const deliveryDateString = today.add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      deliveryOptionsHTML += 
      `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" 
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${deliveryDateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} - Shipping
            </div>
          </div>
        </div>
      `
    });
    return deliveryOptionsHTML;
  }


  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
  
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      // remove products from cart
      const productId = link.dataset.productId;
      removeFromCart(productId);
      // remove from html solution 1
      // const cartItemContainer = link.closest('.cart-item-container');
      // cartItemContainer.remove();
      // remove from html solution 2
      document.querySelector(`.js-cart-item-container-${productId}`).remove();

    });

  })

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId)
      renderOrderSummary();
      renderPaymentSummary();
    });
  });


  function updateDeliveryTime() {
    const deliveryDateElements = document.querySelectorAll('.js-time-now');
    deliveryDateElements.forEach((element) => {
      element.textContent = "Time now: "+dayjs().format('dddd, MMMM D, HH:mm:ss');
    });
  }
  // Call updateDeliveryTime every second
  setInterval(updateDeliveryTime, 1000);

}