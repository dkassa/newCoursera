import React, { Component } from 'react';
import { Media, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

function RenderCartItem({ cart, deleteCart, carte}) {
    return(
        <Media tag="li">
            <Media left middle>
                <span>qty:{parseInt(cart.id)}</span><br/>
                <Media object src={baseUrl + cart.image} alt={cart.name} /><br/>
                <span>{cart.price}USD</span>
            </Media>
            <Media body className="ml-5">
                <Media heading id="heed">{cart.name}</Media>
                <p>{cart.description}</p>
                <Button outline color="danger" onClick={() => deleteCart(cart._id)}>
                    <span className="fa fa-times"></span>
                </Button>
                <Button outline color="danger" onClick={() => carte(cart._id)}>
                    <span className="fa fa-cart-plus"></span>
                </Button>
                <Button outline color="danger" onClick={() => deleteCart(cart._id)}>
                    <span className="fa fa-cart-plus"></span>
                </Button>
            </Media>
        </Media>
    );
}

const Carts = (props) => {
    console.log(props)

    if (props.carts.cartsLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.carts.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.carts.errMess}</h4>
                </div>
            </div>
        )
    }
    else if (props.carts.Carts !== null && props.carts.Carts !== undefined && props.carts.Carts.dishes !== null && props.carts.Carts.dishes !== undefined) {

        const carts = props.carts.Carts.dishes.map((cart) => {
            console.log(cart)
            return (
                <div key={cart._id} className="col-12 mt-5">
                    <RenderCartItem cart={cart} carte={props.carte} deleteCart={props.deleteCart} />
                </div>
            );
        });

        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>My carts</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>My carts</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <Media list>
                        {carts}
                    </Media>
                </div>
            </div>
        );
    }
    else {
        return(
            <div className="container">
                <div className="row">
                    <h4>You have no carts</h4>
                </div>
            </div>
        )
    }
}

export default Carts;