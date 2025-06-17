'use client';

import React, { useState } from 'react';

const columns = [
	{ name: 'Administrative', type: 'number', default: 0 },
	{ name: 'Administrative_Duration', type: 'number', default: 0 },
	{ name: 'Informational', type: 'number', default: 0 },
	{ name: 'Informational_Duration', type: 'number', default: 0 },
	{ name: 'ProductRelated', type: 'number', default: 1 },
	{ name: 'ProductRelated_Duration', type: 'number', default: 100 },
	{ name: 'BounceRates', type: 'number', step: 'any', default: 0.0 },
	{ name: 'ExitRates', type: 'number', step: 'any', default: 0.0 },
	{ name: 'PageValues', type: 'number', step: 'any', default: 0.0 },
	{ name: 'SpecialDay', type: 'number', step: 'any', default: 0.0 },
	{ name: 'Month', type: 'text', default: 'Feb' },
	{ name: 'OperatingSystems', type: 'number', default: 1 },
	{ name: 'Browser', type: 'number', default: 1 },
	{ name: 'Region', type: 'number', default: 1 },
	{ name: 'TrafficType', type: 'number', default: 1 },
	{ name: 'VisitorType', type: 'text', default: 'New_Visitor' },
	{ name: 'Weekend', type: 'text', default: 'False' },
];

export default function ModelPage() {
	const [form, setForm] = useState(() => Object.fromEntries(columns.map(col => [col.name, col.default])));
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setResult(null);
		try {
			const res = await fetch('/api/python', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			});
			if (!res.ok) throw new Error('API error');
			const data = await res.json();
			setResult(data);
		} catch (err) {
			setError('Failed to get prediction.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
			<div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
				<h1 className="text-2xl font-bold mb-4 text-center">Try the AI Model</h1>
				<form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					{columns.map(col => (
						<div key={col.name} className="flex flex-col">
							<label className="font-semibold mb-1">{col.name}</label>
							<input
								name={col.name}
								type={col.type}
								step={col.step || undefined}
								value={form[col.name]}
								onChange={handleChange}
								className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
								required
							/>
						</div>
					))}
					<div className="md:col-span-2 flex justify-center mt-4">
						<button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
							{loading ? 'Predicting...' : 'Predict'}
						</button>
					</div>
				</form>
				{error && <div className="text-red-600 text-center">{error}</div>}
				{result && (
					<div className="mt-4 text-center">
						<div className="font-semibold">Prediction: <span className="font-mono">{result.prediction}</span></div>
						<div>Probabilities: <span className="font-mono">{JSON.stringify(result.probabilities)}</span></div>
					</div>
				)}
			</div>
			<div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
				<h2 className="text-xl font-bold mb-2">How to Use the Model in Python</h2>
				<p className="mb-2 text-gray-700 dark:text-gray-200">You can use the model in your own Python code as follows:</p>
				<pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded text-xs overflow-x-auto">
{`import joblib
import pandas as pd

# Load model and transformers
loaded_model = joblib.load('decision_tree_model.pkl')
le = joblib.load('label_encoder.pkl')
select_kbest = joblib.load('selectkbest_transformer.pkl')

# Prepare your input data (replace with your values)
data = {
    'Administrative': [0],
    'Administrative_Duration': [0],
    'Informational': [0],
    'Informational_Duration': [0],
    'ProductRelated': [1],
    'ProductRelated_Duration': [100],
    'BounceRates': [0.0],
    'ExitRates': [0.0],
    'PageValues': [0.0],
    'SpecialDay': [0.0],
    'Month': ['Feb'],
    'OperatingSystems': [1],
    'Browser': [1],
    'Region': [1],
    'TrafficType': [1],
    'VisitorType': ['New_Visitor'],
    'Weekend': ['False']
}
df = pd.DataFrame(data)

# Label encode categorical columns
for col in ['Month', 'VisitorType', 'Weekend']:
    df[col] = le.transform(df[col])

# Select features
X_selected = select_kbest.transform(df)

# Predict
prediction = loaded_model.predict(X_selected)
proba = loaded_model.predict_proba(X_selected)
print('Prediction:', prediction)
print('Probabilities:', proba)
`}
				</pre>
			</div>
		</main>
	);
}
