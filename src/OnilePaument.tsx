import './OnlinePayment.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import paymentIconsVisa  from  './assets/viasCard.png';
import paymentIconsMaster  from  './assets/1322426_card_master_master card_master card new logo_method_icon.png';
import React, { useState } from 'react';
import { ChangeEvent } from 'react';
import axios from 'axios';





function OnlinePayment()
  {
    
  //----------------------------------------------------------------------------------
  //This state is for resetting the card icon
  const [paymentTypeIcon, setIcon] = useState(paymentIconsMaster);

  const [validation, setValidation] = useState({
    amount:'',
    cardnumber:'',
    securitycode:'',
    expiry:'',
    agree:'',
    cardholder:''
   
  })
const [errors, setErrors] = useState({
    amount:'',
    cardnumber:'',
    securitycode:'',
    expiry:'',
    agree:'',
    
    
})
const [checkedv, setcheckedv] = useState(false)

  function checkValues(event: ChangeEvent){
    const newvalues = {...validation,[(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value}
      setValidation(newvalues);
      
  }

  function agreeCheck(event: ChangeEvent)
  {

   if ((event.target as HTMLInputElement).checked){
     setcheckedv(true)
   }
   else{
    setcheckedv(false)
   }
   
  }

function getValues(event: React.FormEvent){
  const er = {
    amount:'',
    cardnumber:'',
    securitycode:'',
    expiry:'',
    agree:'',
   
  }
  
  if (validation.cardnumber.length !== 16){
    er.cardnumber = "Wrong card number"
    event.preventDefault()
  }
else if (parseInt(validation.amount) <= 0) {
    er.amount = "Less than (1)"
    event.preventDefault()
  }
 else if(parseInt(validation.securitycode) < 2){
    er.securitycode = "Wrong Code"
    event.preventDefault()
  }
  
 else if(checkedv === false){
    er.agree = "Agree to Conditions"
    event.preventDefault()
  }
  else{
    const url ='htp//localhost/paymentController.php'
let postedData = new FormData()
postedData.append('amount',validation.amount)
postedData.append('cardholder',validation.cardholder)
postedData.append('cardnumber',validation.cardnumber)
postedData.append('securitycode',validation.securitycode)
postedData.append('expiry',validation.expiry)
axios.post(url,postedData)
  }

  setErrors(er) 
}
   

    
   
    // This function is for setting the icon of the selected payment card on the top of the selected card type
    function paymentMethod  (event: ChangeEvent) {
      const valueselect = (event.target as HTMLInputElement).value
        if (valueselect === "Master"){
          setIcon(paymentIconsMaster) 
        }
        else{
          setIcon(
           paymentIconsVisa
          )
        }
    }
     // This is the rerund main Html componant of the payment page 
  return (
     
     <form onSubmit={getValues}>
      <div className="main-div">
        
            <div className='payment-method'>
              <h3 className='h3'>Payment</h3>
              <img className='card-image' width = {80} height={50} src={paymentTypeIcon}/>
            </div>
            <label className='title'>Payment Method</label>
            <select onChange={paymentMethod} name="card" className="card">
            <option value="Master">Master card</option>
            <option value="Visa">Visa Card</option>
             </select> 
             <input  onChange={checkValues} name='amount'  className="amount" type='number' placeholder='Amount' required/>
             {errors.amount && <p  className='al-message'>{errors.amount}</p>}
             <input onChange={checkValues} name='cardholder'  className='card-holder' type='text' placeholder='Card holder' required/>
             
             <input onChange={checkValues} name='cardnumber'  className='card-number' type='number' placeholder='Card Number' required/>
             {errors.cardnumber && <p  className='al-message'>{errors.cardnumber}</p>}
             <input onChange={checkValues} name='expiry'  className="expiry"  id="expiry" type="month" placeholder='Expiry Date' required/>
             {errors.expiry && <p  className='al-message'>{errors.expiry}</p>}
             <input onChange={checkValues} name='securitycode'  className='security-code' type='password' maxLength={4} placeholder='Security Code' required/>
             {errors.securitycode && <p  className='al-message'>{errors.securitycode}</p>}
             <div>
             <input value="false" onChange={agreeCheck}  name= "agree" className='agree'type='checkbox'/>
             <label > I agree to proceed the payment</label>
             {errors.agree && <p  className='al'>{errors.agree}</p>}
             </div>
             
             <button   className='pay' type='submit'>Pay</button>
            
            </div>  
            </form>);
  }

  
export default OnlinePayment;