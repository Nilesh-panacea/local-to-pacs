import pandas as pd
import json

def load_excel_patient_data(excel_file, sheet_name="in"):
    """ Load patient data from an Excel file and keep all columns. """
    df = pd.read_excel(excel_file, sheet_name=sheet_name)

    # Print column names to debug
    print("Excel Columns:", df.columns.tolist())

    # Ensure all column names are strings
    df.columns = df.columns.map(str)

    # Fixed column name for Patient ID
    col_name = "Patient ID (UHID)"

    if col_name not in df.columns:
        raise ValueError(f"Column '{col_name}' not found in the Excel sheet.")

    df["Patient_ID"] = df[col_name].astype(str).str.split('.').str[0]  # Standardize Patient ID as string

    return df, col_name



def load_pacs_patient_ids(json_file):
    """ Load patient IDs from PACS API response (JSON file). """
    with open(json_file, "r", encoding="utf-8") as f:
        pacs_data = json.load(f)

    # Extract Patient IDs, checking for missing fields
    pacs_patient_ids = {
        str(patient["00100020"]["Value"][0]) for patient in pacs_data if "00100020" in patient and "Value" in patient["00100020"]
    }
    print("pacs_patient_ids : ", pacs_patient_ids)
    return pacs_patient_ids


def compare_patients(excel_df, col_name, pacs_patient_ids, output_file):
    """Compare Excel data with PACS data and save results to a CSV file."""
    
    print("🔹 Starting patient comparison...")

    # Print total patients in Excel and PACS
    print(f"📌 Total patients in Excel file: {len(excel_df)}")
    print(f"📌 Total patients in PACS JSON: {len(pacs_patient_ids)}")

    # Create a new column to store the presence status
    def get_status(patient_id):
        if patient_id == 101769301 :
            print(pacs_patient_ids)  # Print PACS patient IDs for debugging
        
        return "Present in Both" if patient_id in pacs_patient_ids else "Only in Sheet"


    print("🔍 Identifying patients present in both Excel and PACS...")
    print(excel_df["Patient_ID"].tail())  # Print the first few entries
    print(excel_df["Patient_ID"].dtype)   # Print the data type of the column

    excel_df["Status"] = excel_df["Patient_ID"].apply(get_status)

    # Print counts
    present_in_both_count = (excel_df["Status"] == "Present in Both").sum()
    only_in_sheet_count = (excel_df["Status"] == "Only in Sheet").sum()

    print(f"✅ Patients present in both: {present_in_both_count}")
    print(f"✅ Patients only in Excel: {only_in_sheet_count}")

    # Identify patients only in PACS
    print("🔍 Identifying patients present only in PACS...")
    pacs_only_ids = list(pacs_patient_ids - set(excel_df["Patient_ID"]))
    pacs_only = pd.DataFrame({"Patient_ID": pacs_only_ids, "Status": "Only in PACS"})

    print(f"✅ Patients only in PACS: {len(pacs_only)}")

    # Combine both datasets
    final_df = pd.concat([excel_df, pacs_only], ignore_index=True)

    # Save to CSV
    final_df.to_csv(output_file, index=False)
    print(f"✅ Comparison saved to: {output_file}")

    print("🎉 Patient comparison completed successfully!\n")


def main():
    api_json_file = "api_response.json"  # Replace with actual API response JSON file
    excel_file = "C:\\Users\\Nilesh Gautam\\Desktop\\Office files\\files\\Final_Bleed 1200 completed records.xlsx"  # Replace with actual Excel file
    output_file = "comparison_result1.csv"  # ✅ Corrected variable name

    # Load data
    excel_df, col_name = load_excel_patient_data(excel_file, sheet_name="in")  # ✅ Pass correct sheet name
    pacs_patient_ids = load_pacs_patient_ids(api_json_file)
    print(excel_df)

    # Compare and save results
    compare_patients(excel_df, col_name, pacs_patient_ids, output_file)


if __name__ == "__main__":
    main()
