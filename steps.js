const { Given, When, Then, Before } = require('@cucumber/cucumber')
const {Person, Network} = require('../../src/shouty.js')
const { assertThat, is, not, contains } = require('hamjest')
const default_range = 100

//We need an instance of Network in every scenario, so we can declare a Before Hook that creates one before each scenario starts
Before(function () {
  this.network = new Network(default_range)
  this.people = {}
  this.messageFromSean ='Message par défaut'
})

Given ('the range is {int}', function (range){
  this.network = new Network(range)
})

Given('a person named {word}', function (name) {
  this.people[name] = new Person(this.network, 0)
})

Given ('a person named {word} is located at {int}', function (name, location){
  this.people[name] = new Person(this.network, location)
})

When('Sean shouts', function () {
  this.people['Sean'].shout('Hello, world')
})

When('Sean shouts {string}', function (message) {
  this.people['Sean'].shout(message)
  this.messageFromSean = message
})

Then('Lucy should hear a shout', function () {
  assertThat(this.people['Lucy'].messagesHeard().length, is(1))
})

Then('Lucy should hear Sean\'s message', function () {
  assertThat(this.people['Lucy'].messagesHeard(), is([this.messageFromSean]))
})

Then('Larry should not hear a shout', function () {
  assertThat(this.people['Larry'].messagesHeard(), not(contains((this.messageFromSean))))
})

Then('Larry should not hear Sean\'s message', function () {
  assertThat(this.people['Larry'].messagesHeard(), not(contains((this.messageFromSean))))
})