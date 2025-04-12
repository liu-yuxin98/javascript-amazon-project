class Cart {
  cartItems = undefined;
  localStorageKey = 'cart-oop';

  constructor(localStorageKey){
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }
  
  loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
    if(!this.cartItems){
      this.cartItems = [];
    }
  }

  saveToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if(productId===cartItem.productId){
        matchingItem = cartItem;
      }
    });
    if(matchingItem){
      matchingItem.quantity++;
    }else{
      this.cartItems.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1',
    });
    }
    this.saveToLocalStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if(productId!==cartItem.productId){
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    this.saveToLocalStorage();
  }

  updateDeliveryOption(productId,deliveryOptionId) {
    this.cartItems.forEach((cartItem) => {
      if(productId===cartItem.productId){
        cartItem.deliveryOptionId = deliveryOptionId;
      }
    });
    this.saveToLocalStorage();
  }

} 


const cart = new Cart('cart-oop');
cart.loadFromStorage();
