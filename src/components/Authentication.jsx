import { useState } from 'react';
import axios from 'axios';
import '../auth.css';
import { useNavigate } from 'react-router-dom';

export default function AuthenticationComponent() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
        setFormData({ ...formData, name: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(isSignUp)
        const endpoint = isSignUp ? 'http://localhost:3000/auth/signUp' : 'http://localhost:3000/auth/signIn';
        console.log(formData)
        try {
            const response = await axios.post(endpoint, formData);
            if (response.status ===  200) {
                alert(`${isSignUp ? 'Signup' : 'Login'} Successful!`);
                if(isSignUp){
                    toggleForm()
                }else{
                    setTimeout(() => {
                        navigate('/home');
                    }, 500);
                }
            } else {
                alert(`${isSignUp ? 'Signup' : 'Login'} Failed: ${response.data.msg}`);
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="page-container">
            <div className="auth-card">
                <div className="split-left">
                    <img src="src/assets/img/Kuari pass 4.jpg" alt="Authentication" />
                    <div className="overlay"></div>
                </div>

                <div className="split-right">
                    <div className="auth-container">
                        <div className="auth-header">
                            <h2>Uttarakhand Travels</h2>
                            <h2>{isSignUp ? 'Create an Account' : 'Welcome back'}</h2>
                            <p id="switchText">
                                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                                <button type="button" onClick={toggleForm}>
                                    {isSignUp ? 'Sign In' : 'Sign Up'}
                                </button>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            {isSignUp && (
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required={isSignUp}
                                    />
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {!isSignUp && (
                                <div className="login-extras">
                                    <div className="remember-me">
                                        <input type="checkbox" id="remember-me" name="remember-me" />
                                        <label htmlFor="remember-me">Remember me</label>
                                    </div>
                                    <a href="#" className="forgot-password">Forgot your password?</a>
                                </div>
                            )}

                            <button type="submit" className="submit-btn">
                                {isSignUp ? 'Sign Up' : 'Sign In'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}