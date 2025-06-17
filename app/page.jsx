import Image from 'next/image'

export default function Home() {
  // Example stats, replace with your real model stats
  const modelStats = {
    accuracy: 0.87,
    precision: 0.85,
    recall: 0.83,
    f1: 0.84,
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/next.svg"
            alt="AI Logo"
            width={80}
            height={80}
            className="mb-4"
          />
          <h1 className="text-3xl font-bold mb-2 text-center">Online Shoppers Purchasing Intention AI</h1>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            This project uses machine learning to predict whether an online shopper will purchase or not, based on their session behavior.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Dataset</h2>
          <p className="text-gray-700 dark:text-gray-200">
            <a
              href="https://archive.ics.uci.edu/static/public/468/online+shoppers+purchasing+intention+dataset.zip"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Online Shoppers Purchasing Intention Dataset
            </a>
            <br />
            <span>
              The dataset consists of user sessions on an e-commerce website, with features such as page values, bounce rates, exit rates, and more. The target is whether the user made a purchase.
            </span>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Model Statistics</h2>
          <ul className="text-gray-700 dark:text-gray-200">
            <li>Accuracy: <span className="font-mono">{(modelStats.accuracy * 100).toFixed(2)}%</span></li>
            <li>Precision: <span className="font-mono">{(modelStats.precision * 100).toFixed(2)}%</span></li>
            <li>Recall: <span className="font-mono">{(modelStats.recall * 100).toFixed(2)}%</span></li>
            <li>F1 Score: <span className="font-mono">{(modelStats.f1 * 100).toFixed(2)}%</span></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">About the AI Model</h2>
          <p className="text-gray-700 dark:text-gray-200">
            The model was trained using supervised learning algorithms (e.g., Random Forest, Logistic Regression). It helps e-commerce businesses understand user behavior and improve conversion rates.
          </p>
        </section>
      </div>
    </main>
  );
}
