

const Success = () => {
  const paymentResponse = JSON.parse(localStorage.getItem('paymentResponse'));
  console.log(paymentResponse);
  
  return (
    <div>SUCCESS PAYMENT</div>
  )
}

export default Success