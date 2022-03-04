import Avatar from "./Avatar";
import "./css/Friendlist.css";

function Friendlist (props) {
    let data = props.data;

    return (
        <div className = "friendlist">
            {
              data.map((item,index) => {
                return (<div key = {index} className = {'friendlist-item ${item.position'}>
                    <div>{item.displayName}</div>
                    <Avatar name={item.user}/>   
                </div>)
              })    
            }
        </div>
    )
}

export default Friendlist;