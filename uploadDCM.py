import os
import sys
from pydicom import dcmread
from pynetdicom import AE, StoragePresentationContexts

def get_all_dicom_files(directory):
    """ Recursively find all .dcm files in a directory. """
    dicom_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".dcm"):
                dicom_files.append(os.path.join(root, file))
    return dicom_files

def upload_dicom_files(directory_path, ae_title, server_ip, server_port):
    """ Upload DICOM files from a directory to a DICOM server (dcm4chee). """
    
    if not os.path.isdir(directory_path):
        print(f"❌ Directory not found: {directory_path}")
        return

    # Initialize the Application Entity
    ae = AE()

    # Request storage presentation contexts
    ae.requested_contexts = StoragePresentationContexts

    # Associate with DICOM server
    assoc = ae.associate(server_ip, server_port, ae_title=ae_title)

    if not assoc.is_established:
        print("❌ Failed to establish association with the DICOM server.")
        return

    print("✅ Association established with the server.")
    
    # Get all DICOM files from the directory
    dicom_files = get_all_dicom_files(directory_path)

    if not dicom_files:
        print("⚠️ No DICOM files found in the directory.")
        assoc.release()
        return

    # Upload each DICOM file
    for file in dicom_files:
        try:
            ds = dcmread(file)
            status = assoc.send_c_store(ds)

            if status and status.Status in [0x0000, 0xB000]:
                print(f"✅ Successfully uploaded: {file}")
            else:
                print(f"❌ Failed to upload {file}. Status: {status}")
        except Exception as e:
            print(f"⚠️ Error uploading {file}: {e}")

    # Release the association
    assoc.release()
    print("🔄 Association released.")

# ✅ Example Usage
if __name__ == "__main__":
    directory = "C:\\Users\\Nilesh Gautam\\Desktop\\Office files\\Nilesh rishabh pacs tool\\local-to-pacs\\initialFiles\\101769301"  # Change this to your DICOM folder
    ae_title = "DCM4CHEE"
    server_ip = "localhost"
    server_port = 11112

    upload_dicom_files(directory, ae_title, server_ip, server_port)
