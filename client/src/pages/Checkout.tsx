import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Checkout.css';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const allowedPostcodeAreas = [
  'SW', 'SE', 'NW', 'N', 'E', 'W', 'EC', 'WC',
  'M',
  'B',
  'L',
  'LS',
  'G',
  'EH',
  'BS',
  'S',
  'NE'
];

const cityNames: { [key: string]: string } = {
  'SW': 'London', 'SE': 'London', 'NW': 'London', 'N': 'London', 
  'E': 'London', 'W': 'London', 'EC': 'London', 'WC': 'London',
  'M': 'Manchester',
  'B': 'Birmingham',
  'L': 'Liverpool',
  'LS': 'Leeds',
  'G': 'Glasgow',
  'EH': 'Edinburgh',
  'BS': 'Bristol',
  'S': 'Sheffield',
  'NE': 'Newcastle'
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart: CartItem[] = location.state?.cart || [];
  const [postalCode, setPostalCode] = useState('');
  const [postalCodeError, setPostalCodeError] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    deliveryDate: ''
  });
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);

  const isSecondOrFourthMonday = (date: Date): boolean => {
    const dayOfWeek = date.getDay();
    
    if (dayOfWeek !== 1) {
      return false;
    }
    
    const day = date.getDate();
    const mondayOfMonth = Math.floor((day - 1) / 7) + 1;
    
    return mondayOfMonth === 2 || mondayOfMonth === 4;
  };

  const getTotal = () => {
    if (!cart || cart.length === 0) {
      return 0;
    }
    return cart.reduce((total, item) => {
      if (item && item.product) {
        return total + item.product.price * item.quantity;
      }
      return total;
    }, 0);
  };

  const getDiscountPercent = (code: string): number => {
    const upperCode = code.toUpperCase().trim();
    if (upperCode === 'REAL10') {
      return 10;
    } else if (upperCode === 'REAL20') {
      return 20;
    } else if (upperCode === 'REAL30') {
      return 30;
    }
    return 0;
  };

  const getDiscount = (): number => {
    if (!couponCode.trim()) {
      return 0;
    }
    const upperCode = couponCode.toUpperCase().trim();
    
    if (upperCode === 'REAL30') {
      return 12;
    }
    
    const discountPercent = getDiscountPercent(couponCode);
    if (discountPercent === 0) {
      return 0;
    }
    return (getTotal() * discountPercent) / 100;
  };

  const getFinalTotal = (): number => {
    return getTotal() - getDiscount();
  };

  const extractOutwardCode = (postcode: string): string => {
    const trimmed = postcode.trim().toUpperCase();
    const parts = trimmed.split(' ');
    if (parts.length > 0) {
      return parts[0];
    }
    return trimmed.substring(0, 4);
  };

  const validatePostcode = (postcode: string): boolean => {
    if (!postcode.trim()) {
      setPostalCodeError('Postal code is required');
      return false;
    }

    const outwardCode = extractOutwardCode(postcode);
    
    const sortedAreas = [...allowedPostcodeAreas].sort((a, b) => b.length - a.length);
    
    for (const area of sortedAreas) {
      if (outwardCode.startsWith(area)) {
        setPostalCodeError('');
        return true;
      }
    }

    const allowedCities = Array.from(new Set(Object.values(cityNames))).join(', ');
    setPostalCodeError(`Delivery is only available to: ${allowedCities}`);
    return false;
  };

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPostalCode(value);
    if (value.trim()) {
      validatePostcode(value);
    } else {
      setPostalCodeError('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      deliveryDate: ''
    });
    setDeliveryDate(null);
    setPostalCode('');
    setPostalCodeError('');
    setCouponCode('');
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePostcode(postalCode)) {
      return;
    }

    if (!cart || cart.length === 0) {
      alert('Your cart is empty. Please add items to your cart first.');
      return;
    }

    const outwardCode = extractOutwardCode(postalCode);
    if (outwardCode.startsWith('BS')) {
      clearForm();
      return;
    }

    try {
      const items = cart.map(item => {
        if (!item || !item.product) {
          throw new Error('Invalid cart item');
        }
        return {
          productId: item.product.id,
          productName: item.product.name,
          price: item.product.price,
          quantity: item.quantity
        };
      });

      const orderData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: postalCode,
        country: formData.country,
        deliveryDate: deliveryDate ? deliveryDate.toISOString().split('T')[0] : '',
        couponCode: couponCode.trim() || undefined,
        discount: getDiscount(),
        items: items,
        subtotal: getTotal(),
        total: getFinalTotal()
      };

      console.log('Sending order data:', orderData);

      const response = await fetch('http://localhost:3085/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to place order');
      }

      const result = await response.json();
      alert('Order placed successfully!');
      navigate('/page3');
    } catch (error) {
      console.error('Error placing order:', error);
      alert(`Failed to place order: ${error instanceof Error ? error.message : 'Please try again.'}`);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkoutPage">
        <h1>Checkout</h1>
        <p>Your cart is empty. Please add items to your cart first.</p>
        <button onClick={() => navigate('/page3')} className="backToShopBtn">
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="checkoutPage">
      <h1>Checkout</h1>
      <div className="checkoutContainer">
        <div className="orderSummary">
          <h2>Order Summary</h2>
          <div className="orderItems">
            {cart.map(item => {
              if (!item || !item.product) {
                return null;
              }
              return (
                <div key={item.product.id} className="orderItem">
                  <span className="orderItemName">{item.product.name}</span>
                  <span className="orderItemQuantity">x{item.quantity}</span>
                  <span className="orderItemPrice">
                    £{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="orderSummary">
            <div className="orderSummaryRow">
              <span>Subtotal:</span>
              <span>£{getTotal().toFixed(2)}</span>
            </div>
            {getDiscount() > 0 && (
              <div className="orderSummaryRow discountRow">
                <span>Discount ({getDiscountPercent(couponCode)}%):</span>
                <span>-£{getDiscount().toFixed(2)}</span>
              </div>
            )}
            <div className="orderTotal">
              <strong>Total: £{getFinalTotal().toFixed(2)}</strong>
            </div>
          </div>
        </div>
        <div className="checkoutForm">
          <h2>Shipping Information</h2>
          <form onSubmit={handlePlaceOrder}>
            <div className="formGroup">
              <label>Full Name</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="formGroup">
              <label>Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="formGroup">
              <label>Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="formGroup">
              <label>Address</label>
              <input 
                type="text" 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="formGroup">
              <label>City</label>
              <input 
                type="text" 
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="formGroup">
              <label>Postal Code</label>
              <input 
                type="text" 
                value={postalCode}
                onChange={handlePostalCodeChange}
                required 
                placeholder="e.g., SW1A 1AA, M1 1AA"
              />
              {postalCodeError && <span className="errorMessage">{postalCodeError}</span>}
            </div>
            <div className="formGroup">
              <label>Country</label>
              <input 
                type="text" 
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="formGroup">
              <label>Discount Coupon (optional)</label>
              <input 
                type="text" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
              />
            </div>
            <div className="formGroup">
              <label>Delivery Date</label>
              <DatePicker
                selected={deliveryDate}
                onChange={(date: Date | null) => {
                  if (date && isSecondOrFourthMonday(date)) {
                    return;
                  }
                  setDeliveryDate(date);
                  if (date) {
                    setFormData(prev => ({
                      ...prev,
                      deliveryDate: date.toISOString().split('T')[0]
                    }));
                  }
                }}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select delivery date"
                required
                className="datePickerInput"
              />
            </div>
            <div className="formActions">
              <button type="button" onClick={() => navigate('/page3')} className="cancelBtn">
                Cancel
              </button>
              <button type="submit" className="placeOrderBtn">
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

