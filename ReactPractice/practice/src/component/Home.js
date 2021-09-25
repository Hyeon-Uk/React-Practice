import React from 'react';

function Home(props){
    return(
        <div>
            Home
            <p>
                id:{props.user.id}
            </p>
            <p>
                pass:{props.user.pass}
            </p>
        </div>
    );
}

export default Home;