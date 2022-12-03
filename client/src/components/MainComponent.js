import React, { Component } from 'react';
import Home from './HomeComponent';
import Carts from './Cartcomponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Favorites from './FavoriteComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Feed from './Feeddetail'
import Carttwo from './CookieCart';
import ConfigureStore from '../redux/configureStore';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, postFeedback,fetchDishes,fetchComments, FetchHcart,fetchPromos, fetchLeaders, loginUser, addProfile, logoutUser, fetchFavorites, postFavorite, deleteFavorite, fetchCarts,  postCart,deleteCart,signupUser, fetchFeedback, fetchcart, addToCart } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';




const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders,
      favorites: state.favorites,
      auth: state.auth,
      feedbacks:state.feedbacks,
      users:state.users,
      carts:state.carts,
      CCarts:state.CCarts
    }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, comment) => dispatch(postComment(dishId, rating, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: (feedback) => dispatch(postFeedback(feedback)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  signupUser: (creds) => dispatch(signupUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  fetchFavorites: () => dispatch(fetchFavorites()),
  fetchCarts: () => dispatch(fetchCarts()),
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postCart: (dishId) => dispatch(postCart(dishId)),
  fetchFeedback:()=>dispatch(fetchFeedback()),
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
  deleteCart: (dishId) => dispatch(deleteCart(dishId)),
  FetchHcart:()=>dispatch(addToCart())
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchCarts()
    this.props.fetchDishes()
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    this.props.fetchFavorites();
   this.props.fetchFeedback();
   this.props.FetchHcart();
  }

  render() {
    const caart=(id)=>{
      
      let tempCart=[...this.props.carts];
      const selectedProduct=tempCart.find(cart=>cart._id===id);
      const index=tempCart.indexOf(selectedProduct);
      const product=tempCart[index];
      product.id=product.id + 1;
      
      return product.id
      
      
    }

    const Cartpage=()=>{
      return(
        <Carts carte={caart} 
        carts={this.props.carts} deleteCart={this.props.deleteCart}
        
        />
      )
    }

    const HomePage = () => {
      return(
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishes={this.props.dishes}
        promotionFeatured={this.props.promotions.promotionFeatured}
        leaderFeatured={this.props.leaders.leaderFeatured[0]}
         
          dishesFeatured={this.props.dishes.dishesFeatured}    
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leaderLoading={this.props.leaders.isLoading}
          leaderErrMess={this.props.leaders.errMess}
        />
      );
    }

      const DishWithId = ({ match }) => {
          return (
              (this.props.auth.isAuthenticated && this.props.favorites.favorites !== null && this.props.favorites.favorites !== undefined && this.props.favorites.favorites.dishes !== null && this.props.favorites.favorites.dishes !== undefined)
                  ?
                  <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
                      isLoading={this.props.dishes.isLoading}
                      errMess={this.props.dishes.errMess}
                      comments={this.props.comments.comments.filter((comment) => comment.dish === match.params.dishId)}
                      commentsErrMess={this.props.comments.errMess}
                      postComment={this.props.postComment}
                      favorite={this.props.favorites.favorites.dishes.some((dish) => dish._id === match.params.dishId)}
                      postFavorite={this.props.postFavorite}
                      postCart={this.props.postCart}
                      deleteCart={this.props.deleteCart}
                      //cart={this.props.carts.Carts.dishes.some((cart) => cart._id === match.params.cartId)}
                  />
                  :
                  <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
                      isLoading={this.props.dishes.isLoading}
                      errMess={this.props.dishes.errMess}
                      comments={this.props.comments.comments.filter((comment) => comment.dish === match.params.dishId)}
                      commentsErrMess={this.props.comments.errMess}
                      postComment={this.props.postComment}
                      favorite={false}
                      postFavorite={this.props.postFavorite}
                      postCart={this.props.postCart}
                      deleteCart={this.props.deleteCart}
                      cart={false}
                  />
          );
      }
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/home',
              state: { from: props.location }
            }} />
      )} />
    );

    return (
      <div>
        <Header auth={this.props.auth} 
          loginUser={this.props.loginUser}
          signupUser={this.props.signupUser} 
          logoutUser={this.props.logoutUser} 
          />   
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} carts={this.props.carts} postCart={this.props.postCart}/>} />
              <Route exact path="/home" component={HomePage} />
              <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
              <Route exact path='/carts' component={Cartpage} />
              
      
              <Route path="/menu/:dishId" component={DishWithId} />
              <PrivateRoute exact path="/favorites" component={() => <Favorites favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite} />} />
              <Route exact path="/Carttwo" component={()=> <Carttwo CCarts={this.props.CCarts}  FetchHcart={this.props.FetchHcart}/> } />
              <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} feedbacks={this.props.feedbacks}/>} />
              <Route exact path="/feedus" component={() => <Feed  fetchFeedback={this.props.fetchFeedback} feedbacks={this.props.feedbacks} />} />
              <Redirect to="/menu" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
