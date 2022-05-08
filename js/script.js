// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function () {
  // =============================
  // Private methods and propeties
  // =============================
  cart = [];

  // Constructor
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }

  // Save cart
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }

  // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem('shoppingCart') != null) {
    loadCart();
  }

  // =============================
  // Public methods and propeties
  // =============================
  var obj = {};

  // Add to cart
  obj.addItemToCart = function (name, price, count) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  };
  // Set count from item
  obj.setCountForItem = function (name, count) {
    for (var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
  obj.removeItemFromCart = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count--;
        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }
    saveCart();
  };

  // Remove all items from cart
  obj.removeItemFromCartAll = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  };

  // Clear cart
  obj.clearCart = function () {
    cart = [];
    saveCart();
  };

  // Count cart
  obj.totalCount = function () {
    var totalCount = 0;
    for (var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  };

  // Total cart
  obj.totalCart = function () {
    var totalCart = 0;
    for (var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  };

  // List cart
  obj.listCart = function () {
    var cartCopy = [];
    for (i in cart) {
      item = cart[i];
      itemCopy = {};
      for (p in item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy);
    }
    return cartCopy;
  };

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
})();


$(document).ready(function () {
  console.log("ready!");  
  createRowData();
  shoppingCart.clearCart();
  // *****************************************
  // Triggers / Events
  // *****************************************
  // Add item  
  $('.add-to-cart').click(function (event) {
    event.preventDefault();
    console.log('Item added to cart')
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });
  // Clear items
  $('.clear-cart').click(function () {
    shoppingCart.clearCart();
    displayCart();
  });
  $('.show-cart').on('click', '.delete-item', function (event) {
    var name = $(this).data('name');
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  });

  // -1
  $('.show-cart').on('click', '.minus-item', function (event) {
    var name = $(this).data('name');
    shoppingCart.removeItemFromCart(name);
    displayCart();
  });
  // +1
  $('.show-cart').on('click', '.plus-item', function (event) {
    var name = $(this).data('name');
    shoppingCart.addItemToCart(name);
    displayCart();
  });

  // Item count input
  $('.show-cart').on('change', '.item-count', function (event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
});
function createRowData(){
  var data = [
    {
      name: 'Brownie1',
      price: 50,
      src: 'images/b1.jpg',
      alt: 'Brownie image',
    },
    {
      name: 'Brownie2',
      price: 30,
      src: 'images/b2.jpg',
      alt: 'Brownie image',
    },
    {
      name: 'Brownie3',
      price: 75,
      src: 'images/b3.jpg',
      alt: 'Brownie Image',
    },
    {
      name: 'Ice-Cream1',
      price: 15,
      src: 'images/ic1.jpg',
      alt: 'Ice-cream image',
    },
    {
      name: 'Ice-cream2',
      price: 130,
      src: 'images/ic2.jpg',
      alt: 'Ice-cream image',
    },
    {
      name: 'Ice-cream3',
      price: 89,
      src: 'images/ic3.jpeg',
      alt: 'Ice-cream Image',
    },
    {
      name: 'Waffles1',
      price: 26,
      src: 'images/wf1.jpg',
      alt: 'Waffles image',
    },
    {
      name: 'Waffles2',
      price: 37,
      src: 'images/wf2.jpg',
      alt: 'Waffles image',
    },
    {
      name: 'Waffles3',
      price: 99,
      src: 'images/wf3.jpeg',
      alt: 'Waffles Image',
    },
  ];
  var rowEle = document.createElement('div');
  rowEle.classList.add('row');

  for(i=0; i< data.length; i++){
    var columnEle = document.createElement('div');
    columnEle.classList.add('col');

    var cardEle = document.createElement('div');
    cardEle.classList.add('card','w20rem');
    
    var imgEle = document.createElement('img');
    imgEle.setAttribute('src', data[i].src);
    imgEle.setAttribute('alt', data[i].alt);
    imgEle.classList.add('card-img-top');

    var cardBlockEle = document.createElement('div');
    cardBlockEle.classList.add('card-block');

    var h4Ele = document.createElement('h4');
    h4Ele.classList.add('card-title');
    h4Ele.innerText = data[i].name;

    var paraEle = document.createElement('p');
    paraEle.classList.add('card-text');
    paraEle.innerText = data[i].price;

    var anchorEle = document.createElement('a');
    anchorEle.setAttribute('data-name', data[i].name);
    anchorEle.setAttribute('data-price', data[i].price);
    anchorEle.classList.add('add-to-cart', 'btn', 'btn-primary');
    anchorEle.innerText = 'Add to cart';

    cardBlockEle.appendChild(h4Ele);
    cardBlockEle.appendChild(paraEle);
    cardBlockEle.appendChild(anchorEle);

    cardEle.appendChild(imgEle);
    cardEle.appendChild(cardBlockEle);

    columnEle.appendChild(cardEle);

    rowEle.appendChild(columnEle);
  }
  var containerEle = document.querySelector('.container').appendChild(rowEle);
}
function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = '';
  for (var i in cartArray) {
    output +=
      '<tr>' +
      '<td>' +
      cartArray[i].name +
      '</td>' +
      '<td>(' +
      cartArray[i].price +
      ')</td>' +
      "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" +
      cartArray[i].name +
      '>-</button>' +
      "<input type='number' class='item-count form-control' data-name='" +
      cartArray[i].name +
      "' value='" +
      cartArray[i].count +
      "'>" +
      "<button class='plus-item btn btn-primary input-group-addon' data-name=" +
      cartArray[i].name +
      '>+</button></div></td>' +
      "<td><button class='delete-item btn btn-danger' data-name=" +
      cartArray[i].name +
      '>X</button></td>' +
      ' = ' +
      '<td>' +
      cartArray[i].total +
      '</td>' +
      '</tr>';
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html(shoppingCart.totalCount());
}
displayCart();
