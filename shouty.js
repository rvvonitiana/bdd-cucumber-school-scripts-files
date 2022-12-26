class Person {
constructor(network){
  this.message = []
  this.network = network
  //this.network.subscribe(this)
}

/*moveTo(distance) {

  }*/
shout(message) {

  }
messagesHeard() {
    return ["free bagels at Sean's"]
  }
}
class Network {
  constructor(range){
    this.listeners = []
    this.range = range
  }

  subscribe(person){
    this.listeners.push(person)
  }

  broadcast(message, shouter_location){
    this.listeners.forEach(listener => {
      if(Math.abs(listener.location - shouter_location) <= this.range)
      listener.hear(message)
    }
    )
  }
}
  
module.exports = {
  Person : Person, 
  Network : Network
}