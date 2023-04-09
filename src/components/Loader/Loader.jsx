import{ Circles} from "react-loader-spinner";
import s from './Loader.module.css';

export const GalleryLoader = () => (
  <div className={s.loader}>
    <Circles
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
  </div>
)

export const ModalLoader = () => (
  <div className={s.loader}>
  <Circles
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
  </div>
)