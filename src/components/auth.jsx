import React, { useState } from 'react';
import axios from 'axios';

const AuthComponent = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isSignUp) {
        const response = await axios.post('http://localhost:5000/api/auth/signUp', {
          name,
          email,
          password,
        });

        if (response.status === 201) {
          alert('Signup Successful! Please Log In.');
          toggleForm();
        } else {
          alert('Signup Failed: ' + response.data.msg);
        }
      } else {
        const response = await axios.post('http://localhost:5000/api/auth/signIn', {
          email,
          password,
        });

        if (response.status === 200) {
          alert('Login Successful! Redirecting...');
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 500);
        } else {
          alert('Login Failed: ' + response.data.msg);
        }
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'linear-gradient(135deg, #f6f8fb 0%, #e9edf3 100%)'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '1000px',
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
        minHeight: '600px',
        transform: 'perspective(1000px) rotateY(0deg)',
        transition: 'transform 0.6s'
      }} onMouseOver={() => this.style.transform = 'perspective(1000px) rotateY(2deg)'} onMouseOut={() => this.style.transform = 'perspective(1000px) rotateY(0deg)'}>
        <div style={{
          position: 'relative',
          width: '45%',
          overflow: 'hidden'
        }}>
          <img src="./src/assets/img/Kuari pass_.jpg" alt="" style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s ease-in-out'
          }} onMouseOver={() => this.style.transform = 'scale(1.1)'} onMouseOut={() => this.style.transform = 'scale(1)'}/>
          <div style={{
            position: 'absolute',
            inset: '0',
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              color: 'white'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1rem', filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}>
                <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
              </svg>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>Uttarakhand Travels</h2>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'rgb(17, 24, 39)', marginBottom: '0.5rem' }}>{isSignUp ? 'Create an Account' : 'Welcome back'}</h2>
              <p style={{ fontSize: '0.875rem', color: 'rgb(75, 85, 99)' }}>
                {isSignUp ? (
                  <>Already have an account? <button onClick={toggleForm} style={{ color: 'rgb(37 99 235)', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}>Sign In</button></>
                ) : (
                  <>Don't have an account? <button onClick={toggleForm} style={{ color: 'rgb(37 99 235)', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}>Sign Up</button></>
                )}
              </p>
            </div>
          </div>
        </div>

        <div style={{
          width: '55%',
          padding: '3rem',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{ width: '100%', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'rgb(17, 24, 39)', marginBottom: '0.5rem' }}>{isSignUp ? 'Create an Account' : 'Welcome back'}</h2>
            </div>

            <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
              {isSignUp && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <label htmlFor="name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'rgb(55, 65, 81)', marginBottom: '0.5rem' }}>Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1.5px solid rgb(229, 231, 235)',
                      borderRadius: '0.75rem',
                      outline: 'none',
                      transition: 'all 0.2s',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>
              )}

              <div style={{ marginBottom: '1.25rem' }}>
                <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'rgb(55, 65, 81)', marginBottom: '0.5rem' }}>Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1.5px solid rgb(229, 231, 235)',
                    borderRadius: '0.75rem',
                    outline: 'none',
                    transition: 'all 0.2s',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label htmlFor="password" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'rgb(55, 65, 81)', marginBottom: '0.5rem' }}>Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1.5px solid rgb(229, 231, 235)',
                    borderRadius: '0.75rem',
                    outline: 'none',
                    transition: 'all 0.2s',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              {isSignUp && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '1.5rem 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" id="remember-me" name="remember-me" />
                    <label htmlFor="remember-me">Remember me</label>
                  </div>
                  <a href="#" style={{ fontSize: '0.875rem', color: 'rgb(37 99 235)', fontWeight: '500' }}>Forgot your password?</a>
                </div>
              )}

              <button type="submit" style={{
                width: '100%',
                backgroundColor: 'rgb(37 99 235)',
                padding: '0.75rem 1rem',
                border: 'none',
                borderRadius: '0.75rem',
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}>
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
