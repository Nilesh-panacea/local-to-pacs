import pandas as pd
import os

# Step 1: Load the master CSV
master_csv_path = r'C:\Users\niles\Desktop\Office Files\local to pacs utility\initialFiles\Final_Bleed.csv'
df_master = pd.read_csv(master_csv_path)

# Step 2: Get the list of patient IDs from folders and convert them to numeric
folder_path = r'C:\Users\niles\Desktop\Office Files\local to pacs utility\initialFiles'
patient_ids = [folder for folder in os.listdir(folder_path) if os.path.isdir(os.path.join(folder_path, folder))]

# Convert to a pandas Series for easy manipulation
patient_ids_series = pd.Series(patient_ids)

# Convert to numeric and drop NaN values
patient_ids_numeric = pd.to_numeric(patient_ids_series, errors='coerce').dropna().astype(int).tolist()

# Step 3: Filter the DataFrame, ensuring the Patient ID is numeric
df_subset = df_master[df_master['Patient ID (UHID)'].isin(patient_ids_numeric)]

# Step 4: Save the subset to a new CSV
subset_csv_path = r'C:\Users\niles\Desktop\Office Files\local to pacs utility\initialFiles\studies.csv'
df_subset.to_csv(subset_csv_path, index=False)
