import React,{useState,useEffect} from "react";
import { TextField,Link , SwipeableDrawer, Grid, Box ,Button,FormLabel,FormControlLabel,FormGroup,Checkbox,Typography} from "@mui/material";
// import {makeStyles} from '@mui/material/styles'
import { makeStyles } from '@material-ui/styles';
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import axios from 'axios';


const theme = createTheme({
  palette :{
    primary :{
      main : `${orange[900]}`
    }
  }
})

const useStyle  = makeStyles(()=>({

  textfeild: {
    
  },

}))

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}



export default function SearchBar() {

const [courseList,setCourseList] = useState([])
const [rows,setRows] = useState([])

// state for search 
const [query,setQuery] = useState('')


// TOKEN 

const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MTQsIkNvbnRhY3ROdW1iZXIiOiI4MzAyMDQzMjU5IiwiRW1haWwiOiJoYXJzaHNhaHUzMDAyQGdtYWlsLmNvbSIsIkdTVElOIjoiMjlHR0dHRzEzMTRSOVo3IiwiTmFtZSI6IkhhcnNoIFNhaHUiLCJBZGRyZXNzIjoiRGFyZ2FoIEJhemFyLCBBam1lciIsImlhdCI6MTY1MDExMzEwMX0.SoNdSCsbudcJfIxtkeMryw2fMsvBWJc4DsJ2F-N2cVw'

// for drawer
const [isDrawerOpen,setIsDrawerOpen] = useState(false)

// importing style
const classes = useStyle();

const [Filters,setFilters] = useState(
  {

    Udemy : false,
    Coursera : false,
    FutureLearn : false,
    edX : false,
    Free : false,
    Paid : false,
    Subscription : false,
  }
)

// for ckech box handler 

const  handleChange = async(e)=>{
  // console.log(e.target.value)
  // console.log(e.target.checked)


  setFilters({
     ...Filters,
     [e.target.value] : e.target.checked
  })


}

// handelSeacrch bar
  const handelSearch = async(e) =>{
  
    const SearchParam = e.target.value ;

    console.log(SearchParam)

    if(SearchParam.length >= 5)
    {

      const obj = JSON.stringify(Filters);

      await axios.get(`http://localhost/partner/apis/getCourseList/?q=${SearchParam}&filter=${obj}`,{
        headers: {
            'Authorization' : `Api-Key ${Token}`
        }})
      .then((data)=>{
        setCourseList(data.data);
        console.log(data);
      })
      .catch((err)=>{console.log(err);})

      // // For fetching the data for database
      // await axios.get(`https://api.classbazaar.com/api/v2/courses/?q=${e.target.value}&filter=&subjects=all&provider=&feeFilter=&startDateFilter=&providerOffset=0::0::0::0::0::0::0`)
      // .then((data)=>{
      //   setCourseList(data.data.data);
      //   console.log(data.data.data)
      // })
      // .catch((err)=>{
      //   console.log(err)
      // })
    }
    

  }

   // defining the Columns for the data grid

const columns = [
  {field : 'id',headerName : 'Id',width : 50},
  {field : 'provider',headerName : 'Provider',width : 100},
  {field : 'title',headerName : 'Title',width : 500},
  {field : 'price',headerName : 'Price (Rs) ',width : 100},
  {field : 'subjects',headerName : 'Subjects',width : 200},
  {field : 'university',headerName : 'University',width : 200},
  {field : 'start_date',headerName : 'Start Date',width : 100},
  {field : 'link',headerName : 'Link',width : 100,renderCell : (cellvalue) => (
    // console.log(cellvalue);
    <Link href={`https://www.classbazaar.com/coursedetails/${cellvalue.value.provider}/${cellvalue.value.uuid}`}>Link</Link>
  )}];

  useEffect(() => {
    
    setRows(courseList.map((row)=>{
  
      return ({
        id : row.index,
        provider : row.provider,
        title : row.title,
        price : row.price || 'Free',
        subjects : row.subjects,
        university : row.university,
        start_date : row.start_date || 'Flexible',
        link : row
      })}))
    
  }, [courseList]);


 



  return (
// MainContainer
    <ThemeProvider theme = {theme}>
<Grid container sx={{  marginTop : '5%' }}>

        {/* Heading section
        <Grid xs={12}>
          <Typography variant="h5" align="center">
            Search Bar By ClassBazar
          </Typography>
        </Grid>
 */}

        {/* Search Bar Secton  */}
        <Grid xs={8} md = {6} sx = {{display : 'flex',columnGap : '30px',justifyContent : 'center',alignItems : 'center'}} margin = 'auto'>
         
          <TextField
          fullWidth 
          id="outlined-search"
          label="Search Courses"
          sx = {{boxShadow : 2}}
          type="search" 
          onChange = {handelSearch}
          className = {classes.textfeild}
          />
{/* // filter button */}
          <Button variant = 'contained' onClick = {()=>{setIsDrawerOpen(true)}} color = 'primary' >Filter</Button>
        </Grid>

      </Grid>



        {/* Data Grid Section  */}
        <Grid sx = {{boxShadow: 2, marginTop : '50px'}} margin = 'auto'>
        
        {
        courseList !== [] && 
        <Box sx={{ height: 490, width: '100%', align : 'bottom' }}>
<DataGrid
  rows = {rows}
  columns = {columns}
  pagination
  pageSize={7}
  rowsPerPageOptions={[7]}
  components={{
    Pagination: CustomPagination,
  }}
/>
</Box> }
        </Grid>

        {/* Drawer section  */}
          <SwipeableDrawer
            anchor={'left'}
            onClose={()=> { setIsDrawerOpen(false)}}
            open={isDrawerOpen}
          >
            <Box p = {2} role = 'Presentation' sx = {{display : 'flex',justifyContent : 'center'}} width = {250} alignItems = 'center'>
            <FormGroup>
                  <FormLabel id="demo-radio-buttons-group-label"><Typography variant = 'h6'> Provider </Typography></FormLabel>
                      <FormControlLabel checked = {Filters.Udemy} control={<Checkbox onChange = {handleChange} value = 'Udemy' />} label="Udemy" />
                      <FormControlLabel checked = {Filters.Coursera} control={<Checkbox onChange = {handleChange} value = 'Coursera' />} label="Coursera" />
                      <FormControlLabel checked = {Filters.FutureLearn} control={<Checkbox onChange = {handleChange} value = 'FutureLearn' />} label="Future Learn" />
                      <FormControlLabel checked = {Filters.edX} control={<Checkbox onChange = {handleChange} value = 'edX' />} label="edX" />
                      <br></br>
                  <FormLabel id="demo-radio-buttons-group-label"><Typography variant = 'h6'> Price </Typography></FormLabel>
                      <FormControlLabel checked = {Filters.Free} control={<Checkbox onChange = {handleChange} value = 'Free' />} label="Free" />
                      <FormControlLabel checked = {Filters.Paid} control={<Checkbox onChange = {handleChange} value = 'Paid' />} label="Paid" />
                      <FormControlLabel checked = {Filters.Subscription} control={<Checkbox onChange = {handleChange} value = 'Subscription' />} label="Subscription" />
            </FormGroup>
            </Box>
            {/* {list(anchor)} */}
          </SwipeableDrawer>

        {/* Drawer section ends  */}

      </ThemeProvider>
  );
// MainContainer ends
}