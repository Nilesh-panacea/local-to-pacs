export const headCellsDB = [ // move this in utils
    {
      id: 'patientId',
      numeric: true,
      disablePadding: false,
      label: 'Patient Id',
    },
    {
      id: 'newStudyName',
      numeric: false,
      disablePadding: false,
      label: 'New Study Name',
    },
    {
      id: 'bleed',
      numeric: false,
      disablePadding: false,
      label: 'Bleed',
    },
    {
      id: 'bleedSubCategory',
      numeric: false,
      disablePadding: false,
      label: 'Bleed Sub Catagory',
    },
    {
      id: 'uploaded',
      numeric: false,
      disablePadding: false,
      label: 'Uploaded',
    },
    {
      id: "presentLocaly",
      numeric: false,
      disablePadding: false,
      label: "Present Localy",
    },
  ];

export const headCellsPacs = [
    {
        id: "ID",
        label: "Job ID",
        align: "left",
        type: "id",
    },
    {
        id: "CreationTime",
        label: "Date",
        align: "left",
        type: "date",
    },
    {
        id: "State",
        label: "State",
        align: "right",
        type: "state",
    },
];