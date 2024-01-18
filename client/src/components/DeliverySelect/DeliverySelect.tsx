import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateDeliveryPlace, updateDeliveryPrice } from '../../redux/cartRedux';
import styles from './DeliverySelect.module.css';
import { RootState } from '../../redux/store';
import { userRequest } from '../../middleware/requestMethods';
import { addDelivery } from '../../redux/admRedux';
import { DeliveryData } from '../../constants/types';

const DeliverySelect = () => {

  const user = useSelector((state: RootState) => state.user.currentUser);
  const [delivery, setDelivery] = useState<DeliveryData[]>([])
  const [selectedCity, setSelectedCity] = useState('no delivery');
  const dispatch = useDispatch();

  useEffect(() => {
    const getDelivery = async () => {
      if (user) {
        try {
          const response = await userRequest(user.accessToken).get("/delivery");
          console.log(response)
          dispatch(addDelivery(response.data))
          setDelivery(response.data)
        } catch (error) {
          console.log(error);
        }
      }
  }
  getDelivery();
  }, [user])

  const handleChange = (e: { target: { value: string; }; }) => {
    const city = e.target.value;
    setSelectedCity(city);
    const deliveryPrice = delivery.find(item => item.cityName === city)?.price || 0;
    dispatch(updateDeliveryPrice(deliveryPrice));
    dispatch(updateDeliveryPlace(city)); 
  }
  
  return (
    <div className={styles.container}>
    Select a city for delivery
    <select name="delivery" id="delivery" value={selectedCity} onChange={handleChange} className={styles.select}>
      <option value="no delivery">No delivery</option>
      {delivery.map((deliveryItem, index) => (
        <option key={`${index}-${deliveryItem._id}`} value={deliveryItem.cityName}>{deliveryItem.cityName}</option>
      ))}
    </select>
  </div>
  )
}

export default DeliverySelect