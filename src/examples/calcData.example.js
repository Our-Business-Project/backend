export const calcDataExample = {
  name: "Calculations example",
  data: {
    ProductionPlan: {
      value: 2000,
      label: "План виробництва",
      borderRadius: "0 0 15px 0",
      disabled: false,
      slider: true,
      maxValue: 10000,
    },
    CostPrice: {
      value: 1500,
      label: "Собівартість",
      borderRadius: "0 0 15px 15px",
      disabled: false,
      slider: true,
      maxValue: 10000,
    },
    PricePerUnit: {
      value: 2000,
      label: "Ціна за одиницю товару",
      borderRadius: "0 0 0 15px",
      disabled: false,
      slider: true,
      maxValue: 10000,
    },
    GrossProfit: {
      value: 500,
      label: "Маржинальний дохід",
    },
    ProductionCost: {
      value: 3000000,
      label: "Виробнича собівартість",
      borderRadius: "0 15px 15px 0",
    },
    FixedCosts: {
      value: 1117128,
      label: "Постійні витрати",
      disabled: false,
    },
    Revenue: {
      value: 4000000,
      label: "Виторг від реалізації",
      borderRadius: "15px 0 0 15px",
    },
    BreakEvenPoint: {
      value: 2234,
      label: "Точка беззбитковості",
    },
    Profit: {
      value: -117128,
      label: "Прибуток",
    },
    Want: {
      value: 100000,
      label: "Бажаю заробити",
      slider: true,
      maxValue: 100000,
      disabled: false,
    },
    DesiredProductionPlan: {
      value: 2434,
      label: "План виробництва повинен бути",
    },
    DesiredCostPrice: {
      value: 1391.44,
      label: "Собівартість повинна бути ",
    },
    DesiredPricePerUnit: {
      value: 2108.56,
      label: "Ціна повинна бути",
    },
  },
  fixedCosts: [
    {
      name: "Оренда будівель та приміщень, обладнання",
      value: 356200,
      columnNames: [
        "Посада",
        "Од. вим",
        "Кількість",
        "Ціна, грн/од змін",
        "Сума грн.",
      ],
      data: [
        ["Виробниче приміщення", "м кв", 3, 10000, 30000],
        ["Офісне приміщення", "м кв", 1, 1200, 1200],
        ["Торгова точка 1", "м кв", 65, 5000, 325000],
      ],
    },
    {
      name: "Енергоресурси, Комунальні витрати",
      columnNames: [
        "Посада",
        "Од. вим",
        "Кількість",
        "Ціна, грн/од змін",
        "Сума грн.",
      ],
      value: 216428,
      data: [
        ["Електроенергія", "кВт/год", 250, 17, 4250],
        ["Газ", "м3", 764, 12, 9168],
        ["Опалення", "ГКл", 132, 42, 5544],
        ["Паливо", "літр", 3123, 50, 156150],
        ["Комунальні витрати", "грн", 132, 313, 41316],
      ],
    },
    {
      name: "Адміністративно управлінський персонал",
      value: 244500,
      columnNames: ["Посада", "Число, людина", "Оклад грн./міс", "Сума грн."],
      data: [
        ["Директор", 1, 50000, 50000],
        ["Головний технолог", 7, 8000, 56000],
        ["Охоронець", 4, 6500, 26000],
        ["Прибиральниця", 5, 6500, 32500],
        ["Водій", 2, 10000, 20000],
        ["Бухгалтер", 3, 20000, 60000],
      ],
    },
    {
      name: "Зв'язок, Інше",
      value: 300000,
      columnNames: ["Посада", "Сума грн."],
      data: [
        ["Мобільний зв'язок", 233],
        ["Інтернет", 150],
        ["Хостинг", 600],
        ["Поштові витрати", 2000],
        ["Реклама", 8000],
        ["Подяки…", 300000],
      ],
    },
  ],
  createdAt: "03-12-2023 21:35:00",
  id: "656cd8643c570e67c0f05a32",
};
