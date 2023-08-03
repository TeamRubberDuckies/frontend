import React from "react";
import Dashboard from './dashboard/Dashboard';
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
            : <Dashboard user={user} users={users} />
    );
}

export default App;