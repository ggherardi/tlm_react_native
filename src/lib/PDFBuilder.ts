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
    const userProfile = Utility.GetUserProfile();
    let travelledKmsRefund = 0;
    if (Utility.IsNotNullOrUndefined(event.refundStartingCity) && Utility.IsNotNullOrUndefined(event.refundArrivalCity) && event.totalTravelledKms > 0 && event.travelRefundForfait > 0) {
      travelledKmsRefund = event.totalTravelledKms * event.travelRefundForfait;
      const expense = new ExpenseReport();
      expense.amount = travelledKmsRefund;
      expense.name = "Rimborso chilometrico";
      expenses.push(expense);
    }
    let html = `
    <style>
      ${Bootstrap.style}
    
      .font-20 {
        font-size: 20px;
      }
      
      .bg-grey {
        background-color: #969696;
      }

      @media print {
        .pagebreak { page-break-before: always; }
      }      
    </style>
    <div>            
      <div class="w-100 py-5 bg-grey">
        <h1 class="text-center">NOTA SPESE</h1>
      </div>      

      <div class="text-right my-5">
        <span>Data:</span>
        <span>${Utility.FormatDateDDMMYYYY(new Date().toString())}</span>
      </div>

      <div class="my-5 row border border-dark p-3">
        <div class="col-6">
          <span>Gruppo:</span>
          <h2 class="font-weight-bold">${event.name}</h2>
        </div>        
        <div class="col-6">
          <span>Date evento:</span>
          <h2 class="font-weight-bold">${Utility.FormatDateDDMMYYYY(event.startDate)} - ${Utility.FormatDateDDMMYYYY(event.endDate)}</h2>
        </div>
      </div>

      <div class="my-5 row border-bottom">
        <div class="col-6">
          <span>Hostess/Tour Leader:</span>
          <span class="font-weight-bold">${userProfile.name} ${userProfile.surname}</span>
        </div>
        <div class="col-6">
          <span>Destinazione:</span>
          <span class="font-weight-bold">${event.city}</span>
        </div>
      </div>

      <div class="${travelledKmsRefund == 0 ? 'd-none' : ''} border-bottom my-5">
        <div>
          <span>Località di partenza:</span>
          <span class="font-weight-bold">${"Genova"}</span>
        </div>
        <div>
          <span>Località di arrivo:</span>
          <span class="font-weight-bold">${"Genova"}</span>
        </div>
        <div>
          <span>Totale KM percorsi:</span>
          <span class="font-weight-bold">${"500"}</span>
        </div>
      </div>

      <table class="table table-striped">
        <thead>          
          <tr>
            <th>Data</th>
            <th>Tipo di spesa</th>
            <th>Note</th>
            <th class="text-right">Costo</th>
          </tr>
        </thead>
        <tbody>              
    `;

    for (let i = 0; i < expenses.length; i++) {
      const expense = expenses[i];
      html += `
          <tr>
            <td>${expense.date ? Utility.FormatDateDDMMYYYY(expense.date) : ''}</td>
            <td>${expense.name}</td>
            <td>${expense.description}</td>
            <td class="text-right">${expense.amount.toFixed(2)} ${event.mainCurrency.symbol}</td>
          </tr>
      `;
    }

    html += `
          <tr>
            <td></td>
            <td></td>
            <td>
              <div class="py-3 font-20 font-weight-bold">
                TOTALE
              </div>
            </td>
            <td>
              <div class="bg-warning py-3 font-20 font-weight-bold text-right pr-2">${totalAmount?.toFixed(2)} ${event.mainCurrency.symbol}</div>
            </td>
          </tr>
        </tbody>
      </table>`

    html += `
    </div>
    `;

    // GG: I know this is slower, but it's much more readable this way
    for (let i = 0; i < expenses.length; i++) {
      let isEven = i % 2 == 0;
      const expense = expenses[i];
      html += `
      ${isEven ? '<div class="pagebreak"></div>' : ''}
      <div ${isEven ? '' : 'class="my-5"'}>
        <div class="mb-5">
          <span>Scontrino per la spesa:</span>
          <span>${expense.name} - ${Utility.FormatDateDDMMYYYY(expense.date)} - ${expense.amount} ${event.mainCurrency.symbol}</span>
        </div>
        <img src="file:///${expense.photoFilePath}">
      </div>          
      `;
    }
    return html;
  },
}