import React from 'react';

interface Column {
  key: string;
  header: string;
  render?: (row: any) => React.ReactNode; // Add a render function for custom rendering
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
}

const TheTable: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto text-gray-500">
      <div className="rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium uppercase tracking-wider text-black"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr className='hover:bg-gray-200' key={rowIndex}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 text-sm"
                  >
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TheTable;