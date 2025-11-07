import { useState } from 'react';
import Popup from '../components/Popup';
import './Page1.css';

interface FormData {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  county: string;
  country: string;
  phoneNumber: string;
  email: string;
}

const Page1 = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    county: '',
    country: '',
    phoneNumber: '',
    email: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Form submitted successfully for ${formData.firstName} ${formData.lastName}!`);
    setIsPopupOpen(false);
    setFormData({
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      county: '',
      country: '',
      phoneNumber: '',
      email: formData.email  // Bug: email field is not cleared
    });
  };

  return (
    <div className="page">
      <h1>Page 1</h1>
      <button onClick={() => setIsPopupOpen(true)}>Open Popup</button>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="Page 1 Form"
      >
        <form className="page1Form" onSubmit={handleSubmit}>
          <div className="formRow">
            <label>
              First Name
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="formRow">
            <label>
              Last Name
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="formRow">
            <label>
              Address 1
              <input
                type="text"
                name="address1"
                value={formData.address1}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="formRow">
            <label>
              Address 2
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="formRow">
            <label>
              City
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="formRow">
            <label>
              County
              <input
                type="text"
                name="county"
                value={formData.county}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="formRow">
            <label>
              Country
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="formRow">
            <label>
              Phone Number
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="formRow">
            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <button type="submit" className="submitButton">
            Submit
          </button>
        </form>
      </Popup>
    </div>
  );
};

export default Page1;

