 const transactions = [
  {
    transaction_id: "1",
    transaction_date: "2025-03-01",
    transaction_amount: 100,
    transaction_type: "debit",
    transaction_description: "Продукты",
    merchant_name: "Linella",
    card_type: "debit"
  },
  {
    transaction_id: "2",
    transaction_date: "2025-03-02",
    transaction_amount: 2000,
    transaction_type: "credit",
    transaction_description: "Зарплата",
    merchant_name: "Bank",
    card_type: "debit"
  },
  {
    transaction_id: "3",
    transaction_date: "2025-04-10",
    transaction_amount: 250,
    transaction_type: "debit",
    transaction_description: "Одежда",
    merchant_name: "H&M",
    card_type: "credit"
  },
  {
    transaction_id: "4",
    transaction_date: "2025-04-15",
    transaction_amount: 300,
    transaction_type: "credit",
    transaction_description: "Возврат",
    merchant_name: "Aliexpress",
    card_type: "debit"
  },
  {
    transaction_id: "5",
    transaction_date: "2025-05-20",
    transaction_amount: 150,
    transaction_type: "debit",
    transaction_description: "Кафе",
    merchant_name: "Andys",
    card_type: "debit"
  }
];

/**
 * Возвращает массив уникальных типов транзакций.
 * @param {Array} transactions - Массив транзакций.
 * @returns {Array} Уникальные типы транзакций.
 */
function getUniqueTransactionTypes(transactions) {
  return [...new Set(transactions.map(transaction => transaction.transaction_type))];
}

/**
 * Вычисляет общую сумму всех транзакций.
 * @param {Array} transactions - Массив транзакций.
 * @returns {number} Общая сумма транзакций.
 */
function calculateTotalAmount(transactions) {
  return transactions.reduce((sum, transaction) => sum + transaction.transaction_amount, 0);
}

/**
 * Вычисляет общую сумму транзакций за указанный год, месяц и день.
 * Параметры необязательные.
 * @param {Array} transactions - Массив транзакций.
 * @param {number} [year] - Год.
 * @param {number} [month] - Месяц.
 * @param {number} [day] - День.
 * @returns {number} Сумма транзакций по выбранной дате.
 */
function calculateTotalAmountByDate(transactions, year, month, day) {
  return transactions
    .filter(transaction => {
      const date = new Date(transaction.transaction_date);
      const transactionYear = date.getFullYear();
      const transactionMonth = date.getMonth() + 1;
      const transactionDay = date.getDate();

      if (year !== undefined && transactionYear !== year) {
        return false;
      }

      if (month !== undefined && transactionMonth !== month) {
        return false;
      }

      if (day !== undefined && transactionDay !== day) {
        return false;
      }

      return true;
    })
    .reduce((sum, transaction) => sum + transaction.transaction_amount, 0);
}

/**
 * Возвращает транзакции указанного типа.
 * @param {Array} transactions - Массив транзакций.
 * @param {string} type - Тип транзакции.
 * @returns {Array} Отфильтрованный массив транзакций.
 */
function getTransactionByType(transactions, type) {
  return transactions.filter(transaction => transaction.transaction_type === type);
}

/**
 * Возвращает транзакции, проведенные в указанном диапазоне дат.
 * @param {Array} transactions - Массив транзакций.
 * @param {string} startDate - Начальная дата.
 * @param {string} endDate - Конечная дата.
 * @returns {Array} Транзакции в диапазоне дат.
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return transactions.filter(transaction => {
    const currentDate = new Date(transaction.transaction_date);
    return currentDate >= start && currentDate <= end;
  });
}

/**
 * Возвращает транзакции по названию магазина.
 * @param {Array} transactions - Массив транзакций.
 * @param {string} merchantName - Название магазина.
 * @returns {Array} Подходящие транзакции.
 */
function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter(transaction => transaction.merchant_name === merchantName);
}

/**
 * Вычисляет среднее значение суммы транзакций.
 * @param {Array} transactions - Массив транзакций.
 * @returns {number} Средняя сумма.
 */
function calculateAverageTransactionAmount(transactions) {
  if (transactions.length === 0) {
    return 0;
  }

  return calculateTotalAmount(transactions) / transactions.length;
}

/**
 * Возвращает транзакции с суммой в заданном диапазоне.
 * @param {Array} transactions - Массив транзакций.
 * @param {number} minAmount - Минимальная сумма.
 * @param {number} maxAmount - Максимальная сумма.
 * @returns {Array} Отфильтрованные транзакции.
 */
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
  return transactions.filter(transaction =>
    transaction.transaction_amount >= minAmount &&
    transaction.transaction_amount <= maxAmount
  );
}

/**
 * Вычисляет общую сумму дебетовых транзакций.
 * @param {Array} transactions - Массив транзакций.
 * @returns {number} Сумма дебетовых транзакций.
 */
function calculateTotalDebitAmount(transactions) {
  return transactions
    .filter(transaction => transaction.transaction_type === "debit")
    .reduce((sum, transaction) => sum + transaction.transaction_amount, 0);
}

/**
 * Возвращает месяц, в котором было больше всего транзакций.
 * @param {Array} transactions - Массив транзакций.
 * @returns {number|null} Номер месяца или null.
 */
function findMostTransactionsMonth(transactions) {
  if (transactions.length === 0) {
    return null;
  }

  const months = {};

  transactions.forEach(transaction => {
    const month = new Date(transaction.transaction_date).getMonth() + 1;
    months[month] = (months[month] || 0) + 1;
  });

  let maxMonth = null;
  let maxCount = 0;

  for (let month in months) {
    if (months[month] > maxCount) {
      maxCount = months[month];
      maxMonth = Number(month);
    }
  }

  return maxMonth;
}

/**
 * Возвращает месяц, в котором было больше всего дебетовых транзакций.
 * @param {Array} transactions - Массив транзакций.
 * @returns {number|null} Номер месяца или null.
 */
function findMostDebitTransactionMonth(transactions) {
  const debitTransactions = transactions.filter(
    transaction => transaction.transaction_type === "debit"
  );

  if (debitTransactions.length === 0) {
    return null;
  }

  const months = {};

  debitTransactions.forEach(transaction => {
    const month = new Date(transaction.transaction_date).getMonth() + 1;
    months[month] = (months[month] || 0) + 1;
  });

  let maxMonth = null;
  let maxCount = 0;

  for (let month in months) {
    if (months[month] > maxCount) {
      maxCount = months[month];
      maxMonth = Number(month);
    }
  }

  return maxMonth;
}

/**
 * Определяет, каких транзакций больше.
 * @param {Array} transactions - Массив транзакций.
 * @returns {string} debit, credit или equal.
 */
function mostTransactionTypes(transactions) {
  let debitCount = 0;
  let creditCount = 0;

  transactions.forEach(transaction => {
    if (transaction.transaction_type === "debit") {
      debitCount++;
    }

    if (transaction.transaction_type === "credit") {
      creditCount++;
    }
  });

  if (debitCount > creditCount) {
    return "debit";
  }

  if (creditCount > debitCount) {
    return "credit";
  }

  return "equal";
}

/**
 * Возвращает транзакции, совершенные до указанной даты.
 * @param {Array} transactions - Массив транзакций.
 * @param {string} date - Дата.
 * @returns {Array} Подходящие транзакции.
 */
function getTransactionsBeforeDate(transactions, date) {
  const targetDate = new Date(date);

  return transactions.filter(transaction =>
    new Date(transaction.transaction_date) < targetDate
  );
}

/**
 * Возвращает транзакцию по ее идентификатору.
 * @param {Array} transactions - Массив транзакций.
 * @param {string} id - Идентификатор транзакции.
 * @returns {Object|undefined} Найденная транзакция или undefined.
 */
function findTransactionById(transactions, id) {
  return transactions.find(transaction => transaction.transaction_id === id);
}

/**
 * Возвращает массив описаний транзакций.
 * @param {Array} transactions - Массив транзакций.
 * @returns {Array} Массив описаний.
 */
function mapTransactionDescriptions(transactions) {
  return transactions.map(transaction => transaction.transaction_description);
}

console.log("===== ОСНОВНОЙ МАССИВ =====");
console.log("Уникальные типы:", getUniqueTransactionTypes(transactions));
console.log("Общая сумма:", calculateTotalAmount(transactions));
console.log("Сумма за 2025 год:", calculateTotalAmountByDate(transactions, 2025));
console.log("Сумма за апрель 2025:", calculateTotalAmountByDate(transactions, 2025, 4));
console.log("Транзакции типа debit:", getTransactionByType(transactions, "debit"));
console.log(
  "Транзакции в диапазоне дат:",
  getTransactionsInDateRange(transactions, "2025-03-01", "2025-04-30")
);
console.log("Транзакции магазина Linella:", getTransactionsByMerchant(transactions, "Linella"));
console.log("Средняя сумма:", calculateAverageTransactionAmount(transactions));
console.log("Транзакции по сумме 100-300:", getTransactionsByAmountRange(transactions, 100, 300));
console.log("Сумма debit-транзакций:", calculateTotalDebitAmount(transactions));
console.log("Месяц с наибольшим количеством транзакций:", findMostTransactionsMonth(transactions));
console.log(
  "Месяц с наибольшим количеством debit-транзакций:",
  findMostDebitTransactionMonth(transactions)
);
console.log("Каких транзакций больше:", mostTransactionTypes(transactions));
console.log("Транзакции до 2025-04-01:", getTransactionsBeforeDate(transactions, "2025-04-01"));
console.log("Поиск транзакции по id 3:", findTransactionById(transactions, "3"));
console.log("Описания транзакций:", mapTransactionDescriptions(transactions));

const emptyTransactions = [];

console.log("\n===== ПУСТОЙ МАССИВ =====");
console.log("Уникальные типы:", getUniqueTransactionTypes(emptyTransactions));
console.log("Общая сумма:", calculateTotalAmount(emptyTransactions));
console.log("Средняя сумма:", calculateAverageTransactionAmount(emptyTransactions));
console.log("Месяц с наибольшим количеством транзакций:", findMostTransactionsMonth(emptyTransactions));
console.log(
  "Месяц с наибольшим количеством debit-транзакций:",
  findMostDebitTransactionMonth(emptyTransactions)
);
console.log("Каких транзакций больше:", mostTransactionTypes(emptyTransactions));

const oneTransaction = [
  {
    transaction_id: "10",
    transaction_date: "2025-06-01",
    transaction_amount: 500,
    transaction_type: "credit",
    transaction_description: "Пополнение",
    merchant_name: "Bank",
    card_type: "debit"
  }
];

console.log("\n===== ОДНА ТРАНЗАКЦИЯ =====");
console.log("Уникальные типы:", getUniqueTransactionTypes(oneTransaction));
console.log("Общая сумма:", calculateTotalAmount(oneTransaction));
console.log("Средняя сумма:", calculateAverageTransactionAmount(oneTransaction));
console.log("Поиск по id:", findTransactionById(oneTransaction, "10"));
console.log("Описания:", mapTransactionDescriptions(oneTransaction));
