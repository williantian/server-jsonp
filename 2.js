 button.addEventListener('click', function(){
     let request = new XMLHttpRequest()
     request .open('get', 'URL')
     request.send()
     request.onreadystatechange(function(){
         if(request.readystate === 4){
             if(request.state >= 200 && request.state < 300){
                 let string = request.responseText
                 let object = window.Json.parse(string)
             }else if(request.state >= 400){
                 console.log('失败了')
             }
         }
     })
 })