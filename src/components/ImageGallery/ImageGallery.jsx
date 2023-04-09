import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import s from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import { GalleryLoader } from "../Loader/Loader";
import { fetchQuery } from "../Api/Api";
import { onErrorToast } from "../ErorrTost/ErorrTost";
import { onErrorToastNoMore } from "../ErorrTost/ErorrTost";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

function ImageGallery({ queriesName, handleImageClick }) {
  const [queries, setQueries] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (queriesName !== "") {
      setStatus(Status.PENDING);
      setPage(1);
      setQueries([]);
      setHasMore(true);
      fetchQueries();
    }
  }, [queriesName]);

  function fetchQueries() {
    fetchQuery(queriesName, page)
      .then((response) => {
        const newQueries = response.hits;
        if (newQueries.length === 0) {
          setHasMore(false);
          onErrorToast();
        } else {
          setQueries((prevQueries) => [...prevQueries, ...newQueries]);
          setPage((prevPage) => prevPage + 1);
          setStatus(Status.RESOLVED);
          if (newQueries.length < 12) {
            setHasMore(false);
          }
        }
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }

  function onLoadMoreBtn() {
    setTimeout(() => {
      fetchQueries();
    }, 500);
    scrollPageToEnd();
  }

  function scrollPageToEnd() {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 1000);
  }

  function renderQueries() {
    return (
      <>
        <ul className={s.ImageGallery}>
          {queries.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
              handleImageClick={handleImageClick}
            />
          ))}
        </ul>
        {!hasMore && onErrorToastNoMore()}
        {hasMore && (
          <Button onClick={onLoadMoreBtn} aria-label="Load More" />
        )}
      </>
    );
  }

  if (status === Status.IDLE) {
    return <h1 className={s.queryText}>Enter your request</h1>;
  }

  if (status === Status.PENDING && queries.length === 0) {
    return <GalleryLoader />;
  }

  if (status === Status.REJECTED) {
    return <h1>{error.message}</h1>;
  }

  if (status === Status.RESOLVED) {
    return renderQueries();
  }
}

ImageGallery.propTypes = {
  queriesName: PropTypes.string,
  handleImageClick: PropTypes.func,
};

export default ImageGallery;




// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import s from './ImageGallery.module.css';
// import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
// import Button from '../Button/Button';
// import {GalleryLoader } from '../Loader/Loader';
// import { fetchQuery } from '../Api/Api';
// import { onErrorToast} from '../ErorrTost/ErorrTost';
// import { onErrorToastNoMore} from '../ErorrTost/ErorrTost';


// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

// class ImageGallery extends Component {
//   state = {
//     queries: [],
//     error: null,
//     status: Status.IDLE,
//     page: 1,
//     hasMore: true
//   }

//   onLoadMoreBtn = (e) => {
//     e.preventDefault();
//     setTimeout(() => {
//       this.onFetchQuery();
//     }, 500);
//     this.scrollPageToEnd()
//   }

//   onFetchQuery() {
//     const searchQuery = this.props.queriesName;

//     const { page } = this.state;
//     fetchQuery(searchQuery, page)
//       .then((queries) => {
//         if (queries.hits.length === 0) {
//           this.setState({ hasMore: false }, () => {
//             onErrorToast();
//           });
//         } else {
//           this.setState((prevState) => ({
//             queries: [...prevState.queries, ...queries.hits],
//             page: this.state.page + 1,
//             status: Status.RESOLVED,
//           }));
//         }
//       })
//       .catch(error => this.setState({ error, status: Status.REJECTED }))
//   }

//   scrollPageToEnd = () => {
//     setTimeout(() => {
//       window.scrollBy({
//         top: document.documentElement.scrollHeight,
//         behavior: 'smooth',
//       })
//     }, 1000);
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const prevQue = prevProps.queriesName;
//     const nextQue = this.props.queriesName;

//     if (prevQue !== nextQue) {
//       this.setState({ status: Status.PENDING, page: 1, queries: [], hasMore: true })
//       setTimeout(() => {
//         this.onFetchQuery()
//       }, 500);
//     }
//   }

//   render() {
//     const { queries, error, status, hasMore } = this.state

//     if (status === Status.IDLE) {
//       return (
//         <>
//           <h1 className = {s.queryText}>Enter your request</h1>
//         </>
//       )
//     }
//     if(status === Status.PENDING){
//         return <GalleryLoader/>
//     }

//     if (status === Status.REJECTED) {
//       return (
//         <>
//           <h1>{error.message}</h1>
//         </>
//       )
//     }

//     if (status === Status.RESOLVED) {
//       return (
//         <>
//           <ul className={s.ImageGallery}>
//             {queries.map(({ id, webformatURL, largeImageURL, tags }) => (
//               <ImageGalleryItem
//                 key={id}
//                 webformatURL={webformatURL}
//                 largeImageURL={largeImageURL}
//                 tags={tags}
//                 handleImageClick={this.props.handleImageClick}
//               />
//             ))}
//           </ul>
//           {!hasMore && (
//           onErrorToastNoMore()
//             )}

//           {hasMore && (
//             <Button onClick={this.onLoadMoreBtn} aria-label="add" />
//           )}
//         </>
//       )
//     }
//   }
// }

// ImageGallery.propTypes = {
//   queries: PropTypes.arrayOf(PropTypes.object),
//   handleImageClick: PropTypes.func,
//   page: PropTypes.number,
// }

// export default ImageGallery;



