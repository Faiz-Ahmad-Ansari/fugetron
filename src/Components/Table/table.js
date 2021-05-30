import React, { Component } from 'react';
import { TopNav } from '../Common'; 
import { Link } from "react-router-dom";
import ApiServices from '../../ApiServices';


class Table extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data : [],
            delete : {
                email:'',
                first_name:'',
                last_name:''
            },
            search:'',
            loaded:false
         }
    }

    componentDidMount(){
        let stateObj = {...this.state}

        ApiServices.recordList()
        .then(res => {
            
            if(res.data.Success){
                stateObj.data = res.data.data
                stateObj.loaded = true
                this.setState({...stateObj})
            }
        })
    }

    filter = (fil) => {
 
          return (
              fil.first_name.toLowerCase().includes(this.state.search.toLowerCase())
              || fil.last_name.toLowerCase().includes(this.state.search.toLowerCase()) 
              || fil.email.toLowerCase().includes(this.state.search.toLowerCase()) 
              || fil.states.toLowerCase().includes(this.state.search.toLowerCase()) 
              || fil.city.toLowerCase().includes(this.state.search.toLowerCase())
              || fil.pincode.toLowerCase().includes(this.state.search.toLowerCase())  
              )
      } 
      
    searchHandler(e){

    let {value} = e.target
    let stateObj = {...this.state}

    stateObj.search = value

    this.setState({...stateObj})
   
    }

    deleteRecord = () => {
        let stateObj = {...this.state}
    
        if(stateObj.delete.email !== ''){

            ApiServices.deleteRecord(stateObj.delete.email)
            .then(res => {
                if(res.data.Success){
                    stateObj.delete.email = ''
                    stateObj.delete.first_name = ''
                    stateObj.delete.last_name = ''

                    this.setState({...stateObj})
                    window.location.href = './'
                }
            })
        }
    }

    toDelete = (e) => {
        let stateObj = {...this.state}
        
        stateObj.delete.email = e.email
        stateObj.delete.first_name = e.first_name
        stateObj.delete.last_name = e.last_name

        this.setState({...stateObj})
    }

    renderTable =  () => {   
        return this.state.data
        .filter((fil)=>this.filter(fil))
        .map((e,i) => {
          return  <tr  className='text-secondary' key={i}>
                    <td>{i + 1}</td>
                    <td>{e.first_name}</td>
                    <td>{e.last_name}</td>
                    <td>{e.email}</td>
                    <td>{e.states}</td>
                    <td>{e.city}</td>
                    <td>{e.pincode}</td>
                    <td className='text-center p-0 pt-2 pb-1'>
                           <Link to={{ pathname:'/record', state:e }}>
                                <button type="button" className="btn btn-primary btn-actions w-100">                               
                                    EDIT
                                </button>
                             </Link>
                    </td>
                    <td className='text-center p-0 pt-2 pb-1'><button type="button" className="btn btn-danger btn-actions"
                         data-toggle="modal" data-target="#exampleModalCenter" onClick={()=>this.toDelete(e)} >
                           DELETE
                        </button>
                    </td>
                  </tr>
      })
    }  

    render() { 
        return ( 
            <>
            <TopNav />
            <div className='row p-0 m-0'>
                <div className='col-md-6'>
                    <button type="button" className="btn btn-link pt-4">
                        <Link to="/record">+ Add Record</Link>
                    </button>
                </div>
                <div className='col-md-3'></div>
                <div className='col-md-3 searchBox'>
                    <input placeholder="Search" className={`form-control`} name='search' onChange={(e)=>this.searchHandler(e)}/>
                </div>
            </div>
            <div className='table-responsive m-0 pl-4 pr-4 pt-0'>
                <table className="table tableBorder table-hover ">
                    <thead className='table-header tableHeader'>
                        <tr className='text-nowrap' >
                            <th className='header' scope="col">#</th>
                            <th className='header' scope="col">First Name</th>
                            <th className='header' scope="col">Last Name</th>
                            <th className='header' scope="col">Email</th>
                            <th className='header' scope="col">State</th>
                            <th className='header' scope="col">City</th>
                            <th className='header' scope="col">Pincode</th>
                            <th className='header text-center' colSpan="2" scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           this.state.loaded ?
                                this.state.data.length > 0 ? this.renderTable() 
                                : 
                                <tr><td colSpan='8'>No data found</td></tr> 
                                :
                                <tr><td colSpan='8'>Loading Data Please Wait ...</td></tr>
                        }                                        
                    </tbody>
                </table>
            </div>


            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-body text-center text-primary">
                    <b>Are you Sure to Delete {`${this.state.delete.first_name} ${this.state.delete.last_name}`}</b>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger rounded-pill" onClick={this.deleteRecord} >DELETE</button>
                        <button type="button" className="btn btn-secondary rounded-pill" data-dismiss="modal">Cancel</button>
                    </div>
                    </div>
                </div>
            </div>
          
            </>
      
      );
    }
}
 
export default Table;