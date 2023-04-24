import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem ,Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

    function RenderMenuItem({ dish, dishes,cart,onClick,postCart }) {
        
        return(
            <div>
            <Card>
                
                <Link to={`/menu/${dish._id}`} >
                    <CardImg width="100%" crossOrigin="anonymous" src={baseUrl + dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Link>
                
            </Card>

            <Button outline color="primary" onClick={() => postCart(dish._id)}>
                                    
                                        <span className="fa fa-shopping-cart"></span>
                         
                                </Button>

                                <Button outline color="primary" id="stg" onClick={()=>dish._id}>
                                    
                                    <span className="fa fa-shopping-cart">Carttwo</span>
                     
                            </Button> 

                                
                                        
                                
            </div>
        );
    }

    

    const Menu = (props) => {
        console.log(props)

        const menu = props.dishes.dishes.map((dish) => {
            console.log(dish)
            return (
                <div key={dish._id} className="col-12 col-md-5 m-1">
                    <RenderMenuItem dish={dish} dishes={props.dishes.dishes} postCart={props.postCart}/>
                    
                </div>
            );
        });

        if (props.dishes.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.dishes.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.dishes.errMess}</h4>
                    </div>
                </div>
            );
        }
        else
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Menu</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Menu</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        {menu}
                    </div>
                </div>
            );
    }

export default Menu;