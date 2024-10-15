import path from "path";
import fs from "fs";
import Study from "../models/study.model";
const filePath = path.join(__dirname, "../Logs/bleedCounter.json");
const batchCounterPath = path.join(__dirname, "../Logs/batchCounter.json");
const readJSONFromFile = async (): Promise<{ [key: string]: number }> => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return {};
  }
};

const writeJSONToFile = async (data: { [key: string]: number }) => {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonString, "utf-8");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error writing JSON file:", error);
      throw new Error(error.message);
    } else throw new Error("Error writing JSON file:");
  }
};

export const getNewName = async (bleedSubCategory: string) => {
  const counters = await readJSONFromFile();
  if (bleedSubCategory) {
    const count = counters[bleedSubCategory as string];
    if (bleedSubCategory === "") return `Anonymized_${count}`;
    return `${bleedSubCategory}_${count}`;
  }
  return `Anonymized_${counters[""]}`;
};

export const updateCounter = async (bleedSubCategory: string) => {
  const counters = await readJSONFromFile();
  counters[bleedSubCategory] = (counters[bleedSubCategory] || 0) + 1;
  // console.log(filePath);
  await writeJSONToFile(counters);
  console.log(
    `Updated counter for ${bleedSubCategory}: ${counters[bleedSubCategory]}`
  );
};

export const getBatchName = async () => {
  try {
    const batchNo = fs.readFileSync(batchCounterPath, "utf-8");
    const batchJson = JSON.parse(batchNo);
    const batchName = `Batch_${batchJson.batchNo}`;
    console.log("batchName : ", batchName);
    return batchName;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else
      throw new Error(`failed to get batch no. from file ${batchCounterPath}`);
  }
};

export const incrementBatchNo = async () => {
  try {
    const batchNo = fs.readFileSync(batchCounterPath, "utf-8");
    const batchJson = JSON.parse(batchNo);
    batchJson.batchNo = batchJson.batchNo + 1;
    const jsonString = JSON.stringify(batchJson, null, 2);
    fs.writeFileSync(batchCounterPath, jsonString, "utf-8");
    console.log("batch no. incremented ");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else
      throw new Error(`failed to increment batch no. from file ${batchCounterPath}`);
  }
};
