import { Utility } from './Utility';
import { BusinessEvent } from './models/BusinessEvent';
import { ExpenseReport } from './models/ExpenseReport';

export const PDFBuilder = {
  generatePdf: (event: BusinessEvent, expenses: ExpenseReport[], totalAmount: Number | undefined): string => {
    let html = `
    <div>
      <h1>${event.name} (${Utility.FormatDateDDMMYYYY(event.startDate)} - ${Utility.FormatDateDDMMYYYY(event.endDate)})</h1>
      <table>
        <caption>
          Nota spese
        </caption>
        <thead>          
          <tr>
            <th>Data</th>
            <th>Tipo di spesa</th>
            <th>Costo</th>
          </tr>
        </thead>
        <tbody>              
    `;

    for (let i = 0; i < expenses.length; i++) {
      const expense = expenses[i];
      html += `
          <tr>
            <td>${Utility.FormatDateDDMMYYYY(expense.date)}</td>
            <td>${expense.name}</td>
            <td>${expense.amount} ${event.mainCurrency.symbol}</td>
          </tr>
      `;
    }

    html += `
          <tr>
            <td>Totale:</td>
            <td></td>
            <td>${totalAmount}</td>
          </tr>
        </tbody>
      </table>`

    html += `
    </div>`;
    return html;
  }
}