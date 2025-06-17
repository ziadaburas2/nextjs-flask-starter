import React from 'react';

const columns = [
  { name: 'Administrative', description: 'Number of pages visited by the user about account management.' },
  { name: 'Administrative_Duration', description: 'Total time spent on administrative pages.' },
  { name: 'Informational', description: 'Number of informational pages visited by the user.' },
  { name: 'Informational_Duration', description: 'Total time spent on informational pages.' },
  { name: 'ProductRelated', description: 'Number of product-related pages visited by the user.' },
  { name: 'ProductRelated_Duration', description: 'Total time spent on product-related pages.' },
  { name: 'BounceRates', description: 'Average bounce rate value of the pages visited by the user.' },
  { name: 'ExitRates', description: 'Average exit rate value of the pages visited by the user.' },
  { name: 'PageValues', description: 'Average value for a web page that a user visited before completing an e-commerce transaction.' },
  { name: 'SpecialDay', description: 'Closeness of the site visiting time to a special day (e.g., Mother’s Day, Valentine’s Day).' },
  { name: 'Month', description: 'Month of the year.' },
  { name: 'OperatingSystems', description: 'Operating system used by the user.' },
  { name: 'Browser', description: 'Browser used by the user.' },
  { name: 'Region', description: 'Geographical region from which the session has been started.' },
  { name: 'TrafficType', description: 'Type of traffic source.' },
  { name: 'VisitorType', description: 'Type of visitor: Returning_Visitor, New_Visitor, or Other.' },
  { name: 'Weekend', description: 'Indicates if the visit was on the weekend.' },
  { name: 'Revenue', description: 'Class label: True if the user made a purchase, False otherwise.' },
];

export default function DatasetPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Online Shoppers Purchasing Intention Dataset</h1>
        <p className="text-gray-700 dark:text-gray-200 mb-6 text-center">
          This dataset consists of user sessions on an e-commerce website, with features such as page values, bounce rates, exit rates, and more. The target is whether the user made a purchase. It is commonly used for predicting purchasing intention using machine learning models.
        </p>
        <div className="mb-6 text-center">
          <a
            href="https://archive.ics.uci.edu/static/public/468/online+shoppers+purchasing+intention+dataset.zip"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Download Dataset
          </a>
        </div>
        <h2 className="text-xl font-semibold mb-2">Columns Description</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 dark:border-gray-700 text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left">Column</th>
                <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {columns.map((col) => (
                <tr key={col.name} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900">
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 font-mono">{col.name}</td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{col.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
