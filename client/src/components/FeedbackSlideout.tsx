import { useState } from 'react';
import './FeedbackSlideout.css';

const FeedbackSlideout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your feedback!');
    setFeedback('');
    setRating(0);
    setIsOpen(false);
  };

  return (
    <>
      <button className="feedbackToggle" onClick={() => setIsOpen(true)}>
        Feedback
      </button>
      <div className={`feedbackSlideout ${isOpen ? 'open' : ''}`}>
        <div className="feedbackContent">
          <div className="feedbackHeader">
            <h2>Send Feedback</h2>
            <button className="closeButton" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit} className="feedbackForm">
            <div className="formGroup">
              <label>Rating</label>
              <div className="ratingButtons">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`ratingBtn ${rating === num ? 'active' : ''}`}
                    onClick={() => {
                      if (num === 4) {
                        return;
                      }
                      setRating(num);
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
            <div className="formGroup">
              <label>Your Feedback</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Please share your thoughts..."
                rows={6}
                required
              />
            </div>
            <button type="submit" className="submitBtn">
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FeedbackSlideout;

