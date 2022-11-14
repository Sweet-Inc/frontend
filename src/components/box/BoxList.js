import { Link } from '@reach/router';
import { useDispatch } from 'react-redux';
import { addItem } from '../../features/cart/cartSlice';

const BoxList = ({ boxs }) => {
  const dispatch = useDispatch();
  return (
    <div className="box-list">
      {boxs &&
        boxs.map((item) => (
          <div className="pattern_coll" key={item.id}>
            <Link to ={`/boxdetail/${item.id}`}>
            <div className="nft_wrap">
              <span>
                <img
                  src={item.image}
                  className="lazy img-fluid"
                  alt=""
                />
              </span>
            </div>
            <div className="nft_coll_info">
              <br />
              <span onClick={() => console.log('clicked')}>
                <h4>{item.name}</h4>
              </span>
              <span>{item.price}.000VNĐ</span>
              <span
                className="btn-main lead"
                onClick={() => dispatch(addItem())}
              >
                Add to Cart
              </span>
            </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default BoxList;
