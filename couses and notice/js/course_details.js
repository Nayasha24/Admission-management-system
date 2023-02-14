

  var selectedRow = null;
//   var btn = document.querySelector(".button")
//   btn.addEventListener("click", employdata);
  
  
  function employdata(){
    var ax = read_Input_Value();
    if (selectedRow == null){
      create_Tr_Td(ax);
      remove_input_value()
    }
    else{   
      updatefunc(ax); 
      remove_input_value(); 
      selectedRow = null;
    }
  
  }
  
  function read_Input_Value(){
    var redemp={} 
    redemp["ename"] = document.querySelector(".empname").value;
    redemp["des"] = document.querySelector(".designation").value;
    // redemp["mob"] = document.querySelector(".mobile").value;
    // redemp["salary"] = document.querySelector(".empsalary").value;
    return redemp
  }
  function create_Tr_Td(x){
    var empTable = document.querySelector(".list");
    var emp_tr = empTable.insertRow(empTable.length);
    var emp_td1 = emp_tr.insertCell(0);
    var emp_td2 = emp_tr.insertCell(1);
    var emp_td3 = emp_tr.insertCell(2);
    // var emp_td4 = emp_tr.insertCell(3);
    // var emp_td5 = emp_tr.insertCell(4);
    var emp_td6 = emp_tr.insertCell(3);
    var totalRowCount = document.querySelector(".list tr").length;
    emp_td1.innerHTML = empTable.rows.length-1;
    //Note:- .rows.length = return no of row 
  
    emp_td2.innerHTML = x.ename;   
      emp_td3.innerHTML = x.des;
    //   emp_td4.innerHTML = x.mob;
    // emp_td5.innerHTML = x.salary;
    
    emp_td6.innerHTML = '<a class="edt" onClick="onEdit(this)"><p style="color:#0039a6;cursor=pointer">Edit</p></a>/<a class="dlt" onClick="onDelete(this)"><p style="color:red;">Delete</p></a>';
  }
  
  function remove_input_value(){
    document.querySelector(".empname").value= " ";
    document.querySelector(".designation").value= " ";
    // document.querySelector(".mobile").value= " ";
    // document.querySelector(".empsalary").value= " ";  
  }
  
  function onEdit(y){
    if (confirm('Are you sure to edit this record ?')) {
    console.log(y);
  
    var selecteventbtn = document.querySelector("a.edt");
      selectedRow = y.parentElement.parentElement;
      document.querySelector(".empid").value = selectedRow.cells[0].innerHTML;
      document.querySelector(".empname").value = selectedRow.cells[1].innerHTML;
      document.querySelector(".designation").value = selectedRow.cells[2].innerHTML;
      //  document.querySelector(".mobile").value = selectedRow.cells[3].innerHTML;
      // document.querySelector(".empsalary").value = selectedRow.cells[4].innerHTML;
    }
  }
  
  function updatefunc(redemp){
    
    selectedRow.cells[1].innerHTML = redemp.ename;
    selectedRow.cells[2].innerHTML = redemp.des;
    // selectedRow.cells[3].innerHTML = redemp.mob;
    // selectedRow.cells[4].innerHTML = redemp.salary;
    
  }
  
  
  function onDelete() {
      if(confirm('Are you sure to delete this record ?')) {
          var selectdelete = document.querySelector("a.dlt");
          selectdelete = selectdelete.parentElement.parentElement.remove(0);
      }
  }
//   function test1(){
//         alert("Text value changed!!!");
// }  
