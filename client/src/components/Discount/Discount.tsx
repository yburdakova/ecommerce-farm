import { SetStateAction, useState } from 'react';
import { addCode } from '../../redux/cartRedux';
import { useDispatch } from 'react-redux';
import { saleCodes } from '../../constants/data';
import styles from './Discount.module.css';

const Discount = () => {
  const [couponCode, setCouponCode] = useState('');
  const [isValidCode, setIsValidCode] = useState(true);
  const dispatch = useDispatch();

  const getDiscountFromCode = (inputCode: string) => {
    const discount = saleCodes.find((discountCode) => discountCode.codeWord === inputCode);
    return discount ? discount.discount : 0;
  };

  const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setCouponCode(e.target.value);
    setIsValidCode(true); 
  };

  const handleClickApplyCode = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const discountValue = getDiscountFromCode(couponCode.toUpperCase());
    if (discountValue === 0) {
      setIsValidCode(false); 
    } else {
      dispatch(addCode({ discount: discountValue }));
      setIsValidCode(true);
    }
    setCouponCode('');
  }

  return (
    <div className={styles.containerDiscount}>
      <form className={styles.formDiscount}>
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
      {!isValidCode && <div className={styles.invalidCode}>Invalid code</div>}
    </div>
  )
}

export default Discount;
