import React, {useEffect, useState, createContext} from 'react';
import {createBalanceHistoryArr} from '../utils';
export const MyGlobalContext = createContext({
  transactions: [],
  getUser: () => {},
  getTransactions: () => [],
  sendTransaction: () => {},
});

const ContextProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [balanceHistory, setBalanceHistory] = useState([]);
  const [currentAddress, setCurrentAddress] = useState('');

  useEffect(() => {
    getUser(currentAddress);
  }, [currentAddress]);

  useEffect(() => {
    if (user.balance !== undefined && currentAddress !== '') {
      setBalanceHistory(createBalanceHistoryArr(user, currentAddress));
    }
  }, [user, currentAddress]);
/**
 * Documentations
 * @param {string} address Address you need to provide this to get the address from bla
 * */
  const getUser = async address => {
    try {
      const res = await fetch(
        `http://jobcoin.gemini.com/dragster-geek/api/addresses/${address}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      );
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const createTransaction = async transaction => {
    
    try {
      const res = await fetch(
        'http://jobcoin.gemini.com/dragster-geek/api/transactions',
        {
          method: 'POST',
          body: JSON.stringify({
            timestamp: Date.now(),
            fromAddress: transaction.fromAddress,
            toAddress: transaction.toAddress,
            amount: transaction.amount,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      );
      if (res.ok) {
        getUser(currentAddress);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MyGlobalContext.Provider
      value={{
        user,
        createTransaction,
        balanceHistory,
        setCurrentAddress,
      }}>
      {children}
    </MyGlobalContext.Provider>
  );
};

export default ContextProvider;
