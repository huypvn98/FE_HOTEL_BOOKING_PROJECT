import React from 'react';
import ContactForm from './ContactForm.jsx';
import contactImage from "../../../assets/image 2.png";

function ContactPage() {
    return (
        <div className='mb-[160px] mt-[200px] px-[400px] flex justify-around flex-row space-x-4'>
            <img loading='lazy' src={contactImage} alt='contact image' className='w-[400px] h-[500px]' />
            <ContactForm />
        </div>
    );
}

export default ContactPage;