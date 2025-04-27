import { calculatePayslip } from "./payroll";

describe("calculate Payslip", () => {
    it("16 year old with 700 CHF a month", () => {
        const salary: Salary = {
            born: "2009-05-04",
            payday: "2025-04-01",
            gross: 700
        };


        const Payslip = calculatePayslip(salary);

        expect(Payslip.totalDeductions).toBe(0);
        expect(Payslip.net).toBe(700);
    });
});

it("18 year old with 1200 CHF a month", () => {
    const salary: Salary = {
        born: "2007-05-04",
        payday: "2025-04-01",
        gross: 1200
    };


    const Payslip = calculatePayslip(salary);

    expect(Payslip.totalDeductions).toBeGreaterThan(0);
    expect(Payslip.net).toBeLessThan(1200);
});

it("21 year old with 5900 CHF a month", () => {
    const salary: Salary = {
        born: "2004-05-04",
        payday: "2025-04-01",
        gross: 5900
    };


    const Payslip = calculatePayslip(salary);

    expect(Payslip.totalDeductions).toBeGreaterThan(0);
    expect(Payslip.net).toBeLessThan(5900);
});