//this iss a iif immediately invoked function
(function () {
  window.TraceFlow = { //attaching TraceFlow object to window i.e global object
    publicApiKey: "justatestkey786",
    initialized: false,
    errorMap: new Map(),

    init: function () {
      if (this.initialized) return; //if the sdk is already initialized then user cant call it again
      this.initialized = true;
      const publicApiKey = this.publicApiKey

      const shouldSendEvent = (eventLog) => {
        let fingerprint = `${eventLog.eventType}-${eventLog.message || "no-msg"}-${eventLog.filename || "no-file"}-${eventLog.lineno || 0}-${eventLog.url}`
        let currTime = Date.now()

        let lastSeenTime = this.errorMap.get(fingerprint)
        // checking if same event happenend within 10sec
        if (lastSeenTime && currTime - lastSeenTime < 5000) {
          return false
        }
        // saving the fingerprint and currTime in map if not already saved
        this.errorMap.set(fingerprint, currTime)

        if (this.errorMap.size > 500) {
          this.errorMap.clear()
        }

        return true
      }
      // for normal events / resource events
      window.addEventListener("error", (event) => {
        const { message, lineno, colno, error, filename } = event

        let eventLog = {
          eventType: error ? "js_error" : "resource_error",
          message: error ? message : null,
          filename: filename || "unknown-resource",
          lineno: error ? lineno : null,
          colno: error ? colno : null,
          error: error ? error.stack : null,
          userAgent: window.navigator.userAgent,
          url: window.location.href,
          timestamp: new Date().toISOString()
        }

        if (!shouldSendEvent(eventLog)) return

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
      // for async / promise events
      window.addEventListener("unhandledrejection", (event) => {
        const { reason } = event;
        let message = null, stack = null

        if (reason instanceof Error) {
          message = reason.message
          stack = reason.stack
        } else if (typeof reason === "string") {
          message = reason
        } else {
          message = JSON.stringify(reason)
        }
        let file = null
        let line = null
        let col = null

        if (stack) {
          const match = stack.match(/\((.*):(\d+):(\d+)\)/)
          if (match) {
            file = match[1]
            line = Number(match[2])
            col = Number(match[3])
          }
        }
        let eventLog = {
          eventType: "promise_error",
          message: message,
          filename: file || null,
          lineno: line || null,
          colno: col || null,
          error: stack,
          userAgent: window.navigator.userAgent,
          url: window.location.href,
          timestamp: new Date().toISOString()
        }

        if (!shouldSendEvent(eventLog)) return

        fetch("http://localhost:3000/api/log", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": publicApiKey
          },
          body: JSON.stringify(eventLog)
        }).catch(err => {
          console.error("error while sending async event log", err)
        })
      })


    }
  }
})();