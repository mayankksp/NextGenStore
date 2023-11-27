import React, { useState } from 'react';
import style from '../styles/payments.module.css';
import visa from '../assets/visa_icon.svg';
import { store } from '../state/store.state';

function FakeCard() {
  // Accessing the authentication state from the store
  const { auth } = store.getState();

  // State variables to track the copying status of card details
  const [isNumcopied, setIsNumcopied] = useState(false);
  const [isDatecopied, setIsDatecopied] = useState(false);
  const [isCvccopied, setIsCvccopied] = useState(false);

  // Effect to reset the copy status after 2 seconds
  React.useEffect(() => {
    const resetCopyStatus = () => {
      setTimeout(() => {
        setIsNumcopied(false);
        setIsDatecopied(false);
        setIsCvccopied(false);
      }, 2000);
    };
    return resetCopyStatus();
  }, [isNumcopied, isDatecopied, isCvccopied]);

  return (
    <>
      <div
        style={{
          fontSize: '1.2rem',
          width: '100%',
          textAlign: 'center',
          margin: '2rem 0',
        }}
      >
        Use The Card Details Below To Checkout
      </div>
      <div className={style.card}>
        <div className={style.foreground}>
          <img src={visa} className={style.visa} alt="Visa Logo" />
          <p className={style.number}>
            4242 4242 4242 4242{' '}
            <span>
              {/* Clipboard icon for copying the card number */}
              <svg
                onClick={() => {
                  navigator.clipboard.writeText('4242 4242 4242 4242');
                  setIsNumcopied(true);
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`bi bi-clipboard-minus ${style.clipboard}`}
                viewBox="0 0 16 16"
              >
                {/* SVG path elements omitted for brevity */}
              </svg>

              {isNumcopied && <small> Copied!</small>}
            </span>
          </p>
          <div className={style.name}>
            {/* Display user's name if authenticated, otherwise show default */}
            {auth.user
              ? `${auth.user.firstName} ${auth.user.lastName}`
              : 'Customer Name'}
          </div>
          <div className={style.date}>
            Valid Upto:
            <div>
              {' '}
              08/
              {/* Calculating the next year for the card's validity */}
              {Number(new Date().getFullYear().toString().substring(2, 4)) + 1}{' '}
              <span>
                {/* Clipboard icon for copying the validity date */}
                <svg
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `08/${
                        Number(
                          new Date().getFullYear().toString().substring(2, 4)
                        ) + 1
                      }`
                    );
                    setIsDatecopied(true);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className={`bi bi-clipboard-minus ${style.clipboard}`}
                  viewBox="0 0 16 16"
                >
                  {/* SVG path elements omitted for brevity */}
                </svg>
                {isDatecopied && <small> Copied!</small>}
              </span>
            </div>
          </div>
        </div>
        <div className={style.background}>
          <div className={style.wrapper}>
            <div className={style.stripe}></div>
            <span className={style.cvc}>
              <i>123</i>
              <span>
                {/* Clipboard icon for copying the CVC */}
                <svg
                  onClick={() => {
                    navigator.clipboard.writeText('123');
                    setIsCvccopied(true);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className={`bi bi-clipboard-minus ${style.clipboard}`}
                  viewBox="0 0 16 16"
                >
                  {/* SVG path elements omitted for brevity */}
                </svg>
                {isCvccopied && <small> Copied!</small>}
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default FakeCard;