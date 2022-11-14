import { useDispatch } from 'react-redux';
import { addItem } from '../../features/cart/cartSlice';

const BoxList = ({ boxs }) => {
  const dispatch = useDispatch();

  console.log(boxs);
  return (
    <div className="box-list">
      {boxs &&
        boxs.map((item) => (
          <div className="pattern_coll" key={item.id}>
            <div className="nft_wrap">
              <span>
                <img
                  src={item.image}
                  className="lazy"
                  alt=""
                  style={{ objectFit: 'cover', height: '170px', width: '100%' }}
                />
              </span>
            </div>
            <div className="nft_coll_info">
              <br />
              <span onClick={() => console.log('clicked')}>
                <h4
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item.name}
                </h4>
              </span>
              <span>{item.price}.000VNĐ</span>
              <span
                className="btn-main lead"
                onClick={() => dispatch(addItem(item))}
              >
                Add to Cart
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BoxList;
