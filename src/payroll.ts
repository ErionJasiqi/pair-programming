export type Salary = {
  born: Date;
  payday: Date;
  gross: number;
};

export type Deductions = Map<string, number>;

export const DEDUCTION_RATES: Deductions = new Map([
  ["AHV", 8.7],
  ["IV", 1.4],
  ["EO", 0.5],
  ["ALV", 1.1],
  ["NBU", 0.73],
  ["PK", 8.9],
]);

export type Payslip = {
  salary: Salary;
  deductions: Deductions;
  totalDeductions: number;
  net: number;
};

export function calculatePayslip(salary: Salary): Payslip {


  const deductions: Deductions = {};
  const birthDate = new Date(salary.born);
  const after17 = birthDate.getFullYear() + 17;
  const paydayyear = new Date(salary.payday).getFullYear();
  const isover17 = paydayyear >= after17;
  const yearlyPay = salary.gross * 12;

  if (isover17) {
    deductions["AHV"] = salary.gross * DEDUCTION_RATES.get("AHV") / 100;
    deductions["IV"] = salary.gross * DEDUCTION_RATES.get("IV") / 100;
    deductions["EO"] = salary.gross * DEDUCTION_RATES.get("EO") / 100;
  }

  if (yearlyPay >= 2500) {
    deductions["ALV"] = salary.gross * DEDUCTION_RATES.get("ALV") / 100;
    deductions["NBU"] = salary.gross * DEDUCTION_RATES.get("NBU") / 100;
  }

  if (yearlyPay >= 22680) {
    deductions["PK"] = salary.gross * DEDUCTION_RATES.get("PK") / 100;
  }

  const totalDeductions = Object.values(deductions).reduce((acc, val) => acc + val, 0);
  const net = salary.gross - totalDeductions;


  const result: Payslip = {
    salary: salary,
    deductions: new Map(),
    totalDeductions: 0.0,
    net: net,
  };
  return result;
}
