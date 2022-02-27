// callback
function validate(callback){
    var fixedusername=/admin/;
    var fixedpassword=/12345/;
    var username=document.getElementById("username");
    var password=document.getElementById("password");
    var usernameerror=document.getElementById("usernameerror");
    var passworderror=document.getElementById("passworderror");
        
    var x;
    var y;
    if(username.value.trim()==""){
        usernameerror.innerHTML="Username cannot be empty";
        usernameerror.style.color="red";
            x=0;
    } if(password.value.trim()==""){
        passworderror.innerHTML="Password cannot be empty";
        passworderror.style.color="red";
            y=0;
    }
    if(username.value.trim()!=""){
        
        if(username.value.length<6){
            if(fixedusername.test(username.value)){
                x=1;
                usernameerror.innerHTML="";
            }else{
                x=0;
                usernameerror.style.color="red";
            usernameerror.innerHTML="Invalid user name";
            }
            
        }
        else{
            x=0;
            usernameerror.style.color="red";
            usernameerror.innerHTML="Invalid user name";
       }
    }
    if(password.value.trim()!=""){
        console.log(password.value.length);
        if(password.value.length<6){
            if(fixedpassword.test(password.value)){
                y=1;
                
                passworderror.innerHTML="";
            }else{
                passworderror.style.color="red";
                passworderror.innerHTML="Invalid password";
                y=0;
            }
            
            
        }else{
            y=0;
            passworderror.style.color="red";
            passworderror.innerHTML="Invalid password";
        }
    }
    if(x==1&&y==1){
            var z=callback();
            if(z==true){
                return true;
            }
    }
    else{
        return false;
    }
}
function check(){
    return true;
}


// validate using promise
function todovalidate(){
    var promise=new Promise(function(resolve,reject){
        var a=0;
        var b=0;
        var i=0;
        for(i=0;i<200;i++){
            if(todos[i].checked){
                a++;
            
            }
            else{
                b++;
               
            }
        }
        if(b-a==10){
            resolve();
        }
        else{
            reject(b-a);
        }
    })
    promise.then(function(){
        document.getElementById("lead").innerHTML=" Congrats!! 5 Tasks have been Successfully Completed " ;
        alert("Congrats!! 5 Tasks have been Successfully Completed ");

    });
}

//to-do lists from API
var todos=[];
var i=0;
var len;
function loadDoc(){
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function()
    {
        if(this.readyState==4&&this.status==200)
        {
            var response=JSON.parse(this.responseText);
            var todoList=document.getElementById("todolist");
            var x="";
            len=response.length;
            
            for(i=0;i<response.length;i++)
            {
                var list= response[i];
                x=list.title;
                var checkbox=document.createElement("input");
                checkbox.type="checkbox";
                todos[i]=checkbox;
            
                if(list.completed==true)
                {
                    var label = document.createElement("label");
                    checkbox.setAttribute("checked","true");
                    checkbox.setAttribute("class","disabled");
                   
                    todoList.appendChild(checkbox);
                    todoList.appendChild(label);
                    label.appendChild(document.createTextNode(x));
                    label.setAttribute("class","checkedbox");
                }
                else
                {
                    var label = document.createElement("label");
                    label.setAttribute("class","active");
                    checkbox.removeAttribute("class","disabled");
                    todoList.appendChild(checkbox);
                    todoList.appendChild(label);
                    label.appendChild(document.createTextNode(x));
                    label.setAttribute("class","active");
                }
                var linebreak=document.createElement("br");
                todoList.appendChild(linebreak);
            }
        }
    }
    xhttp.open("GET","https://jsonplaceholder.typicode.com/todos",true);
    xhttp.send();
    
}
