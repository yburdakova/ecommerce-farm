import  { useState } from 'react'
import { deliveryData } from '../../constants/data'
import { useDispatch } from 'react-redux';
import { updateDeliveryPrice } from '../../redux/cartSlice';

const DeliverySelect = () => {

  const [deliverySettings] = useState (deliveryData)
  const [selectedCity, setSelectedCity] = useState(deliverySettings[0].city);
  const dispatch = useDispatch();

  const handleChange = (e: { target: { value: string; }; }) => {
    const city = e.target.value;
    setSelectedCity(city);
    const deliveryPrice = deliveryData.find(item => item.city === city)?.price || 0;
    dispatch(updateDeliveryPrice(deliveryPrice));
  }
  
  return (
    <div>
    Select a city for delivery
    <select name="delivery" id="delivery" value={selectedCity} onChange={handleChange}>
      {deliverySettings.map((deliveryItem, index) => (
        <option key={`${index}-${deliveryItem}`} value={deliveryItem.city}>{deliveryItem.city}</option>
      ))}
    </select>
  </div>
  )
}

export default DeliverySelect