import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Page3.css';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const Page3 = () => {
  const navigate = useNavigate();
  const products: Product[] = [
    { id: 1, name: 'Laptop', price: 999.99 },
    { id: 2, name: 'Mouse', price: 29.99 },
    { id: 3, name: 'Keyboard', price: 79.99 },
    { id: 4, name: 'Monitor', price: 249.99 },
    { id: 5, name: 'Headphones', price: 149.99 },
    { id: 6, name: 'Webcam', price: 89.99 },
    { id: 7, name: 'USB Drive', price: 19.99 },
    { id: 8, name: 'External Hard Drive', price: 129.99 },
    { id: 9, name: 'Tablet', price: 399.99 },
    { id: 10, name: 'Smartphone', price: 699.99 }
  ];

  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <div className="shopPage">
      <h1>Shop</h1>
      <div className="shopContainer">
        <div className="productsSection">
          <h2>Products</h2>
          <div className="productsGrid">
            {products.map(product => (
              <div key={product.id} className="productCard">
                <h3>{product.name}</h3>
                <p className="price">£{product.price.toFixed(2)}</p>
                <button onClick={() => addToCart(product)} className="addToCartBtn">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="cartSection">
          <h2>
            Shopping Cart
            {cart.length > 0 && <span className="cartCount">({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>}
          </h2>
          {cart.length === 0 ? (
            <p className="emptyCart">Your cart is empty</p>
          ) : (
            <>
              <div className="cartItems">
                {cart.map(item => (
                  <div key={item.product.id} className="cartItem">
                    <div className="cartItemInfo">
                      <span className="cartItemName">{item.product.name}</span>
                      <span className="cartItemPrice">£{item.product.price.toFixed(2)}</span>
                    </div>
                    <div className="cartItemControls">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
                      <span className="quantity">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                      <button onClick={() => removeFromCart(item.product.id)} className="removeBtn">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cartTotal">
                <strong>Total: £{getTotal().toFixed(2)}</strong>
              </div>
              <button 
                onClick={() => navigate('/checkout', { state: { cart } })} 
                className="checkoutBtn"
              >
                Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page3;

