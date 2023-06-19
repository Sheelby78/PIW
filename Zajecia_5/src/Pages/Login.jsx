import { logInWithGoogle, useUser, logOut, logInWithTwitter} from "../firebase/AuthService";
const Login = () => {

    const user = useUser();

    if(user)
    return (
        <div className="App">
            <h2>You are logged in as {user.displayName}</h2>
            <button onClick={logOut}>
                Log me out</button>
        </div>
        );

    return (
        <div>
             <div className="App">
                <h2>Please log in with Google</h2>
                <button onClick={logInWithGoogle}>
                    Login with Google</button>
            </div>
            <div className="App">
                <h2>Please log in with Twitter</h2>
                <button onClick={logInWithTwitter}>
                    Login with Twitter</button>
            </div>
        </div>
        );
}

export default Login;
