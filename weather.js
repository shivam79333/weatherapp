 let searchurl="https://api.weatherapi.com/v1/search.json?key=5c98daaa8f19430698e81443250712&q="

 let weatherurl="https://api.weatherapi.com/v1/current.json?key=5c98daaa8f19430698e81443250712&q="

 let userlogin=null;
let searchdata;
 let searchsuggression=async ()=>{
        let input=document.getElementById("navinput").value;
        let res=await fetch(searchurl+input);
        let data=await res.json();
        searchdata=data;
        if(data.length>0){
        document.getElementsByClassName("suggestionitems")[0].style.visibility="visible";
        document.getElementById("suggerror").style.visibility="hidden";
        document.getElementById("sugg1").text=data[0].name;
        document.getElementById("sugg2").text=data[1].name;
        document.getElementById("sugg3").text=data[2].name;
        document.getElementById("sugg4").text=data[3].name;
        document.getElementById("sugg5").text=data[4].name;
        }
        else{
            document.getElementsByClassName("suggestionitems")[0].style.visibility="hidden";
            document.getElementById("suggerror").style.visibility="visible";
        }
        
 }

//  weather data 
let weatherdata;
 let weatherdetail= async () => {
     let rel= await fetch(weatherurl+cityname)
     let data=await rel.json();
     weatherdata=data;
    
     document.getElementById("cityName").innerText=`${weatherdata.location.name}`;
     document.getElementById("temperature").innerText=`${weatherdata.current.temp_c} °C`;
     document.getElementById("weatherIcon").innerHTML=`<img src="https:${weatherdata.current.condition.icon}" >`;
     document.getElementById("weatherDescription").innerText=`${weatherdata.current.condition.text}`;
     document.getElementById("humidity").innerText=`${weatherdata.current.humidity} %`;
     document.getElementById("windSpeed").innerText=`${weatherdata.current.wind_kph} km/h`;
     document.getElementById("pressure").innerText=`${weatherdata.current.pressure_mb} hPa`;

    // Change background
    if(weatherdata.current.is_day===0){
    document.querySelector("body").style.background="linear-gradient(to bottom, #02030A, #0A1A2F)";
    }
    else{
       document.querySelector("body").style.background="linear-gradient(to bottom, #020a5a, #0260b3)";
    };
   
    // for time and date

    let localtime = weatherdata.location.localtime; 
    let [date, time] = localtime.split(" ");

    let dateObj = new Date(date);
    let formattedDate = dateObj.toLocaleDateString("en-US", {
       weekday: "long",
       month: "long",
       year: "numeric",
       day: "numeric"
    });
    
    document.getElementById("currentDate").innerText=formattedDate ;
    document.getElementById("currenttime").innerText=time;

   






 }



 document.getElementById("navinput").addEventListener("input", ()=>{
        searchsuggression();
        document.getElementsByClassName("searchsuggestions")[0].style.visibility="visible";
        document.getElementsByClassName("prewsearched")[0].style.visibility="hidden";
         })

document.getElementById("navinput").addEventListener("blur", ()=>{setTimeout(()=>{
    document.getElementsByClassName("searchsuggestions")[0].style.visibility="hidden";
    document.getElementsByClassName("suggestionitems")[0].style.visibility="hidden";
    document.getElementById("suggerror").style.visibility="hidden";
    document.getElementsByClassName("prewsearched")[0].style.visibility="hidden";

    }, 200)});
  
document.getElementById("navinput").addEventListener("focus", ()=>{
  document.getElementsByClassName("prewsearched")[0].style.visibility="visible";
  document.getElementsByClassName("favsuggestions")[0].style.visibility="hidden"


})

// login page and register page toggling

document.getElementsByClassName("login")[0].addEventListener("click", ()=>{
   if(userlogin==null) {document.getElementsByClassName("logintab")[0].style.visibility="visible";}
})


document.getElementsByClassName("closebtn")[0].addEventListener("click", ()=>{
    document.getElementsByClassName("logintab")[0].style.visibility="hidden";
})

document.getElementsByClassName("closebtn")[1].addEventListener("click", ()=>{
    document.getElementsByClassName("registertab")[0].style.visibility="hidden";
})

document.getElementsByClassName("favclose")[0].addEventListener("click", ()=>{
    document.getElementsByClassName("favsuggestions")[0].style.visibility="hidden";
})

document.getElementsByClassName("signupredirect")[0].addEventListener("click", ()=>{
    document.getElementsByClassName("logintab")[0].style.visibility="hidden";
    document.getElementsByClassName("registertab")[0].style.visibility="visible";
})

document.getElementsByClassName("logindirect")[0].addEventListener("click", ()=>{
    document.getElementsByClassName("logintab")[0].style.visibility="visible";
    document.getElementsByClassName("registertab")[0].style.visibility="hidden";
})

 // registering a user


document.getElementById("registerbtn").addEventListener("click", (e)=>{
    e.preventDefault();
    let fname=document.getElementById("fname").value;
    let lname=document.getElementById("lname").value;
    let email=document.getElementById("email").value;
    let username=document.getElementById("regusername").value;
    let password=document.getElementById("regpassword").value;
    let confpassword=document.getElementById("confpassword").value;
    if(fname==="" || email==="" || username==="" || password==="" || confpassword===""){
        alert("please fill all the fields");
        return;
    }
    
    if(password.length<5){
        alert("Password should be minimum of 5 characters");
        return;
    }

    if(password!==confpassword){
        alert("passwords do not match");
        return;
    }

    // email format validation
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        alert("please enter a valid email address");
        return;
    }

    if(localStorage.getItem(username)!==null){
        alert("username already exists, please choose a different username");
        return;
    }


     let user={
        fname:fname,
        lname:lname,
        email:email,
        username:username,
        password:password
     }
        
     localStorage.setItem(username, JSON.stringify(user));
        alert("registration successful, please login");
        document.getElementsByClassName("registertab")[0].style.visibility="hidden";
        document.getElementsByClassName("logintab")[0].style.visibility="visible";
})

// logging in a user


document.getElementById("loginbtn").addEventListener("click", (e)=>{
    e.preventDefault();
    let username=document.getElementById("username").value;
    let password=document.getElementById("password").value;
    let entereduser=localStorage.getItem(username);
    if(entereduser==null){
        alert("user not found, please register");
        return;
    }
    userobj=JSON.parse(entereduser);
    if(userobj.password!==password){
        alert("incorrect password");
        return;
    }
    alert("login successful");
    localStorage.setItem("login", JSON.stringify(userobj));
    location.reload();
   

})

userlogin=JSON.parse(localStorage.getItem("login"));

if(userlogin===null){
    setTimeout(() => {document.getElementsByClassName("registertab")[0].style.visibility="visible";}, 13000);
   }




// saving last searched location and defining cityname.
let cityname;
document.getElementsByClassName("searchbtn")[0].addEventListener("click", ()=>{
    if(document.getElementById("navinput").value===""){
        alert("please enter a city name");
        return;
    }
    if(searchdata.length>0){
        cityname=searchdata[0].name;
        document.getElementById("navinput").value=cityname;
        weatherdetail();
    }
    if(searchdata.length===0){
        document.getElementById("navinput").value="";
    }
})

for(let i=1;i<=5;i++){
document.getElementById(`sugg${i}`).addEventListener("click", ()=>{
    cityname=document.getElementById(`sugg${i}`).innerText;
    weatherdetail();
    if(localStorage.getItem("lastsearched")===null){
        let arr=[];
        arr.push(cityname);
        localStorage.setItem("lastsearched", JSON.stringify(arr));
    }
    else{
        let arr=JSON.parse(localStorage.getItem("lastsearched"));
        if(!arr.includes(cityname)){
            arr.unshift(cityname);
            if(arr.length>5){
                arr.pop();
            }
            localStorage.setItem("lastsearched", JSON.stringify(arr));
        }
        document.getElementById("navinput").value=cityname;
    }
    document.getElementById("prew1").innerText=JSON.parse(localStorage.getItem("lastsearched"))[0];
    document.getElementById("prew2").innerText=JSON.parse(localStorage.getItem("lastsearched"))[1];
    document.getElementById("prew3").innerText=JSON.parse(localStorage.getItem("lastsearched"))[2];
    document.getElementById("prew4").innerText=JSON.parse(localStorage.getItem("lastsearched"))[3];
    document.getElementById("prew5").innerText=JSON.parse(localStorage.getItem("lastsearched"))[4];    
    
    favfn();

})
}

    document.getElementById("prew1").innerText=JSON.parse(localStorage.getItem("lastsearched"))[0];
    document.getElementById("prew2").innerText=JSON.parse(localStorage.getItem("lastsearched"))[1];
    document.getElementById("prew3").innerText=JSON.parse(localStorage.getItem("lastsearched"))[2];
    document.getElementById("prew4").innerText=JSON.parse(localStorage.getItem("lastsearched"))[3];
    document.getElementById("prew5").innerText=JSON.parse(localStorage.getItem("lastsearched"))[4];


for(let i=1;i<=5;i++){
document.getElementById(`prew${i}`).addEventListener("click", ()=>{
    cityname=document.getElementById(`prew${i}`).innerText;
    weatherdetail();
    if(localStorage.getItem("lastsearched")===null){
        let arr=[];
        arr.push(cityname);
        localStorage.setItem("lastsearched", JSON.stringify(arr));
    }
    else{
        let arr=JSON.parse(localStorage.getItem("lastsearched"));
        if(!arr.includes(cityname)){
            arr.unshift(cityname);
            if(arr.length>5){
                arr.pop();
            }
            localStorage.setItem("lastsearched", JSON.stringify(arr));
        }
        document.getElementById("navinput").value=cityname;
    }

    favfn();
})
}



for(let i=1;i<=5;i++){
document.getElementById(`fav${i}`).addEventListener("click", ()=>{
    cityname=document.getElementById(`fav${i}`).innerText;
    weatherdetail();
    if(localStorage.getItem("lastsearched")===null){
        let arr=[];
        arr.push(cityname);
        localStorage.setItem("lastsearched", JSON.stringify(arr));
    }
    else{
        let arr=JSON.parse(localStorage.getItem("lastsearched"));
        if(!arr.includes(cityname)){
            arr.unshift(cityname);
            if(arr.length>5){
                arr.pop();
            }
            localStorage.setItem("lastsearched", JSON.stringify(arr));
        }
        document.getElementById("navinput").value=cityname;
    }

    favfn();
    document.getElementsByClassName("favsuggestions")[0].style.visibility="hidden";
})
}


document.getElementById("favtab").addEventListener("click", () => {
       if(userlogin===null){
        document.getElementById("heartp1").style.visibility="visible";
       setTimeout(() => { 
        document.getElementById("heartp1").style.visibility="hidden";
      }, 1000);
      return;
 }

        document.getElementsByClassName("favsuggestions")[0].style.visibility="visible";

        for(let i=1; i<=5; i++){
            document.getElementById(`fav${i}`).innerText=fav[i-1]
        }

   })





// after login setup

if(userlogin!=null){
document.getElementsByClassName("login")[0].innerHTML=`<div class="topuser" style="display:inline; cursor: pointer"><i class="fa-solid fa-user"></i> ${userlogin.fname}</div><button class="logoutbtn">Logout</button>`;
document.getElementsByClassName("logoutbtn")[0].addEventListener("click", ()=> {
localStorage.removeItem("login");
location.reload();
})
document.getElementById("greet").innerText=`Welcome ${userlogin.fname},`
}

if(userlogin!=null){
    document.getElementsByClassName("dclose")[0].addEventListener("click", ()=> {
        document.getElementsByClassName("userdetail")[0].style.visibility="hidden";
    })

    document.getElementsByClassName("topuser")[0].addEventListener("click", ()=> {
        document.getElementsByClassName("userdetail")[0].style.visibility="visible";
    })

    
       document.getElementById(`detail0`).innerText = `First Name: ${userlogin.fname}`;
       document.getElementById(`detail1`).innerText = `Last Name: ${userlogin.lname}`;
       document.getElementById(`detail2`).innerText = `Username: ${userlogin.username}`;
       document.getElementById(`detail3`).innerText = `Email Id: ${userlogin.email}`;
    
    
}
   
// based on live location

document.getElementById("prewupper1").addEventListener("click", () =>{
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} )

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
async function successCallback(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    cityname=`${lat},${lon}`;
    await weatherdetail();
    cityname=await weatherdata.location.name;
    favfn();
}
function errorCallback(error) {
    console.log("Error:", error.message);
}




// weather details
 let temp="cel"
document.getElementById("switch").addEventListener("click", () => {
    if(temp==="cel"){
      document.getElementById("temperature").innerText=`${weatherdata.current.temp_f} °F`;
      document.getElementById("switch").innerText="Change to Celsius";
      temp="fer"
    }
    else{
        document.getElementById("temperature").innerText=`${weatherdata.current.temp_c} °C`;
      document.getElementById("switch").innerText="Change to Fahrenheit";
      temp="cel"
    }

})

// saving favaourite cities
let fav;

document.getElementsByClassName("heart")[0].addEventListener("click", () => {
     if(cityname!==undefined){
    if(userlogin!==null){
        ky=`fav${userlogin.username}`;
        let favarr=JSON.parse(localStorage.getItem(ky));
        if(favarr===null){
            let arr=[];
            arr.unshift(cityname);
            localStorage.setItem(ky, JSON.stringify(arr));
            fav=JSON.parse(localStorage.getItem(`fav${userlogin.username}`));

            document.getElementById("heartp2").style.visibility="visible";
            setTimeout(() => { 
            document.getElementById("heartp2").style.visibility="hidden";
            }, 2500);

           document.getElementsByClassName("heart")[0].innerHTML=`<i class="fa-solid fa-heart" id="heart" style="color: red;"></i>`;

        }
        else{
            if(!favarr.includes(cityname)){
              favarr.unshift(cityname);
              localStorage.setItem(ky, JSON.stringify(favarr));
              fav=JSON.parse(localStorage.getItem(`fav${userlogin.username}`));

              document.getElementById("heartp2").style.visibility="visible";
              setTimeout(() => { 
              document.getElementById("heartp2").style.visibility="hidden";
              }, 2500);

              document.getElementsByClassName("heart")[0].innerHTML=`<i class="fa-solid fa-heart" id="heart" style="color: red;"></i>`;

            }
            else{
                let idx=favarr.indexOf(cityname);
                favarr.splice(idx,1);
                localStorage.setItem(ky, JSON.stringify(favarr));


                document.getElementById("heartp3").style.visibility="visible";
                fav=JSON.parse(localStorage.getItem(`fav${userlogin.username}`));
              setTimeout(() => { 
              document.getElementById("heartp3").style.visibility="hidden";
              }, 2500);

              document.getElementsByClassName("heart")[0].innerHTML=`<i class="fa-regular fa-heart" id="heart"></i></i>`;

            }
       
            

    }
        
    }
   
   else{
      document.getElementById("heartp1").style.visibility="visible";
      setTimeout(() => { 
        document.getElementById("heartp1").style.visibility="hidden";
      }, 1000);
 }

}
})
  
if(userlogin!==null){
  fav=JSON.parse(localStorage.getItem(`fav${userlogin.username}`));
}


let favfn= () => {
  if(userlogin!==null){
    if(fav.includes(cityname)){
        document.getElementsByClassName("heart")[0].innerHTML=`<i class="fa-solid fa-heart" id="heart" style="color: red;"></i>`;
    }
    else{
       document.getElementsByClassName("heart")[0].innerHTML=`<i class="fa-regular fa-heart" id="heart"></i></i>`; 
    }
  }
}

// humberg
let humb=0;

   document.getElementById("humb").addEventListener("click", () => {
    if(humb===0){
     document.getElementsByClassName("divleft")[0].style.transform="translateX(0)";
     humb=1
    }
    else{
        document.getElementsByClassName("divleft")[0].style.transform="translateX(-100%)";
        humb=0
    }
   });

   document.getElementsByClassName("divleft")[0].addEventListener("click", () => {
    let mq = window.matchMedia("(max-width: 768px)");
    if(mq.matches===true){
      document.getElementsByClassName("divleft")[0].style.transform="translateX(-100%)";
    }
   });

