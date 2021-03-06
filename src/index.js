/**
  * Copyright 2017 Antonio Goulao
  *
  *   Licensed under the Apache License, Version 2.0 (the "License");
  *   you may not use this file except in compliance with the License.
  *   You may obtain a copy of the License at
  *
  *       http://www.apache.org/licenses/LICENSE-2.0
  *
  *   Unless required by applicable law or agreed to in writing, software
  *   distributed under the License is distributed on an "AS IS" BASIS,
  *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  *   See the License for the specific language governing permissions and
  *   limitations under the License.
  **/

'use strict'
var Alexa = require('alexa-sdk');
var names = require('./names');

var APP_ID = 'amzn1.ask.skill.7de4a4ca-832e-4b42-aeb2-8d568f34218f';

var SKILL_NAME = "Name My Animal";
var GET_FACT_MESSAGE = "I suggest you name it: ";
var HELP_MESSAGE = "You can say what name should I give my dog, or cat, or mouse, or, you can say exit... What can I help you with?";
var HELP_REPROMPT = "What can I help you with?";
var STOP_MESSAGE = "Goodbye!";

exports.handler = function(event, context, callback){
	var alexa = Alexa.handler(event, context, callback);
	alexa.APP_ID = APP_ID;
	alexa.registerHandlers(handlers);
	alexa.execute();
};

function handleGetName(animal) {
     return names[animal][Math.random() * (1)];
}


var handlers = {

    'LaunchRequest': function () {
      this.emit('GetNewNameIntent');
  },

  'GetNewNameIntent': function() {
    this.emit(":tellWithCard", handleGetName(this.event.request.intent.slots.Animal.value));
  },

  'RegisterNewNameIntent': function() {
        // TODO
    },
    'NameCountIntent': function() {
        // TODO
    },
    'AMAZON.HelpIntent': function () {
      var speechOutput = HELP_MESSAGE;
      var reprompt = HELP_REPROMPT;
      this.emit(':askWithCard', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function () {
      this.emit(':tellWithCard', STOP_MESSAGE);
  },
  'AMAZON.StopIntent': function () {
      this.emit(':tellWithCard', STOP_MESSAGE);
  },
  "Unhandled": function () {
    this.emit(":askWithCard", HELP_MESSAGE, HELP_REPROMPT);
}
};