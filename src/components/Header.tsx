import React from 'react';
import logo from '../assets/images/pirate-nation-logo.png';

const Header = () => {
    return (
        <header className='mx-auto max-w-5xl flex flex-col justify-center'>
            <div className='flex justify-center'>
                <img src={logo} className="" alt="logo" />
            </div>            
            <div className='flex flex-col justify-center content-center align-middle'>
                <h1 className='font-blackbeard text-white text-5xl'>Ahoy Matey! Welcome t' th' maze generator!</h1>
                {/* <h2>To get your booty ya'll have to solve the maze and get to the island.</h2> */}
            </div>
        </header>
    )
};

export default Header;