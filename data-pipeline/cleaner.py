import pandas as pd
from pymongo import MongoClient
import os
from dotenv import load_dotenv
# Configuration for Database Connection
load_dotenv()

DB_URI = os.getenv('MONGO_URI')
DB_NAME = 'finbud_db'
COLLECTION_NAME = 'stocks'
INPUT_FILE = 'faang_stock_prices.csv'

def run_pipeline():
    if not DB_URI:
        print("❌ Error: 'MONGO_URI' not found in .env file.")
        print("👉 Please create a .env file and add your connection string.")
        return
    print(f"🔄 Connecting to MongoDB...")

    try:
        client = MongoClient(DB_URI)
        db = client[DB_NAME]
        collection = db[COLLECTION_NAME]

        client.admin.command('ping')
        print("✅ Database connection established successfully.")

        if not os.path.exists(INPUT_FILE):
            print(f"❌ Error: Input file '{INPUT_FILE}' not found.")
            return

        print("🔄 Reading and processing CSV data...")
        df = pd.read_csv(INPUT_FILE)

        df['Date'] = pd.to_datetime(df['Date'])
        df = df.sort_values(by=['Ticker', 'Date'])
        df['Date'] = df['Date'].dt.strftime('%Y-%m-%d')
        numeric_cols = df.select_dtypes(include=['float64']).columns
        df[numeric_cols] = df[numeric_cols].round(2)

        records = df.to_dict(orient='records')
        print(f"📊 Ready to insert {len(records)} records.")

        print("🔄 Clearing old data...")
        collection.delete_many({})

        print("🚀 Uploading new data...")
        collection.insert_many(records)

        print(f"✅ Success! Data uploaded to your secure MongoDB.")

    except Exception as e:
        print(f"❌ Connection Failed: {e}")

if __name__ == "__main__":
    run_pipeline()