import { body } from "express-validator";

export const batchTransferValidation = [
    body("resources", "resources must be an array of studyIds, eg: 'e2ef6cae-b3b5b5a3-35f018f5-2eae5912-a4b25825' ")
        .isArray().custom((value) => {
            value.forEach((item: any) => {
                if (typeof item !== 'string') {
                    throw new Error('Each item in the array must be a string');
                }
            });
            return true; // Validated successfully
        }),
    body("aet", "aet(modatily) must be preesnt").isString(),
]