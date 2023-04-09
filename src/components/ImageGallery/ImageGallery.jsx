

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import { GalleryLoader } from '../Loader/Loader';
import { fetchQuery } from '../Api/Api';
import { onErrorToast } from '../ErorrTost/ErorrTost';
import { onErrorToastNoMore } from '../ErorrTost/ErorrTost';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const ImageGallery = ({ queriesName, handleImageClick }) => {
  const [queries, setQueries] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const onLoadMoreBtn = (e) => {
    e.preventDefault();
    setTimeout(() => {
      onFetchQuery();
    }, 500);
    scrollPageToEnd();
  };

  const onFetchQuery = () => {
    const searchQuery = queriesName;

    fetchQuery(searchQuery, page)
      .then((res) => {
        const { hits } = res;

        if (hits.length === 0) {
          setHasMore(false);
          onErrorToast();
        } else {
          setQueries((prevQueries) => [...prevQueries, ...hits]);
          setPage((prevPage) => prevPage + 1);
          setStatus(Status.RESOLVED);
        }
      })
      .catch((err) => {
        setError(err);
        setStatus(Status.REJECTED);
      });
  };

  const scrollPageToEnd = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };

  useEffect(() => {
    if (queriesName) {
      setStatus(Status.PENDING);
      setPage(1);
      setQueries([]);
      setHasMore(true);

      setTimeout(() => {
        onFetchQuery();
      }, 500);
    }
     // eslint-disable-next-line
  }, [queriesName]);

  return (
    <>
      {status === Status.IDLE && <h1 className={s.queryText}>Enter your request</h1>}
      {status === Status.PENDING && <GalleryLoader />}
      {status === Status.REJECTED && <h1>{error.message}</h1>}
      {status === Status.RESOLVED && (
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
          {hasMore && queries.length >= 12 && (
            <Button onClick={onLoadMoreBtn} aria-label="add" />
          )}
        </>
      )}
    </>
  );
};

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



