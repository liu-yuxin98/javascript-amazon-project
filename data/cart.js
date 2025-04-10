export let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if(productId===cartItem.productId){
      matchingItem = cartItem;
    }
  });
  if(matchingItem){
    matchingItem.quantity++;
  }else{
    cart.push({
    productId: productId,
    quantity: 1,
    deliveryOptionId: '1',
  });
  }
  saveToLocalStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if(productId!==cartItem.productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToLocalStorage();
  // let matchingItemIndex;
  // cart.forEach((cartItem, index) => {
  //   if(productId===cartItem.productId){
  //     matchingItemIndex = index;
  //   }
  // });
  // if(matchingItemIndex!==undefined){
  //   cart.splice(matchingItemIndex, 1);
  // }
}
