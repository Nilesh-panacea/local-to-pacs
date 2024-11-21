import { useEffect, useState } from 'react'
import CustomTableWithCheckbox from './CustomTables/CustomTableWithCheckbox'
import { getPacsStudies } from '../services/api';
import CheckedOptionComponentForPacsStudies from './CustomTables/CustomTablesComponents/CheckedOptionComponentForPacsStudies';

const PacsStudies = () => {
    const [studies, setStudies] = useState([]);
    const [selectedStudies, setSelectedStudies] = useState([]);
    useEffect(()=>{
        const getStudyData = async()=>{
            const response = await getPacsStudies();
            if(response.status === 200){
                console.log("test pacs study data : ",response.data);
                const fetchedStudies = response?.data.map((study)=>{
                  const modifiedStudy = {
                    ...study, 
                    patientName: study?.PatientMainDicomTags?.PatientName
                  }
                  modifiedStudy.transferred =  modifiedStudy?.transferredToPacs.length > 0 ? true : false;
                  return modifiedStudy;
                }); 
                console.log("fetched Studies : ", fetchedStudies);
                setStudies(fetchedStudies);
              }

        }
        getStudyData();
    },[])
    const headCells = [
      {
        id: 'patientName',
        numeric: false,
        disablePadding: false,
        label: 'Patient Name',
      },
      {
        id: 'ID',
        numeric: false,
        disablePadding: false,
        label: 'ID',
      },
      {
        id: '_id',
        numeric: false,
        disablePadding: false,
        label: '_ID',
      },
      {
        id: 'transferred',
        numeric: false,
        disablePadding: false,
        label: 'Transferred',
      },
    ];
  return (
    <div>
        <CustomTableWithCheckbox 
        data = {studies} 
        headCells = {headCells} 
        defaultOrderBy = {"patientName"} 
        itemsPerPage = {10} 
        title = {"Pacs Studies"}
        selectedStudies = {selectedStudies}
        setSelectedStudies={setSelectedStudies}
        checkedOptionComponent={<CheckedOptionComponentForPacsStudies selectedStudies={selectedStudies}/>}
        uncheckedOptionComponent={<></>}
        />
    </div>
  )
}

export default PacsStudies