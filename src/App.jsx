import React, { useState } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { ModalLoader } from './components/Loader/Loader';
import PropTypes from 'prop-types'
import Searchbar from './components/SeacrhBar/Searchbar';
import Modal from './components/Modal/Modal';
import ImageGallery from './components/ImageGallery/ImageGallery';


function App() {
  const [isShow, setIsShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [queriesName, setQueriesName] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');
  const [imgTags, setImgTags] = useState('');

  const toggleModal = () => {
    setIsShow(isShow => !isShow);
  };

  const handleFormSubmit = (queriesName) => {
    setQueriesName(queriesName);
  };

  const handleImageClick = (largeImageURL, imgTags) => {
    setLargeImageURL(largeImageURL);
    setImgTags(imgTags);
    setLoader(true);
    toggleModal();
  };

  const hideModalLoader = () => {
    setLoader(false);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={4000} />
      <ImageGallery
        queriesName={queriesName}
        handleImageClick={handleImageClick}
      />
      {isShow && (
        <Modal onClose={toggleModal}>
          {loader && <ModalLoader />}
          <img
            src={largeImageURL}
            alt={imgTags}
            onLoad={hideModalLoader}
          />
        </Modal>
      )}
    </>
  );
}

App.propTypes = {
  isShow: PropTypes.bool,
  queriesName: PropTypes.string,
  loader: PropTypes.bool,
}

export default App;


// import React, { Component } from 'react';
// import './App.css';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'
// import { ModalLoader } from './components/Loader/Loader';
// import PropTypes from 'prop-types'
// import Searchbar from './components/SeacrhBar/Searchbar';
// import Modal from './components/Modal/Modal';
// import ImageGallery from './components/ImageGallery/ImageGallery';


// class App extends Component{
//   state = {
//     isShow: false,
//     loader: false,
//     queriesName: '',
//     largeImageURL: '',
//     imgTags: '',
//   }

//   toggleModal=()=>{
//     this.setState(({isShow})=>({isShow: !isShow}))
//   }

//   handleFormSubmit = (queriesName) => {
//     this.setState({ queriesName })
//   }


//   handleImageClick=(largeImageURL, imgTags)=>{
//     this.setState({largeImageURL, imgTags, loader: true})
//     this.toggleModal()
//   }

//   hideModalLoader=()=> this.setState({loader: false})

//   render() {
//      const { isShow, queriesName , largeImageURL, imgTags, loader } = this.state
//     return (
//       <>
//         <Searchbar onSubmit={this.handleFormSubmit} />

//         <ToastContainer autoClose={4000} />
//         <ImageGallery
//           queriesName={queriesName}
//           handleImageClick={this.handleImageClick}
//         />

//         {isShow && (
//           <Modal onClose={this.toggleModal}>
//             {loader && <ModalLoader />}
//             <img
//               src={largeImageURL}
//               alt={imgTags}
//               onLoad={this.hideModalLoader}
//             />
//           </Modal>
//         )}
//       </>
//     )
//   }
// }

// App.propTypes = {
//   isShow: PropTypes.bool,
//   queriesName: PropTypes.string,
//   loader: PropTypes.bool,
// }

// export default App;