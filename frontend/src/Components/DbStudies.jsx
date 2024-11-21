import { useEffect, useState } from 'react';
import { getDBStudies } from '../services/api';
import CustomTableWithCheckbox from './CustomTables/CustomTableWithCheckbox';
import CheckedOptionComponentForDBStudies from './CustomTables/CustomTablesComponents/CheckedOptionComponentForDBStudies';
import UncheckedOptionComponentForDBStudies from './CustomTables/CustomTablesComponents/UncheckedOptionComponentForDBStudies';
import { headCellsDB } from '../utils/tableHeadersData';

const DbStudies = () => {
  const [studies, setStudies] = useState([]);
  const [filters, setFilters] = useState({
    // bleed: false,
    // uploaded: false,
    // presentLocaly: false,
    // bleedSubCategory: '',
  });
  const [selectedStudies, setSelectedStudies] = useState([]);
  
  useEffect(() => {
    const getStudyData = async () => {
      const response = await getDBStudies(filters);
      if (response.status === 200) {
        console.log("test ---->>> ", response.data);
        setStudies(response.data);
      }
    }
    getStudyData();
  }, [filters])
  return (
    <CustomTableWithCheckbox 
    data={studies} 
    headCells={headCellsDB} 
    defaultOrderBy={"uploaded"} 
    itemsPerPage={10} 
    title={"DB Studies"} 
    checkedOptionComponent = {<CheckedOptionComponentForDBStudies selectedStudies = {selectedStudies}/>}
    uncheckedOptionComponent = {<UncheckedOptionComponentForDBStudies setFilters={setFilters}/>}
    setSelectedStudies = {setSelectedStudies}
    />
  )
}

export default DbStudies;
