import React from 'react';
import Login from './Login';
import SignUp from './SignUp';

const Onboarding = props => {
    const [showingLogin, setShowingLogin] = React.useState(true);
    

    return (
        showingLogin
        ? <Login setShowingLogin={setShowingLogin} setUser={props.setUser} setUsers={props.setUsers} />
        : <SignUp setShowingLogin={setShowingLogin} setUser={props.setUser} setUsers={props.setUsers} />
    )
};

export default Onboarding;