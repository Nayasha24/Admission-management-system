function getdata(){
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const gender = document.getElementsByName("gender").value;
    const dob = document.getElementById("dob").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const pin = document.getElementById("pin").value;
    const state = document.getElementById("state").value;
    const program = document.getElementById("qualification").value;
    const specialization = document.getElementsByName("specialization").value;

    localStorage.setItem("formval",fname);
    localStorage.setItem("formval1",lname);
    localStorage.setItem("formval2",email);
    localStorage.setItem("formval3",mobile);
    localStorage.setItem("formval4",gender);
    localStorage.setItem("formval5",dob);
    localStorage.setItem("formval6",address);
    localStorage.setItem("formval7",city);
    localStorage.setItem("formval8",pin);
    localStorage.setItem("formval9",state);
    localStorage.setItem("formval10",program);
    localStorage.setItem("formval11",specialization);
}

getdata();