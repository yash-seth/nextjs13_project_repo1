'use client'
import React, { useState } from 'react';
import '../styles/contactCard.css';

const ContactCard = () => {
  const [user, setUser] = useState({
    username:"",
    email:"",
    phone:"",
    message:""
  });

  const [stats,setstats] = useState("");

  function handlechange(e){
    const name = e.target.name;
    const value = e.target.value;
    setUser((prevuser)=>({...prevuser,[name]:value}));
  }

  const handleSubmit = async(e) =>{
      e.preventDefault();
      try{
        const response = await fetch('api/contact',{
          method:'POST',
          headers:{"Content_Type":"application/json"},
          body: JSON.stringify({
            username: user.username,
            email: user.email,
            phone: user.phone,
            message: user.message
          })
        })
          if(response.status==200){
            setUser({
              username:"",
              email:"",
              phone:"",
              message:""
            })
            setstats("success");
            setTimeout(()=>{
              setstats("");
            },3000);
          }else{
            setstats("error");
            setTimeout(()=>{
              setstats("");
            },3000);
          }
      }catch(e){
          console.log(e);
      }
  }

  return (<>
    <div className="center">
      <form className="contact-card" onSubmit={handleSubmit}>
        <h2 className="contact-name">Contact Us</h2>
        
        <div className="contact-info">
          <label for="fname" className="contact-label">Name</label>
          <input className="contact-input" placeholder='Name' id="fname" type='text' name="username" value={user.username} onChange={handlechange}/>

          <label for="email" className="contact-label">Email</label>
          <input className="contact-input" placeholder='Email' id="email" type='email' name="email" value={user.email} onChange={handlechange}/>

          <label for="phone" className="contact-label">Phone</label>
          <input className="contact-input" placeholder='Phone' id="phone" type='phone' name="phone" value={user.phone} onChange={handlechange}/>

          <label for="message" className="contact-label">Message</label>
          <textarea className="contact-textarea" placeholder='Message' id="message" type='text' name="message" value={user.message} onChange={handlechange}/>
        </div>
        <button className='submit_btn' onClick={handleSubmit} type='submit'>Submit</button>
        {stats==="success" && <p style={{backgroundColor:"green"}} className='alert'>Thanks you for your message. We will contact you as soon as possible.</p>}
        {stats==="error" && <p style={{backgroundColor:"#f44336"}} className='alert'>Error Occured while submitting form.</p>}
      </form>
    </div>
    </>
  )
}

export default ContactCard;
