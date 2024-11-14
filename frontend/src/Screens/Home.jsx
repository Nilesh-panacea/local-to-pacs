import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DbStudies from '../Components/DbStudies';
// import InputFileUpload from "../Components/UploadCSVButton"
import CountdownTimer from "../Components/GetDataFromDatabase"
import GetNonAnotatedData from "../Components/GetNonAnotatedData"
import GetAnotatedData from "../Components/GetAnotatedData"
import TableWithDownload from "../Components/DownloadFromOrthancTable"
import InputFileUpload from '../Components/DownloadFromOrthanc'
import MultiSelectTable from '../Components/MultiSelectDownloadTable';
import WebSocketComponent from '../Components/SimpleWebSocket';
import BasicSelect from '../Components/DragDownComponent';
import BasicTextFields from '../Components/BasicTextField';
import BasicButtons from '../Components/BasicSubmitButton';
import ThreeSectionLayout from '../Components/DownloadFromHospital';
import CollapsibleTable from '../Components/CurrentJobs2';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const data = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Charlie', age: 35 }
  ];

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Age', accessor: 'age' }
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {/* <Tab label="DB Studies" {...a11yProps(0)} />
          <Tab label="Pacs Studies" {...a11yProps(1)} />
          <Tab label="Jobs" {...a11yProps(2)} />
          <Tab label="Non Anotated Data" {...a11yProps(3)} />
          <Tab label="Anotated Data" {...a11yProps(4)} /> */}
          <Tab label="Download From Orthanc" {...a11yProps(5)} />
          <Tab label="Multi select download" {...a11yProps(6)} />
          <Tab label="Sample" {...a11yProps(7)} />
          <Tab label="CurrentJobs" {...a11yProps(8)} />
        </Tabs>
      </Box>
      {/* <CustomTabPanel value={value} index={0}>
        <DbStudies/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <InputFileUpload/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CountdownTimer/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <GetNonAnotatedData/>
      </CustomTabPanel> */}
      {/* <CustomTabPanel value={value} index={0}>
        <GetAnotatedData/>
      </CustomTabPanel> */}
      <CustomTabPanel value={value} index={0}>
        <InputFileUpload/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MultiSelectTable data={data} columns={columns} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ThreeSectionLayout />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <CollapsibleTable />
      </CustomTabPanel>
    </Box>
  );
}
