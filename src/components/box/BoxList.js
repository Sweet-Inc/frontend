import { Link } from '@reach/router';

const BoxList = ({boxs}) => {
    
    return (  
          
      <div className="box-list">
        {boxs&& boxs.map((b) =>(
            <div className="box-l" key={b.id}>
                <Link to={`/boxdetail/${b.id}`}>
                <p>{b.quantity}</p>
              </Link>
                


            </div>
        ))}
      </div>      
    );
}
 
export default BoxList;