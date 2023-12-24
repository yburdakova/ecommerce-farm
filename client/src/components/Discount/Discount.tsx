import { SetStateAction, useState } from 'react';
import { addCode } from '../../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { saleCodes } from '../../constants/data';
import styles from './Discount.module.css';

const Discount = () => {
  const [couponCode, setCouponCode] = useState('');
  const dispatch = useDispatch();

  const getDiscountFromCode = (inputCode: string) => {
    const discount = saleCodes.find((discountCode) => discountCode.codeWord === inputCode);
    return discount ? discount.discount : 0;
  };

  const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setCouponCode(e.target.value);
  };

  const handleClickApplyCode = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const discountValue = getDiscountFromCode(couponCode.toUpperCase());
    dispatch(addCode({ discount: discountValue }));
    setCouponCode('');
  }

  return (
    <div className={styles.formDiscount}>
      <form className={styles.containerDiscount}>
        <label htmlFor="couponCode">Discount code: </label>
        <input 
          className={styles.inputDiscount}
          type="text" 
          id="couponCode"
          value={couponCode}
          onChange={handleChange} 
        />
        <button type="submit" onClick={handleClickApplyCode}>Apply discount</button>
      </form>
    </div>
  )
}

export default Discount;
