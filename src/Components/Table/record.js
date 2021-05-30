import React, { Component } from 'react';
import ApiServices from '../../ApiServices';
import validations from '../Reusable/Validations';
import { Link } from "react-router-dom";
import { TopNav } from '../Common'; 

const requiredError = 'This field is mandatory';

class Record extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data : {
                first_name : {
                    fieldName : 'First Name',
                    value : '',
                    param : 'param2',
                    validation: '',
                    isError : false,
                    errorMsg : 'Agency name should contain only letters and spaces ',
                    isRequired : false,
                    isDisabled : false,
                },
                last_name : {
                    fieldName : 'Last Name',
                    value : '',
                    param : 'param3',
                    validation : validations.agencyCode,
                    isError : false,
                    errorMsg : 'Please Enter a Valid Agency Code',
                    isRequired : false,
                    isDisabled : false
                },
                email : {
                    fieldName : 'Email',
                    value : '',
                    param : 'param1',
                    validation : validations.email,
                    isError : false,
                    errorMsg : 'Please Enter a Valid Email ID',
                    isRequired : true,
                    isDisabled : false
                },
                states : {
                    fieldName : 'State',
                    value : '',
                    param : 'param6',
                    validation : '',
                    isError : false,
                    errorMsg : 'Please Enter a Valid Value',
                    isRequired : false,
                    isDisabled : false
                },
                city : {
                    fieldName : 'City',
                    value : '',
                    param : 'param5',
                    validation : '',
                    isError : false,
                    errorMsg : 'Please Enter a Valid Value',
                    isRequired : false,
                    isDisabled : false
                },
                pincode : {
                    fieldName : 'Pincode',
                    value : '',
                    param : 'param4',
                    validation : validations.pinCode,
                    isError : false,
                    errorMsg : 'Please Enter a Pin Code',
                    isRequired : false,
                    isDisabled : false
                },             
            },
            successful:{
                status: false,
                message:''
            },
            isUpdate:false,           
         }
    }

    static getDerivedStateFromProps(props,state) {

       if(!state.isUpdate){

            if(props.location.state === undefined){
                return false
            }

            let stateObj = {...state.data}
            let propsObj = props.location.state

            Object.entries(propsObj).map(
                ([key,val]) => {
                   return stateObj[key].value = val;
                }
            )
            stateObj.email.isDisabled = true
            stateObj.email.isRequired = false
            stateObj.isUpdate = true
            return {...stateObj}        
        }
    }


    validation = (e) => {

        let {name,value} = e.target
        let stateObj = {...this.state}
        let validation = stateObj.data[name].validation
        let isRequired = stateObj.data[name].isRequired
        let isError = false
        let RegEx = new RegExp(validation)

        if(isRequired){
            if(value === ''){
                 isError = true
            }else{
                if(validation !== ''){
                    if(!value.match(RegEx)){
                        isError = true
                    }
                }
            }
        }else{
            if(value !== '' & validation !== ''){
                if(!value.match(RegEx)){
                     isError = true
                }
            }
        }

        return stateObj.data[name].isError = isError
    }

 
    changeHandler = (e) => {
    
    let {name,value} = e.target
    let stateObj = {...this.state}

    this.validation(e)

    stateObj.data[name].value = value

    this.setState({...stateObj})

    } 


    renderInputs = () => {
        let stateObj = {...this.state.data}

 return Object.entries(stateObj).map(
            ([key,val])=>{                
                return(
                    <div className='col-4 mt-3 pl-3 pr-0' key={key}>
                                <label className='m-0 text-primary font-weight-bold' >{val.fieldName}</label>
                                    {
                                        key === 'states'?
                                        <select className={`form-control pr-4 ${val.isRequired?'hasRequired':''} ${val.isError?'hasError':''}`} disabled={val.isDisabled}
                                             name={key} onChange={this.changeHandler}>
                                            <option value=''>Select</option>
                                            <option value='Maharashtra'>Maharashtra</option>
                                            <option value='Goa'>Goa</option>
                                            <option value='Gujrat'>Gujrat</option>
                                            <option value='Delhi'>Delhi</option>
                                        </select>
                                        :                                    
                                        <input type='text' value={val.value} className={`form-control ${val.isRequired?'hasRequired':''} ${val.isError?'hasError':''}`} disabled={val.isDisabled}
                                              name={key} onChange={this.changeHandler}/>
                                    }
                                   
                                    { val.isError &&
                                     <> 
                                       { 
                                        val.value==='' ? 
                                            <div className='text-danger small position-absolute'>{requiredError}</div> 
                                            :
                                            <div className='text-danger small position-absolute'>{val.errorMsg}</div>
                                        }
                                    </>
                                    }
                    </div>        
                )
            }
        )
    }

    submitHandler = (e) => {
        let stateObj = {...this.state}
        let isSubmit = true
        
        Object.values(stateObj.data).map(e  => {
           
            if((e.value === '' && e.isRequired) || e.isError){
                e.isError = true
                isSubmit = false
        }
        return this.setState({...stateObj})
        })
        if(!isSubmit){
            return false    
        }

        let inputData = {}
      
        Object.entries(stateObj.data).map(
            ([key,val]) => {
                return inputData[val.param] = val.value            
            }            
        )
        const queryString = new URLSearchParams(inputData).toString();

        if(stateObj.isUpdate){
            ApiServices.editRecord(queryString)
            .then(res => {
                if(res.data.Success){
                    stateObj.successful.status = true
                    stateObj.successful.message = res.data.Message
                    this.setState({...stateObj})
                } else {
                    stateObj.successful.status = false
                    stateObj.successful.message = res.data.Message
                    this.setState({...stateObj})
                }
            }    
             )
            .catch(err => console.log(err))
      
            this.setState({...stateObj})
        }else{
            ApiServices.addRecord(queryString)
            .then(res => {
                if(res.data.Success){
                    stateObj.successful.status = true
                    stateObj.successful.message = res.data.Message
                    this.setState({...stateObj})
                } else {
                    stateObj.successful.status = false
                    stateObj.successful.message = res.data.Message
                    this.setState({...stateObj})
                }
            }    
             )
            .catch(err => console.log(err))
      
            this.setState({...stateObj})
        }   
    }
  

    render() { 
        return (
         <> 
            <TopNav />
            <div className='row'>
                <div className='col-md-8'>
                    <div className='row p-0 pl-2 m-0'>                        
                        {this.renderInputs()}                         
                    </div>
                </div>
                <div className='col-md-4'></div>
            </div>
                        
        {this.state.successful.status ? 
             <div className='small text-success position-absolute m-4'>{this.state.successful.message}</div>
             :
             <div className='small text-danger position-absolute m-4'>{this.state.successful.message}</div>
    }     
          
            <div className='row'>
                <div className='col-5'></div>
                <div className='col-1 mt-5'>
                   {
                     !this.state.successful.status ?
                        <button type="button" className="btn btn-sm btn-primary btn-record rounded-pill pl-4 pr-4 p-2 m-5"
                            onClick={this.submitHandler}>
                                {this.state.isUpdate ? 'Update' : 'Add'}
                        </button>
                        :
                        <button type="button" className="btn btn-sm btn-primary disabled btn-record rounded-pill pl-4 pr-4 p-2 m-5">
                                {this.state.isUpdate ? 'Update' : 'Add'}
                        </button>
                     }
                </div>
                <div className='col-1 mt-5'>
                    <Link to='/'>
                        <button type="button" className="btn btn-sm btn-secondary btn-record rounded-pill pl-4 pr-4 p-2 m-5">
                            Cancel
                        </button>
                    </Link>
                </div>
                <div className='col-5'></div>
            </div>
            
            
        </> 
         );
    }
}
 
export default Record;