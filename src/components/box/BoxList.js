import { Link } from '@reach/router';
import { useDispatch } from 'react-redux';
import { addItem } from '../../features/cart/cartSlice';

const BoxList = ({ boxs }) => {
  const dispatch = useDispatch();

  console.log(boxs);

  return (
    <div className="box-list">
      {boxs &&
        boxs.map(
          (item) =>
            item.status && (
              <div className="pattern_coll" key={item.boxId}>
                <div className="nft_wrap">
                  <span>
                    <img
                      src={item.image}
                      className="lazy img-fluid"
                      alt=""
                      style={{
                        objectFit: 'cover',
                        height: '170px',
                        width: '100%',
                      }}
                    />
                  </span>
                </div>
                <div className="nft_coll_info">
                  <br />
                  <span>
                    <Link to={`/boxdetail/${item.boxId}`}>
                      <h4
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.name}
                      </h4>
                    </Link>
                  </span>
                  <span>{item.price}.000VNĐ</span>
                  <span>&nbsp;</span>
                  <span
                    className="btn-main lead"
                    onClick={() => dispatch(addItem(item))}
                  >
                    Add to Cart
                  </span>
                </div>
              </div>
            )
        )}
    </div>
  );
};

export default BoxList;
