import React, { Component } from 'react';
import { Media, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

function RenderMenuItem({ cart, deleteFavorite }) {
    return(
        <Media tag="li">
            <Media left middle>
                <Media object  crossOrigin="anonymous" src={cart.image} alt={cart.name} />
            </Media>
            <Media body className="ml-5">
                <Media heading>{cart.name}</Media>
                <p>{cart.description}</p>
                <Button outline color="danger" onClick={() => deleteFavorite(cart._id)}>
                    <span className="fa fa-times"></span>
                </Button>
            </Media>
        </Media>
    );
}

const Carts = (props) => {
    console.log(props)

    if (props.carts.isLoading) {
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
                    <h4>{props.favorites.errMess}</h4>
                </div>
            </div>
        )
    }
    else if (props.carts.carts) {

        const carts = props.carts.carts.dishes.map((cart) => {
            return (
                <div key={cart._id} className="col-12 mt-5">
                    <RenderMenuItem cart={cart} deleteCart={props.deleteCart} />
                </div>
            );
        });

        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>My Favorites</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>My Carts</h3>
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