import { Utility } from './Utility';
import { Bootstrap } from './Bootstrap';
import { BusinessEvent } from './models/BusinessEvent';
import { ExpenseReport } from './models/ExpenseReport';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

export const PDFBuilder = {
  createExpensesPdfAsync: async (event: BusinessEvent, directoryName: string, fileName: string, reports: ExpenseReport[] = []): Promise<RNHTMLtoPDF.Pdf> => {
    return new Promise(async (resolve, reject) => {
      const directory = `Documents/${directoryName}`
      const options = {
        html: PDFBuilder.generateHtml(event, reports, Utility.CalculateTotalAmount(reports, 'amount')),
        fileName: fileName,
        directory: directory,
      };

      let file = await RNHTMLtoPDF.convert(options);
      if (file) {
        resolve(file);
      } else {
        reject(undefined);
      }
    });
  },

  generateHtml: (event: BusinessEvent, expenses: ExpenseReport[], totalAmount: Number | undefined): string => {
    let html = `
    <style>
      .mb-5 {
        margin-bottom: 30px;
      }

      ${Bootstrap.style}

      @media print {
        .pagebreak { page-break-before: always; }
      }      
    </style>
    <div>
      <h1>${event.name} (${Utility.FormatDateDDMMYYYY(event.startDate)} - ${Utility.FormatDateDDMMYYYY(event.endDate)})</h1>
      <table class="table table-striped">
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
    </div>
    <div class="pagebreak"></div>
    `;

    // GG: I know this is slower, but it's much more readable this way
    for (let i = 0; i < expenses.length; i++) {
      const expense = expenses[i];
      html += `
      // <div>
      //   <img src="file:///${expense.photoFilePath}">
      // </div>          
      // `;
      html += `
      <div class="pagebreak"></div>
      <div>
        <div class="mb-5">${expense.name} - ${Utility.FormatDateDDMMYYYYhhmm(expense.date)} - ${expense.amount} ${event.mainCurrency.symbol}</div>
        <img src="file:///${expense.photoFilePath}">
      </div>          
      `;
    }
    return html;
  },
}