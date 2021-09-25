import React from 'react';

function check_overlap(_user_infos,_id){
    var mark=document.getElementById('id_mark');
    var flag=true;
    if(_id.trim()===""){
        mark.innerHTML="";
        return;
    }
    for(var i=0;i<_user_infos.length;i++){
        if(_user_infos[i].id==_id){
            flag=false;
            break;
        }
    }
    if(flag){
        mark.innerHTML="not Overlap!";
        return true;
    }
    else{
        mark.innerHTML="Overlap!";
        return false;
    }
}

function check_pass(){
    var pass1=document.getElementById('PASS').value;
    var pass2=document.getElementById('PASSCHECK').value;
    var mark=document.getElementById('pass_mark');

    if(pass1===pass2){
        mark.innerHTML="correct!";
    }
    else{
        mark.innerHTML="not correct!";
    }
}

function join({user_infos,onSubmit}){
    return(
        <div>
          <form action="/" method="post" onSubmit={function(e){
            var _id=document.getElementById('ID').value;
            var _pass=document.getElementById('PASS').value;
            e.preventDefault();
            onSubmit(_id,_pass);
          }}>
            <fieldset>
                <legend>Join</legend>
            <p>
                <label htmlFor="ID">ID:</label>
                <input id="ID" type="text" placeholder="ID" name="id" autoComplete="off" onBlur={function(e){
                    check_overlap(user_infos,e.target.value);
                }}></input>
                <span id="id_mark"></span>
            </p>
            <p>
                <label htmlFor="PASS">PASS:</label>
                <input id="PASS" type="password" placeholder="PASS" name="pass"></input>
            </p>
            <p>
                <label htmlFor="PASSCHECK">PASSCHECK</label>
                <input id="PASSCHECK" type="password" placeholder="PASSCHECK" name="passcheck" onBlur={function(e){
                    check_pass();
                }}></input>
                <span id="pass_mark"></span>
            </p>
            <p>
                <input type="submit" value="submit" onClick={function(e){
                    var id_mark=document.getElementById('id_mark');
                    var pass_mark=document.getElementById('pass_mark');
                    if(id_mark.innerHTML==="Overlap!"||id_mark.innerHTML===""
                    ||pass_mark.innerHTML===""||pass_mark.innerHTML==="not correct!"){
                        e.preventDefault();
                        alert("check your id or pass");
                    }
                }}></input>
            </p>
            </fieldset>

        </form>
        </div>        
    );
}

export default join;