export const createBalanceHistoryArr = (user, currentAddress) => {
  const transactions = user.transactions;
  let currentBalance = parseInt(user.balance);

  const invertedArr = transactions.sort((a, b) => {
    const transactionTimeStampFirst = new Date(b.timestamp);
    const transactionTimeStampLast = new Date(a.timestamp);
    return transactionTimeStampFirst - transactionTimeStampLast;
  });

  let result = [];
  invertedArr.reduce((acc, cur, idx) => {
    const amountInNumber = parseInt(cur.amount);
    if (cur.fromAddress === currentAddress) {
      result.push({
        x: acc + amountInNumber,
        y: invertedArr.length - idx,
      });
      return acc + amountInNumber;
    }
    result.push({
      x: acc - amountInNumber,
      y: invertedArr.length - idx,
    });
    return acc - amountInNumber;
  }, currentBalance);

  result.unshift({x: currentBalance, y: result.length});

  return result.sort((a, b) => a.y - b.y);
};
