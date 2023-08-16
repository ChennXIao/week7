
// q.addEventListener('submit', (e)=>{
//     // e.preventDefault();
//     let h = document.createElement("div");
//     h.id = "msg";
//     let text = document.getElementById("text").value;
//     console.log(text);
//     h.textContent = text;
//     document.getElementById("message").appendChild(h);
//     document.getElementById("text").value = "";
//     e.preventDefault();
//     // e.stopPropagation;
//     return false;

// });

let btn = document.getElementById("btn")
if(btn){
    btn.addEventListener('submit', (e)=>{
    // let q = document.getElementById("checked")
    let Account = document.getElementById("account")
    let Password = document.getElementById("password")
    let Name = document.getElementById("name")

    // alert(w.value);

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





// document.getElementById("forms").addEventListener("submit", function(event) {
//     event.preventDefault(); 
//     let number = document.getElementById("count").value;
//     number = Number(number);
//     if(Number.isInteger(number) == false || number<0){
//         alert("請輸入正整數");
//     }else{
//         let square_url = '/square/'+ number;
//         window.location.href = square_url;
//     }
// });

// document.addEventListener('DOMContentLoaded', function() {
//     const deleteForms = document.getElementById('deleteForm');
    
//     deleteForms.addEventListener('submit', function(event) {
//         event.preventDefault(); // Prevent the form from submitting normally
            
//         const confirmDelete = confirm('Are you sure you want to delete this message?');
            
//         if (confirmDelete) {
//             const messageID = this.querySelector('[name="message_id"]').value;                deleteMessage(messageID);
//             }
//         });
    
//     function deleteMessage(messageId) {
//         const xhr = new XMLHttpRequest();
//         xhr.open('POST', '/deleteMessage/' + messageId, true);
//         xhr.setRequestHeader('Content-Type', 'application/json');
        
//         xhr.onreadystatechange = function() {
//             console.log(xhr.readyState, xhr.status, xhr.responseText);

//             if (xhr.readyState === XMLHttpRequest.DONE) {
//                 if (xhr.status === 200) {
//                     // Reload the page or update the message list after successful deletion
//                     location.reload();
//                 } else {
//                     console.log("Error deleting message");
//                 }
//             }
//         };
        
//         xhr.send();
//     }
// });

