
import React, { Component, useState } from "react";


import { Container, Form, Button , FormGroup, Input, Label} from 'reactstrap';
import ActionCreators, { createDishes } from '../redux/ActionCreators';
import axios from 'axios'
import {Link} from 'react-router-dom'

import './Newdish.css'


 class Newdish extends Component {

  

  constructor(props) {
    super(props);
    this.state = {            
        name:"",
        quantity:"",
        description:"",
        image:"",
        category: "",
        label: "",
        price: ""
    };
    this.handleSubmit= this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }
  

    handleSubmit=async (e)=>{
    e.preventDefault()
    console.log(this.state)

   try{ const dishcreate=await axios.post('https://localhost:3446/dishes',this.state)
    console.log(dishcreate)
   }
   catch(err){
    console.log(err)
   }
   
  }

  handleChange=(e)=>{
    
    const {name,value}=e.target;
    this.setState({
      [name]: value,
    })
  }


  render(){
  
    return (
      <div style={{"height": "500px","width": "500px" ,"margin-left":"auto","margin-right":"auto"}}>

    
      
        <Form onSubmit={this.handleSubmit}>
          <h1>Registration </h1>
          <FormGroup className="mb-3" controlId="formBasicName">
            <Label>name</Label>
            <Input
              type="text"
              
              name="name"
               onChange={this.handleChange}
               
              
            />
          </FormGroup>
        <FormGroup className="mb-3" controlId="formBasicEmail">
            <Label>quantity</Label>
            <Input
              type="text"
            
              name="quantity"
              
               onChange={this.handleChange}
              
            />
            
            
          </FormGroup>

          

          <FormGroup className="mb-3" controlId="formBasicPassword">
            <Label>description</Label>
            <Input
              type="text"
            
              name="description"
              
               onChange={this.handleChange}
              
            />
          </FormGroup>


          
          <FormGroup className="mb-3" controlId="formBasicConfirmPassword">
            <Label>category</Label>
            <Input
              type="text"
           
              name="category"
              
               onChange={this.handleChange}
              
            />
          </FormGroup>

          <FormGroup className="mb-3" controlId="formBasicConfirmPassword">
            <Label>label</Label>
            <Input
              type="text"
            
              name="label"
              
               onChange={this.handleChange}
              
            />
          </FormGroup>

          <FormGroup className="mb-3" controlId="formBasicConfirmPassword">
            <Label>price</Label>
            <Input
              type="text"
          
              name="price"
              
              onChange={this.handleChange}
              
            />
          </FormGroup>

          <FormGroup className="mb-3" controlId="formBasicEmail">
            <Label>image</Label>
            <Input
              type="file"
            
              name="image"
             
               onChange={this.handleChange}
              
            /></FormGroup>

         <div style={{"display": "flex"}}>
          <Button variant="info">
            Register 
          </Button>
          <Button><Link to="/home" style={{"color":"white"}}>Home</Link></Button></div>
          
        </Form> </div>
     
    
  )
  }

 }

export default Newdish;
