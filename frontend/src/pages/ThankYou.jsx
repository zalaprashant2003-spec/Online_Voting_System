import { useNavigate } from 'react-router-dom';
import '../styles/ThankYou.css';

function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="thankyou-container">
      <div className="thankyou-card">
        <h1>🎉 Thank You for Voting!</h1>
        <p>
          Your vote has been recorded successfully.  
          By voting, you have contributed to shaping a brighter future.  
        </p>
        <p className="encourage">
          Encourage your friends and family to participate too —  
          every vote matters! 🗳️
        </p>
        <button onClick={() => navigate('/voter')}>Back to Home</button>
      </div>
    </div>
  );
}

export default ThankYou;
