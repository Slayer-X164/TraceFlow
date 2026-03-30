//this iss a iif immediately invoked function
(function(){
  window.DevWatch = { //attaching DevWatch object to global browser object
    traceFlowInit: function(){
      fetch("http://localhost:3000/api/log",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          message:"SDK initialized ",
          date: new Date().toLocaleString()
        })
      })
    }
  }
})();