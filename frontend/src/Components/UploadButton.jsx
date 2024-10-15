import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import PropTypes from "prop-types";
import axios from "axios";

const UploadButton = ({ setTableRowData, tableRowData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [anonymizeDataField, setAnonymizeDataField] = useState("");
  const handleCancel = () => {
    setAnonymizeDataField("");
  };
  const handleAnonymizeDataFieldChange = (e) => {
    setAnonymizeDataField(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const anonymize = anonymizeDataField !== "Do not anonymize";
    try {
      console.log("uploading.....");
      setLoading(true);
      const response = await axios.post("/api/upload/single", {
        patientUUID: tableRowData.patientId,
        anonymize,
      });
      if (response.status === 200) {
        const data = response.data;
        console.log("tableRowData : ", tableRowData);
        console.log(data);
        const newTableRowData = {
          ...tableRowData,
          newStudyId: data.studyId,
          newStudyName: data.studyName,
          uploaded: true,
        };
        setTableRowData(newTableRowData);
      }
      console.log("uploaded 👍");
      setOpen(false);
      setLoading(false);
      setAnonymizeDataField("");
    } catch (error) {
      console.log("Upload failed !!");
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(
          `Something went wrong while uploading the study, patientId : ${patientId}`
        );
      }
    }
  };
  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <button className="bg-blue-400 text-white font-bold text-md px-2 py-1 rounded-lg hover:bg-blue-500 ">
            Upload
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="inset-0 fixed bg-black/50" />
          <Dialog.Content className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6">
            <div className="">
              {loading ? (
                <div className="p-8">
                  <h4 className="font-bold font-mono">Loading...</h4>
                </div>
              ) : (
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="anonymize"
                      className="text-md font-bold text-gray-800"
                    >
                      Type{" "}
                      <span className="text-red-500 font-mono bg-red-100 px-2">
                        Do not anonymize
                      </span>{" "}
                      to upload without anonymize
                    </label>
                    <br />
                    <br />
                    <input
                      id="anonymize"
                      type="text"
                      className="text-xl font-bold border-2 border-black/30 rounded-md text-gray-700 w-full"
                      name="anonymize"
                      value={anonymizeDataField}
                      onChange={handleAnonymizeDataFieldChange}
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      type="submit"
                      className="font-bold bg-green-500 py-1 px-3 rounded-md text-white hover:bg-green-600 duration-150"
                    >
                      Submit
                    </button>
                    <Dialog.Close
                      onClick={handleCancel}
                      className="font-bold bg-red-500 py-1 px-3 rounded-md text-white hover:bg-red-600 duration-150"
                    >
                      Cancel
                    </Dialog.Close>
                  </div>
                </form>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

UploadButton.propTypes = {
  tableRowData: PropTypes.any.isRequired,
  setTableRowData: PropTypes.any.isRequired,
};

export default UploadButton;
