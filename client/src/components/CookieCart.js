import React,{ Component, createElement } from 'react'
import cookie from 'react-cookies'
import {Button, Col,CardText} from 'reactstrap';
import {baseUrl} from '../shared/baseUrl'
import './Cook.css'

 

 
class Carttwo extends Component {
  constructor (props) {
    super(props)
 
    
  }
 
  
 
  

  componentDidMount(){
    console.log(this.props.CCarts)
    if(this.props.CCarts){
      this.props.CCarts.CCarts.map(element => {

        document.getElementById('display').innerHTML+=`<div  key=${element._id}>
       <div> <img src=${baseUrl + element.image} />
        <p>${element.name}</p></div>
        
        </div>`


    })
  }
    else{
      <div>NO cart found</div>
    }
 
 
 };
    
  
 
  
 
  render() {
    return(
        <div>
           <div className="row align-items-center justify-content-center" id="display">
           
           </div>

    <Button onClick={()=>this.addToCart()}>ClickMe</Button>
    
    </div>

    )
}

}
export default Carttwo;