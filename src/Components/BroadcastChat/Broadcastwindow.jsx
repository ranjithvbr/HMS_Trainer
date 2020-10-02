import React from 'react';
import './Broadcastwindow.css';
import UserDp from '../BroadcastChat/UserDp';
import BroadMessagemaster from '../BroadcastChat/BroadMessagemaster';


class BroadcastWindow extends React.Component{
    render(){
        return(
            <div className = "full_container_broad">
                <div className ="first_column_div">
                        <UserDp/>
                </div>
                <div className = "second_column_div">
                   <BroadMessagemaster/>
                </div>

            </div>
        )
    }
}
export default BroadcastWindow;