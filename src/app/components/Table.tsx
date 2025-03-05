import React, { useEffect, useState } from 'react'
import DeleteButton from './buttons/Delete';

function TableComponent({data}:{data: any[]}) {

  if(!data || data.length===0)return <p>Keine Daten verfügbar</p>;

    const headers = Object.keys(data[0]);

    const formatDate = (date: string) => {
      const dateObj = new Date(date);
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const year = dateObj.getFullYear();
      return `${day}.${month}.${year}`; // Format: DD.MM.YYYY
    };
  return (
    <div>
      <div className="table zebra">
        <table>
          <thead>
            <tr className='bg-grey-200'>
              {headers.map((header) => (
                <th key={header}>
                  {header.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((rowData, rowIndex) => (
               <tr key={rowIndex} className='hover:bg-base-300'>
                  {headers.map((header) => (
                    <th key={header}>
                      {header === "birthDate" ? formatDate(rowData[header]) : rowData[header]}
                    </th>
                  ))}
                    <th><DeleteButton id={rowData.id}/></th>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableComponent
