import React, { useEffect, useState } from 'react';
import styles from './Delivery.module.css';
import { RootState } from '../../redux/store';
import { userRequest } from '../../middleware/requestMethods';
import { useDispatch, useSelector } from 'react-redux';
import { DeliveryData } from '../../constants/types';
import { addDelivery } from '../../redux/admRedux';

const Delivery = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [delivery, setDelivery] = useState<DeliveryData[]>([])
  const [editingPoint, setEditingPoint] = useState('');
  const [editingTitle, setEditingTitle] = useState('');
  const [editingPrice, setEditingPrice] = useState(0)

  useEffect(() => {
    const getDelivery = async () => {
      if (user) {
        try {
          const response = await userRequest(user.accessToken).get("/delivery");
          console.log(response)
          dispatch(addDelivery(response.data))
          return setDelivery(response.data)
        } catch (error) {
          console.log(error);
        }
      }
  }
  getDelivery();
  }, [user, title])

  const onHandleAddPoint = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!title || price <= 0) {
      alert('Please provide valid title and price.');
      return;
    }

    const makeRequest = async () => {
      if (user?.isAdmin) {
        try {
          const response = await userRequest(user.accessToken).post("/delivery/add_delivery", {
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

  const onHandleDeletePoint = async (pointId: string) => {
    if (user?.isAdmin) {
      try {
        const response = await userRequest(user.accessToken).delete(`/delivery/${pointId}`);
        console.log('Delivery point added:', response.data);
        setDelivery(delivery.filter(item => item._id !== pointId));
      } catch (error) {
        console.log(error);
      }
    }
  }

  const onHandleEdit = (item:DeliveryData) => {
    setEditingPoint(item._id);
    setEditingTitle(item.cityName)
    setEditingPrice(item.price)
  }

  const onHandleSave = async (pointId:string) => {
    if (user?.isAdmin) {
      try {
        const response = await userRequest(user.accessToken).put(`/delivery/${pointId}`, {
          cityName: editingTitle,
          price: editingPrice
        });
        console.log('Delivery point updated:', response.data);
  
        // Обновляем состояние
        const updatedDelivery = delivery.map(item => 
          item._id === pointId ? {...item, cityName: editingTitle, price: editingPrice} : item
        );
        setDelivery(updatedDelivery);
  
        setEditingPoint('');
      } catch (error) {
        console.log(error);
      }
    }
  }

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
      {isSuccess && <div className={styles.success}>Successfully!</div>}
      <div className={styles.list}>
        {delivery && 
          <div className="">
            {delivery.map((deliveryItem,index) =>(
              <div className={styles.listItem} key={`category-${index}`}>
                <div className="">{index+1}.</div>
              
                { editingPoint == deliveryItem._id
                  ? <>
                      <input 
                        type="text" 
                        value={editingTitle}
                        onChange={e => setEditingTitle(e.target.value)}
                      />
                      <input 
                        type="number" 
                        value={editingPrice} 
                        onChange={e => setEditingPrice(Number(e.target.value))}
                      />
                      <button onClick={()=>onHandleSave(deliveryItem._id)}>Save</button>
                    </>
                  : <>
                      <div className="">{deliveryItem.cityName}</div>
                      <div className="">{deliveryItem.price}</div>
                      <button onClick={()=> onHandleEdit(deliveryItem)}>Edit</button>
                    </>
                  
                  
                }
                <button onClick={()=> onHandleDeletePoint(deliveryItem._id)}>Delete</button>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default Delivery;