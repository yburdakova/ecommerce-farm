import  { useState } from 'react'
import { deliveryData } from '../../constants/data'

const DeliverySelect = () => {

  const [deliverySettings] = useState (deliveryData)

  return (
    <div>
    Select a city for delivery
    <select name="delivery" id="delivery">
      {deliverySettings.map((deliveryItem, index) => (
        <option key={`${index}-${deliveryItem}`} value={deliveryItem.city}>{deliveryItem.city}</option>
      ))}
    </select>
  </div>
  )
}

export default DeliverySelect