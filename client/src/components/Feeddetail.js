import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem,Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import alberto from './images/alberto.png';


    function RenderFeedItem({ feed, onClick }) {
        return(
            <div>

<Media tag="li">
            <Media left middle>
                <Media object src={alberto } alt={feed.name} />
            </Media>
            <Media body className="ml-5">
                <Media heading>{feed.firstname}</Media>
                <p>{feed.lastname}</p>
                <p>{feed.message}</p>
            </Media>
        </Media>
              
            </div>
        );
    }

    const Feed = (props) => {
        console.log(props.feedbacks)

        const Feed = props.feedbacks.feedbacks.map((feed) => {
            console.log(feed)
            return (
                <div key={feed._id} className="col-12 col-md-5 m-1">
                    <RenderFeedItem feed={feed} />
                </div>
            );
        });

        if (props.feedbacks.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.feedbacks.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.feedbacks.errMess}</h4>
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
                            <BreadcrumbItem active>Feed</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Feed</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md align-items-center justify-content-center">{Feed}</div>
                    </div>
                </div>
            );
    }

export default Feed;