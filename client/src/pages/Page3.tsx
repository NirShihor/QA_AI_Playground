import { useState } from 'react';
import Popup from '../components/Popup';

const Page3 = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="page">
      <h1>Page 3</h1>
      <button onClick={() => setIsPopupOpen(true)}>Open Popup</button>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="Page 3 Popup"
        content="This is a popup from Page 3. Another variation for comprehensive testing."
      />
    </div>
  );
};

export default Page3;

