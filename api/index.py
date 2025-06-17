from flask import Flask, request, jsonify
import pandas as pd
import joblib
import os

app = Flask(__name__)
CORS(app)
# Load model and transformers
MODEL_DIR = os.path.join(os.path.dirname(__file__), '../ai')
model_path = os.path.join(MODEL_DIR, 'decision_tree_model.pkl')
le_path = os.path.join(MODEL_DIR, 'label_encoder.pkl')
kbest_path = os.path.join(MODEL_DIR, 'selectkbest_transformer.pkl')

loaded_model = joblib.load(model_path)
le = joblib.load(le_path)
select_kbest = joblib.load(kbest_path)

# List of all columns in the dataset (order matters)
ALL_COLUMNS = [
    'Administrative', 'Administrative_Duration', 'Informational', 'Informational_Duration',
    'ProductRelated', 'ProductRelated_Duration', 'BounceRates', 'ExitRates', 'PageValues',
    'SpecialDay', 'Month', 'OperatingSystems', 'Browser', 'Region', 'TrafficType',
    'VisitorType', 'Weekend'
]

@app.route("/api/python", methods=["POST"])
def predict():
    data = request.get_json()
    # Ensure all columns are present
    input_data = {col: [data.get(col)] for col in ALL_COLUMNS}
    manual_df = pd.DataFrame(input_data)

    # Label encode categorical columns
    for col in ['Month', 'VisitorType', 'Weekend']:
        manual_df[col] = le.transform(manual_df[col])

    # Apply SelectKBest transformer
    manual_df_selected = select_kbest.transform(manual_df[ALL_COLUMNS])

    # Predict
    manual_prediction = loaded_model.predict(manual_df_selected)
    manual_prediction_proba = loaded_model.predict_proba(manual_df_selected)

    return jsonify({
        "prediction": int(manual_prediction[0]),
        "probabilities": manual_prediction_proba[0].tolist()
    })
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
