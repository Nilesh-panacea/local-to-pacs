import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

const UploadBatchButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <button className="text-xl font-bold bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 duration-150">
          Upload Batch
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6">
          <div className="">
            <form className="flex flex-col gap-2">
              <div>
                <label htmlFor="batchSize" className="text-3xl font-bold text-gray-800">
                  Enter Batch Size :{" "}
                </label>
                <input
                  id="batchSize"
                  type="number"
                  className="text-xl font-bold border-2 border-black/30 rounded-md text-gray-700"
                  name="batchSize"
                  max={20}
                  min={1}
                  required
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
                  className="font-bold bg-red-500 py-1 px-3 rounded-md text-white hover:bg-red-600 duration-150"
                >
                  Cancel
                </Dialog.Close>

              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UploadBatchButton;
