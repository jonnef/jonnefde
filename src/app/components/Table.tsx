import React, { useEffect, useState } from 'react'
import DeleteButton from './buttons/Delete';
import translate from './services/translate';

function TableComponent({data}:{data: any[]}) {

  const allowedColumns = ["firstName", "lastName", "balance", "nickName"]
  const [translated, setTranslations] = useState([])
  useEffect(() => {
    async function fetchTranslations() {
      // Hier wird die asynchrone translate-Funktion aufgerufen.
      // Angenommen, translate ist eine Funktion, die ein Übersetzungsobjekt zurückgibt.
      const translationsData = await(
        headers.map(async (header) => {
          // Beispiel: Wir nehmen an, dass translate(header) eine asynchrone Funktion ist
          const translation = await translate(header)
          return { header, translation }
        })
      );
      setTranslations(translationsData)
    }

  if(!data || data.length===0)return <p>Keine Daten verfügbar</p>

    const headers = Object.keys(data[0]);

    const formatDate = (date: string) => {
      const dateObj = new Date(date)
      const day = String(dateObj.getDate()).padStart(2, '0')
      const month = String(dateObj.getMonth() + 1).padStart(2, '0')
      const year = dateObj.getFullYear()
      return `${day}.${month}.${year}`; // Format: DD.MM.YYYY
    }
  return (
    <div>
      <div className="table zebra">
        <table>
          <thead>
            <tr className='bg-grey-200'>
              {headers
              .filter((header) => allowedColumns.includes(header))
              .map((header) => (
                <th key={header}>
                  {translate(header)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((rowData, rowIndex) => (
               <tr key={rowIndex} className='hover:bg-base-300'>
                  {headers
                  .filter((header) => allowedColumns.includes(header))
                  .map((header) => (
                    <th key={header}>
                      {header === "birthDate" ? formatDate(rowData[header])
                      : header === 'balance' ? rowData[header].toLocaleString("de-DE", {style: "currency", currency: "EUR"})
                      : rowData[header]}
                    </th>
                  ))}
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableComponent