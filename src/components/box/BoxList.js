import { Link } from '@reach/router';

const BoxList = ({ boxs }) => {
  console.log(boxs)
  const data =[
    {
      id:1,
     myname: 'abc'
      
    },
    {
      id:2,
     myname: 'number 2'
      
    },
    {
      id:3,
     myname: 'numbber 3'
      
    },
    {
      id:4,
     myname: 'numbber 3'
      
    },
    {
      id:5,
     myname: 'numbber 3'
      
    },
    {
      id:6,
     myname: 'numbber 3'
      
    },
    {
      id:7,
     myname: 'numbber 3'
      
    },
    {
      id:8,
     myname: 'numbber 3'
      
    },
   
  ]
  return (
    <div className="box-list">
      {data &&
        data.map((b) => (
          <div className="box-list" key={b.id}>
            <div className="card">
              <div className="card_img">
                <img src={"./img/bg-shape-2.png"}  />
              </div>
              <div className="card_header">
                <h2>Header</h2>
                <p>{b.myname}</p>
                <p>price</p>
                <div className="button">Add to Cart</div>
              </div>
            </div>
            
          </div>
        ))}
    </div>
  );
};

export default BoxList;
