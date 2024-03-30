import { Link , useNavigate} from 'react-router-dom';
import styles from './login.module.css';

const Login = () => {
    const navigate = useNavigate();

    const onLogin = (e) => {
        e.preventDefault();
        navigate("/home");
    }

    return(
        <div className={styles.loginBg}>
            <form>
                <div className={styles.login}>
                    <header><h2>Sign In</h2></header>

                    <div className={styles.formElements}>
                        <label htmlFor="username"><h4>Email_ID</h4></label> &nbsp;
                        <input type="email" name="email"></input>
                    </div>

                    <div className={styles.formElements}>
                        <label htmlFor="password"><h4>Password</h4></label> &nbsp;
                        <input type="password" name="password"></input>
                    </div>

                    <div className={styles.formElements} >
                        <input onClick={(e)=>onLogin(e)} className={styles.buttonLogin} id="form-btn" type="submit" value="Login"></input>
                    </div>
                </div>
            </form>
        </div>
    );   
}
export default Login;