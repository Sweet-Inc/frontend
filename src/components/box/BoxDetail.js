import { useParams } from "@reach/router";
import useFectch from "../../hook/GetFetch";

const BoxDetail = () => {
    const { id } = useParams();
    const{data:box, isPending, error}= useFectch('https://sweetincmgmtapi.azurewebsites.net/api/Boxes/GetByPrimaryKey/' +id);
   
    return (
        <div className="box-details">
            {isPending && <div>Loading..... </div>}
            {error && <div>{error}..... </div>}
            {box &&(<article>
                <p>{box.quantity}</p>

                </article>)}
        </div>
    );
}

export default BoxDetail;