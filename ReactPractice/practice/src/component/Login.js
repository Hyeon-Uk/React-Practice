import React from 'react';
function Login(props){
    var _user_infos=props.user_infos;
    console.log(_user_infos);
    return(
        <div className="login__form">
        <form action="/" method="post" onSubmit={function(e){
             var id=document.getElementById('ID').value;
             var pass=document.getElementById('PASS').value;
            e.preventDefault();
            props.onSubmit(id,pass);
        }}>
            <fieldset>
                <legend>Log in</legend>
            <p>
                <input type="text" placeholder="ID" id="ID"></input>
            </p>
            <p>
                <input type="password" placeholder="PASS" id="PASS"></input>
            </p>
            <p>
                <a href="/make_id" onClick={function(e){
                    e.preventDefault();
                    props.onChangeMode("join");
                }.bind(this)}>아이디 만들기</a><br/>
                <a href="/find_id" onClick={function(e){
                    e.preventDefault();
                    props.onChangeMode("find_id");
                }.bind(this)}>아이디 찾기</a><br/>
                <a href="/find_pass" onClick={function(e){
                    e.preventDefault();
                    props.onChangeMode("find_pass");
                }.bind(this)}>비밀번호 찾기</a>
            </p>
            <p>
                <input type="submit" value="Login" onClick={function(e){
                    var id=document.getElementById('ID').value;
                    var pass=document.getElementById('PASS').value;
                    var ind=_user_infos.findIndex(obj=>obj.id===id&&obj.pass===pass);
                    if(ind===-1){
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

export default Login;