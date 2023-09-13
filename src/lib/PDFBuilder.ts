import { Utility } from './Utility';
import { BusinessEvent } from './models/BusinessEvent';
import { ExpenseReport } from './models/ExpenseReport';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

export const PDFBuilder = {
  createDirectoryAndPdf: async (event: BusinessEvent, directoryName: string, fileName: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      const directory = `Documents/${directoryName}`
      const options = {
        html: PDFBuilder.generateHtml(event, [] as ExpenseReport[], 0),
        fileName: fileName,
        directory: directory,
      };

      let file = await RNHTMLtoPDF.convert(options);
      if (file) {
        const filePath = file.filePath as string;
        event.fullFilePath = filePath;
        event.directoryPath = filePath.substring(0, filePath.lastIndexOf("/"));
        resolve(true);
      } else {
        reject(false);
      }
    });
  },

  generateHtml: (event: BusinessEvent, expenses: ExpenseReport[], totalAmount: Number | undefined): string => {
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