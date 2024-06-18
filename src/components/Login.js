import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Typography, TextField, Button, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { loadSlim } from 'tsparticles-slim';
import { tsParticles } from 'tsparticles-engine';
import Particles from 'react-tsparticles';
import {Link} from "react-router-dom";
const BackgroundBox = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  zIndex: 0,
  backgroundColor: 'lightblue', 
});

const LoginContainer = styled(Container)({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const LoginPaper = styled(Paper)({
  padding: '2rem',
  maxWidth: '400px',
  width: '100%',
  textAlign: 'center',
  backgroundColor: 'lightblue', // Gray background color for the login card
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [init, setInit] = useState(false);

  useEffect(() => {
    const initializeParticles = async () => {
      await loadSlim(tsParticles);
      setInit(true);
    };
    initializeParticles();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BackgroundBox>
      {init && (
        <Particles
          id="tsparticles"
          options={{
            background: {
              color: { value: "lightblue" }
            },
            fpsLimit: 60,
            interactivity: {
              detectsOn: "canvas",
              events: {
                onClick: {
                  enable: true,
                  mode: "push"
                },
                onHover: {
                  enable: true,
                  mode: "trail"
                },
                resize: true
              },
              modes: {
                trail: {
                  enable: true,
                  distance: 100,
                  fillColor: "#ffffff",
                  length: 10,
                  delay: 0.3,
                  shadow: {
                    color: "#fff",
                    blur: 1
                  }
                },
                push: {
                  quantity: 4
                }
              }
            },
            particles: {
              color: {
                value: "#ffffff"
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1
              },
              collisions: {
                enable: true
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 2,
                straight: false
              },
              number: {
                density: {
                  enable: true,
                  value_area: 800
                },
                value: 80
              },
              opacity: {
                value: 0.5
              },
              shape: {
                type: "triangle" // Change shape to triangle
              },
              size: {
                random: true,
                value: 5
              }
            }
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '50%', 
            height: '100%',
            zIndex: -1,
          }}
        />
      )}
      <LoginContainer>
        <LoginPaper elevation={3}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
         <p>Create a user<Link style={{"listStyleType":"none"}} to="/register">Register</Link></p>
        </LoginPaper>
      </LoginContainer>
    </BackgroundBox>
  );
};

export default Login;
