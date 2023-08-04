import React from "react";
import Main from './main/Main';
import Onboarding from './onboarding/Onboarding';

const App = () => {
    const [user, setUser] = React.useState(null);
    const [users, setUsers] = React.useState(null);

    React.useEffect(() => {
        if (user === null) { return; }
        console.log(`The user has updated:\nUser: `, user);
    }, [user]);

    return (
        user === null || users === null
            ? <Onboarding setUser={setUser} setUsers={setUsers} />
            : <Main user={user} users={users} setUser={setUser} setUsers={setUsers} />
    );
}

export default App;