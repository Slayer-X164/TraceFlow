//this iss a iif immediately invoked function
(function () {
  window.TraceFlow = { //attaching TraceFlow object to window i.e global object
    publicApiKey: "justatestkey786fd",
    init: function () {

      const publicApiKey = this.publicApiKey

      window.addEventListener("error", (event) => {
        const { message, lineno, colno, error, filename } = event
        const resource = event.target
        const resourceUrl = resource?.src || resource?.href || null

        let eventLog = {
          eventType: error ? "js_error" : "resource_error",
          message: error ? message : null,
          filename: filename || resourceUrl,
          lineno: error ? lineno : null,
          colno: error ? colno : null,
          error: error ? error.stack : null,
          userAgent: window.navigator.userAgent,
          url:window.location.href,
          timestamp: new Date().toISOString()
        }
        fetch("http://localhost:3000/api/log", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": publicApiKey
          },
          body: JSON.stringify(eventLog)
        }).catch(err => {
          console.error("error while sending event log", err)
        })
      })

    }
  }
})();