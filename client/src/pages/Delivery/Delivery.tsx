import React, { useEffect, useState } from 'react';
import styles from './Delivery.module.css';
import { RootState } from '../../redux/store';
import { userRequest } from '../../middleware/requestMethods';
import { useSelector } from 'react-redux';
import { DeliveryData } from '../../constants/types';

const Delivery = () => {
  const admin = useSelector((state: RootState) => state.user.currentUser);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const [delivery, setDelivery] = useState<DeliveryData[]>([])

  useEffect(() => {
    const getDelivery = async () => {
      if (admin?.isAdmin) {
        try {
          const response = await userRequest(admin.accessToken).get("/delivery");
          console.log(response)
          return setDelivery(response.data)
        } catch (error) {
          console.log(error);
        }
      }
  }
  getDelivery();
  }, [admin, title])

  const onHandleAddPoint = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!title || price <= 0) {
      alert('Please provide valid title and price.');
      return;
    }

    const makeRequest = async () => {
      if (admin) {
        try {
          const response = await userRequest(admin.accessToken).post("/delivery/add_delivery", {
            cityName: title,
            price: price
          });
          console.log('Delivery point added:', response.data);
          setTitle('');
          setPrice(0);
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
          }, 2000);
        } catch (error) {
          console.log(error);
        }
      }
    };
    makeRequest();
  };

  return (
    <div>
      <h2>Delivery</h2>
      <div className="">Add new delivery point</div>
      <form className={styles.form}>
        <label htmlFor="city">Name of delivery point:</label>
        <input 
          type="text" 
          id='city' 
          value={title} 
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="price">Price: $</label>
        <input 
          type="number" 
          id='price' 
          value={price} 
          onChange={e => setPrice(Number(e.target.value))}
          className={styles.price}
        />
        <button onClick={e => onHandleAddPoint(e)}>Add</button>
      </form>
      {isSuccess && <div className={styles.success}>Delivery point added successfully!</div>}
      <div className="">
        {delivery && 
          <div className="">
            {delivery.map((deliveryItem,index) =>(
              <div className={styles.listItem} key={`category-${index}`}>
                <div className="">{index+1}.</div>
                <div className="">{deliveryItem.cityName}</div>
                <div className="">{deliveryItem.price}</div>
                <button>change</button>
                <button>delete</button>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default Delivery;