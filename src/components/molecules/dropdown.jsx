import React from 'react'
import { useNavigate } from 'react-router-dom'
import out from "../../assets/logout.svg"
import profile from "../../assets/user.svg"
import product from "../../assets/coffee.svg"
import triangle from "../../assets/triangle.svg"

export default function Dropdown({adminDropdown, userDropdown, logOut}) {

    const navigate = useNavigate()

    return (
        <>
            {adminDropdown &&
            <section className="dropdownSection">
                <ul className="dropdown">
                    <img className="dropdown-triangle" src={triangle} alt="white-triangle" />
                    <li onClick={ () => navigate('/add-product') }>
                        <img src={product} alt="icon" />
                        <p>Add Product</p>
                    </li>
                    <li onClick={ () => navigate('/products-list') }>
                        <img src={product} alt="icon" />
                        <p>Products List</p>
                    </li>
                    <li onClick={ logOut }>
                        <img src={out} alt="icon" />
                        <p>Logout</p>
                    </li>
                </ul>
            </section>
            }
        
        
        
            {userDropdown &&
            <section className="dropdownSection">
                <ul className="dropdown">
                    <img className="dropdown-triangle" src={triangle} alt="white-triangle" />
                    <li onClick={ () => navigate('/profile') }
                    >
                    <img src={profile} alt="icon" />
                    <p>Profile</p>
                    </li>
                    <li onClick={ logOut }
                    >
                    <img src={out} alt="icon" />
                    <p>Logout</p>
                    </li>
                </ul>
            </section>
            }
        
        </>
    )
}
