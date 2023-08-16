let btn = document.getElementById("btn")
if(btn){
    btn.addEventListener('submit', (e)=>{
    // let q = document.getElementById("checked")
    let Account = document.getElementById("account")
    let Password = document.getElementById("password")
    let Name = document.getElementById("name")

    if(Account.value=="" || Password.value==""||Name.value==""){
        alert("帳號、密碼及名字不能空白");
        e.preventDefault();
    }else{
        //pass
    }
}
)}

let btn2 = document.getElementById("btn2")
if(btn2){
    btn2.addEventListener('submit', (e)=>{
    let Account2 = document.getElementById("account2")
    let Password2 = document.getElementById("password2")

    if(Account2.value=="" || Password2.value==""){
        alert("帳號或密碼不能空白");
        e.preventDefault();
    }else{
        //pass
    }
}
)}

let send = document.getElementById("send")
if(send){
    send.addEventListener('submit', (e)=>{
    let ID = document.getElementById("query").value;
    let url = "/api/member?username="+ ID
    console.log(ID, url)
    e.preventDefault();
    fetch(url)
    .then(response => response.json())
    .then(result => {
        let data = result.data
        if(data){
            let query_result = document.getElementById("show-query")
            query_result.textContent = data.name+ "(" +data.username + ")"
        }else{
            let query_result = document.getElementById("show-query")
            query_result.textContent = "查無此人"
        }
      })
}
)}

let change = document.getElementById("change-name")
if(change){
    change.addEventListener('submit', (e)=>{
    let chaged_name = document.getElementById("change").value;
    let url = "/api/member"
    e.preventDefault();
    fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"name":chaged_name})
      })
        .then(response => response.json())
        .then(result => {
            if(result.error){
                let show_result = document.getElementById("show-result")
                show_result.textContent = "更新失敗..."
            }else{
                let show_result = document.getElementById("show-result")
                let un = document.getElementById("username")
                un.textContent = chaged_name
                show_result.textContent = "更新成功!"
            }
        })
}
)}





