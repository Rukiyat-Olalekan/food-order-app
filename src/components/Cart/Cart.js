import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const cartItemAddHandler = (item) => {
      const newItem = { ...item, amount: 1 };
      cartCtx.addItem(newItem);
  };

const cartItemRemoveHandler = (id) => {
  cartCtx.removeItem(id)
}

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <li key={item.id}>
          <div className={classes.details}>
            {item.name}
            <div className={classes.price}>
              <span>
                {item.amount} x {item.price}
              </span>
            </div>
          </div>
          <div className={classes.actions}>
            <button onClick={cartItemRemoveHandler.bind(null, item.id)}>-</button>
            <button onClick={cartItemAddHandler.bind(null, item)}>+</button>
          </div>
        </li>
      ))}
    </ul>
  );

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
