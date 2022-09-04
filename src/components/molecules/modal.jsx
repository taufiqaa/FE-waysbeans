import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { UserContext } from "../../components/context/userContext";
import { API } from '../config/api';
import { useMutation } from 'react-query';


export function Login({modalLogin, setModalLogin, switchModal}) {
  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({ email: '', password: '' });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Create function for handle insert data process with useMutation here ...
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post('/login', body, config);
      // const { status, name, email, token } = response.data.data
      if (response?.status === 200) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data.data
        })

        if (response.data.data.status === "admin") {
          navigate('/income')
        } else {
          navigate('/')
        }
      }
      window.location.reload(false);
 
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">Failed</Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });
   return (
       <>
            { modalLogin &&
            <section className="modalSection"
            onClick={ () => setModalLogin(false) }
            >
                <form className="modalForm"
                onClick={ (e) => e.stopPropagation() }
                onSubmit={ (e) => handleSubmit.mutate(e) }
                >
                    <h2 >Login</h2>
                    { message && message }
                    <input className="emailModal"
                    type="email"
                    id="email" name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChange}
                    required
                    />
                    <input className="passwordModal"
                    type="password"
                    id="password" name="password"
                    placeholder="Password"
                    value={password}
                    onChange={ handleChange }
                    required
                    />
                    <button className="submitModal"
                    type="submit"
                    >Login</button>
                    <p className="switchModalLink">Don't have an account ? Click <strong className="cursor-pointer"
                    onClick={ switchModal }
                    >Here</strong>
                    </p>
                </form>
            </section>
            }
            </>
    )
}

export function Register({modalRegister, setModalRegister, switchModal}) {
    //   const [state, dispatch] = useContext(UserContext);

    const [message, setMessage] = useState(null);

    // Create variabel for store data with useState here ...
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        post_code:'',
    });

    const { name, email, password, address, post_code } = form;

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    // Create function for handle insert data process with useMutation here ...
    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            // Configuration Content-type
            const config = {
                headers: {
                'Content-type': 'application/json',
                },
            };

            // Data body
            const body = JSON.stringify(form);

            // Insert data user to database
            const response = await API.post('/register', body, config);
            console.log(response)
            // Handling response here
            const alert = (
                <Alert variant="success" className="py-1">Successfully Register</Alert>
            );
            setMessage(alert);

        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">Failed</Alert>
            );
            setMessage(alert);
            console.log(error);
        }
    });
    return (
      <>
            { modalRegister &&
            <section className="modalSection"
            onClick={ () => setModalRegister(false) }
            >
                <form className="modalForm"
                onClick={ (e) => e.stopPropagation() }
                onSubmit={ (e) => handleSubmit.mutate(e) }
                >
                    <h2>Register</h2>
                    { message && message }
                    <input className="emailModal"
                    type="email"
                    id="email" name="email"
                    placeholder="Email"
                    value={email}
                    onChange={ handleChange }
                    />
                    <input className="passwordModal"
                    type="password"
                    id="password" name="password"
                    placeholder="Password"
                    value={password}
                    onChange={ handleChange }
                    />
                    <input className="emailModal"
                    type="text"
                    id="name" name="name"
                    placeholder="Full Name"
                    value={name}
                    onChange={ handleChange }
                    />
                    <input className="passwordModal"
                    type="text"
                    id="address" name="address"
                    placeholder="Address"
                    value={address}
                    onChange={ handleChange }
                    />
                    <input className="emailModal"
                    type="text"
                    id="post_code" name="post_code"
                    placeholder="Post Code"
                    value={post_code}
                    onChange={ handleChange }
                    />
                    <button className="submitModal"
                    type="submit"
                    >Register</button>
                    <p className="fs0-9 fw500 ta-center">Already have an account ? Click <strong className="cursor-pointer"
                    onClick={ switchModal }
                    >Here</strong>
                    </p>
                </form>
            </section>
            }
            </>
    )
}