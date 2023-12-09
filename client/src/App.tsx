
import { useState, useEffect } from 'react';
import './App.css'
import StripeCheckout, { Token } from 'react-stripe-checkout';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const PAYMENT_KEY ="pk_test_51O3JMuB2aDhCaXSC0Toq5EDANjnUk34necZjqXSbdc0QoV0FxTblPkjtrHqesaulQxX7ysPaknOXVSBAlD4UgfCk00lziA2DCG"

function App() {

  const [stripeToken, setStripeToken] = useState<Token | null>(null)
  const navigate = useNavigate();

  const onToken = (token: Token): void => {
    setStripeToken(token)
  }
  

  useEffect(()=> {
    
    const makeRequest = async () => {
      if (stripeToken) {
        try {
          const response = await axios.post(
            'http://localhost:5555/api/checkout/payment',
            {
              tokenId: stripeToken.id,
              amount: 2000,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          console.log(response.data);
          navigate('/success')
        } catch (error) {
          console.error("Ошибка при отправке запроса:", error);
        }
      }
    };

    stripeToken && makeRequest()
  }, [stripeToken])

  return (
    <>
      <div>
        {stripeToken 
        ? <p>Processing... Please wait.</p>
        : <StripeCheckout 
        token={onToken}
        stripeKey={PAYMENT_KEY}
        name="Farmer cheese company"
        image="./assets/react.svg"
        billingAddress
        shippingAddress
        description='Your total is $20'
        amount={2000}
        ComponentClass="paymentButton"
      />}
        
          
      </div>
    </>
  )
}

export default App
