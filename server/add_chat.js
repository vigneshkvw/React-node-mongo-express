import React, { Component } from 'react';
import Header from '../header';
import SideBar from '../sidebar';
import url1 from '../../urlpage';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, NavLink,  HashRouter } from 'react-router-dom';
import "react-day-picker/lib/style.css";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
var userer=[];

export default class add_chat extends Component {
  
    componentDidMount() {       
        axios.get(url1 + '/member_list/?token=' + cookies.get('wmg_admin_token') + '&user_id=' + cookies.get('wmg_admin_id')).then(res => {
            const k = 1;
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].sno = k + +i;
                
            }
            this.setState({ data: res.data });
        }, err => {
            //    document.location = "/#/"
            console.log(err);
        })
    }

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            venue: '',
            venue_url: '',
            date: '',
            from_time: '',
            to_time: '',
            image: 'http://placehold.it/60/c2c2c2?text=User'
        };
        window.postMessage('renderTable', '*');
        this.update_image = this.update_image.bind(this);
    }

     update_image(event) {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({image: e.target.result});
            };
            reader.readAsDataURL(event.target.files[0]);
        }else{
          this.setState({image: 'http://placehold.it/60/c2c2c2?text=User'});
        }
    }

    action(cell, row) {     
        return (
            <div class="col-auto">
                <Checkbox row={row} />              
            </div>           
        )
    }

    render() {
        const FORMAT = 'YYYY-MM-DD';
        return (
            <div class="main-wrapper">
                <Header />
                <div class="content-wrapper">
                    <div class="content-container">
                        <SideBar />
                        <div class="main-page">
                            <div class="container-fluid">
                                <div class="row page-title-div">
                                    <div class="col-md-12">
                                        <h2 class="title">Create Chat</h2>
                                    </div>
                                </div>

                                <div class="row breadcrumb-div">
                                    <div class="col-md-12">
                                        <ul class="breadcrumb">
                                            <li><NavLink to="/home"><i class="fa fa-home"></i> Home</NavLink></li>
                                            <li class="active">Create Chat</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <section class="section">
                                <div class="container-fluid">

                                    <div class="row">
                                            <div class="panel">
                                                <div class="panel-body p-30">
                                                <form method="post" class="form-horizontal" enctype="multipart/form-data" action={"/add_chat/?token=" + cookies.get('wmg_admin_token') + '&user_id=' + cookies.get('wmg_admin_id')} >                                                   
                                                <div class="col-md-6">
                                                        <div class="col-md-12" style={{ 'padding-right': '30px' }}>

                                                            <div class="form-group">
                                                                <label for="title">Title <sup class="color-danger">*</sup></label>
                                                                <input type="text" class="form-control" id="title" name="title" placeholder="Enter your Title" required autocomplete="off" />
                                                            </div>
                                                            </div>

                                                        <div class="col-md-12">
                                                            <div class="form-group">
                                                                <label for="exampleInputEmail1">Upload Image <sup class="color-danger">*</sup></label>
                                                                <img className="img-responsive" src={this.state.image} alt="user" style={{ 'width': '150px', 'height': '150px' }} />
                                                                <br />
                                                                <input type="file" class="form-control" id="image" name="image" placeholder="" onChange={this.update_image} />
                                                            </div>
                                                        </div>                                                    
                                                    </div>
                                                    <div class="col-md-6">

                                                        <div class="panel-body p-20">
                                                            <BootstrapTable ref='table' data={this.state.data} height='500px' scrollTop={'Bottom'} search dataSort striped hover>
                                                                <TableHeaderColumn width='50px' dataField='sno' isKey={true} dataSort={true} dataAlign='center'>S.No</TableHeaderColumn>
                                                                <TableHeaderColumn width='150px' dataField='name' headerAlign='center' dataSort={true} dataFormat={this.view_details} dataAlign='center'>Name</TableHeaderColumn>
                                                                <TableHeaderColumn width='150px' dataField='mobile_no' headerAlign='center' dataSort={true} dataAlign='center'>Mobile No</TableHeaderColumn>
                                                                <TableHeaderColumn width='100px' dataField='_id' dataSort={true} dataAlign='center' dataFormat={this.action}>Actions</TableHeaderColumn>
                                                            </BootstrapTable>
                                                        </div>
                                                    </div>
                                                    <input type="text" name="users" value={userer} />
                                                    <div class="col-md-12">
                                                        <div class="btn-group pull-right mt-10" role="group">
                                                            <button type="submit" class="btn bg-primary btn-wide"><i class="fa fa-arrow-right"></i>Submit</button>
                                                        </div></div>
                                                    </form>                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


class Checkbox extends Component {

    componentDidMount(){
        function isInArray(value, array) {
            return array.indexOf(value) > -1;
        }
        var check = isInArray(this.props.row._id, userer)
if(check==true){
    this.setState({ checked: true });
}else{
    this.setState({ checked: false });
}
    }

    constructor() {
        super();
        window.postMessage('renderTable', '*');
        this.state = {
            data: "",
            data2: [],
            title: '',
            image: '',
            participants: [],
            checked: false            
        };   
    }

    onChange(ev) {
        this.setState({ checked: ev.target.checked });
      
        console.log(userer)
       if(this.state.checked==false){
         
           userer.push(this.props.row._id)
          

       }else{
      
           Array.prototype.remove = function () {
               var what, a = arguments, L = a.length, ax;
               while (L && this.length) {
                   what = a[--L];
                   while ((ax = this.indexOf(what)) !== -1) {
                       this.splice(ax, 1);
                   }
               }
               return this;
           };
           userer.remove(this.props.row._id);
        //    user = user.replace('this.props.row._id', '');
       }
        console.log(userer)
    }

    render() {
        
        return (

            <div class="form-check mb-2">
              
                <input class="form-check-input" checked={this.state.checked}
                    onChange={this.onChange.bind(this)}type="checkbox" id="autoSizingCheck" />
            </div>
        )
    }
}

