import {useState} from 'react'
import {Data} from '../Data/Data'
import * as XLSX from 'xlsx'

function excel() {
  
  // on change states
  const [excelFile, setExcelFile]=useState(null);
  const [excelFileError, setExcelFileError]=useState(null);  
  const [input, setInput] = useState("")
  const [setdatas] = useState("")
 
  // submit
  const [excelData, setExcelData]=useState(null);
  // it will contain array of objects

  // handle File
  const fileType=['application/vnd.ms-excel'];
  const handleFile = (e)=>{
    let selectedFile = e.target.files[0];
    if(selectedFile){
      // console.log(selectedFile.type);
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload=(e)=>{
          setExcelFileError(null);
          setExcelFile(e.target.result);
        } 
      }
      else{
        setExcelFileError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else{
      console.log('plz select your file');
    }
  }

  // submit function
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(excelFile!==null){
      const workbook = XLSX.read(excelFile,{type:'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet=workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
      setdatas(data);
    }
    else{
      setExcelData(null);
    }
  }
  const handleSearch = () =>{
	const impdata = excelData.filter((ech) => ech.BibNumber == input);
	console.log(impdata)
	// const impdata = excelData.filter((ech) => ech.BibNumber === input );
	// console.log(impdata)
	setExcelData(impdata)
	// console.log(input)
	// console.log(excelData)

		

	}
  
  return (
    <div className="container">

      {/* upload file section */}
      <div className='form'>
        <form className='form-group' autoComplete="off"
        onSubmit={handleSubmit}>
          <label><h5>Upload Excel file</h5></label>
          <br></br>
          <input type='file' className='form-control'
          onChange={handleFile} required></input>                  
          {excelFileError&&<div className='text-danger'
          style={{marginTop:5+'px'}}>{excelFileError}</div>}
          <button type='submit' className='btn btn-success'
          style={{marginTop:5+'px'}}>Submit</button>
        <center>
			<label>User BIB Number</label>
			<input type="text" />
			<button>Search for profile</button>
			</center>
        </form>
      </div>

      <br></br>
      <center>
	<label>User BIB Number</label>
	<input type="text" value={input} onChange={e => setInput(e.target.value)}/>
	<button onClick={handleSearch}>Search for profile</button>
	</center>
      <hr></hr>

      {/* view file section */}
      <h5>View Excel file</h5>
      <div className='viewer'>
        {excelData===null&&<>No file selected</>}
        {excelData!==null&&(
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>BibNunber</th>
                  <th scope='col'>FullName</th>
                  <th scope='col'>AgeGroup</th>
                  <th scope='col'>Gender</th>
                  <th scope='col'>Event</th>
                  {/* <th scope='col'>Age</th>
                  <th scope='col'>Date</th>                   */}
                </tr>
              </thead>
              <tbody>
                <Data excelData={excelData}/>
              </tbody>
            </table>            
          </div>
        )}       
      </div>
      

    </div>
  );
}

export default excel;
