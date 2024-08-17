"use client"
import React , {useState , useEffect} from "react";
import {getAuth , RecaptchaVerifier , signInWithPhoneNumber} from "firebase/auth";
import {app} from './config';
import {useRouter} from "next/navigation";


export default function Login(){
const [phoneNumber , setPhoneNumber] = useState('');
const [otp , setOtp] = useState('')
const [confirmationResult , setconfirmationResult] = useState(null)
const [otpSent , setOtpSent] = useState(false)



const auth = getAuth(app);
const router= useRouter();
useEffect(()=>{
    window.RecaptchaVerifier = new RecaptchaVerifier(auth , "recaptcha-container",{
        'size':'normal',
        'callback' : (response)=> {

        },
        'expired-callback': () => {

        }
    });
},[auth]);
const handlePhoneNumberChange = (e) =>{
    setPhoneNumber(e.target.value);
};
const handleOTPChange = (e) =>{
    setOtp(e.target.value);
}
const handleSendOtp = async () =>{
    try{
        const formattedPhoneNumber = `${phoneNumber.replace(/\D/g,'')}`;
   
        const confirmation = await signInWithPhoneNumber(auth , formattedPhoneNumber , window.RecaptchaVerifier)
        setconfirmationResult(confirmation);
        setOtpSent(true);
        setPhoneNumber('');
        alert('OTP has been sent');
    }catch (error){
        console.log(error)
    }
};
const handleOTPSubmit = async ()=>{
    try{
        await confirmationResult.confirm(otp);
        setOtp('');
        router.push('/');

    }
    catch(error){
        console.log(error);
    }
};
return (
    <div>
{!otpSent ? (
    <div id="recaptcha-container"></div>
):null}
<input 
type="tel"
value={phoneNumber}
onChange={handlePhoneNumberChange}
placeholder="Enter Phone Number with country code"
className="border border-gray-500 p-2 rounded-md"
/>
<input 
type="text"
value={otp}
onChange={handleOTPChange}
placeholder="Enter OTP"
className="border border-gray-500 p-2 rounded-md"
/>
<button onClick={otpSent ? handleOTPSubmit : handleSendOtp}
className ={`bg-${otpSent ? 'green':'blue'}-500 text-white p-2 rounded-md m-2`}
style={{backgroundColor: otpSent? 'green':'blue'}}
>
{otpSent? 'submit otp' : ' send otp'}
</button>
    </div>
)

}