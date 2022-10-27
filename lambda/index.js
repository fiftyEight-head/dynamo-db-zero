// import entire SDK
const Alexa = require('ask-sdk-core');

// first handler, LaunchRequest Handler
const LaunchRequestHandler = {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
      const speechText = 'Welcome to your SDK weather skill. Ask me the weather!';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard('Welcome to your SDK weather skill. Ask me the weather!', speechText)
        .getResponse();
    }
  };

  // second handler, AskWeatherIntent Handler
  const AskWeatherIntentHandler = {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AskWeatherIntent';
    },
    handle(handlerInput) {
      const speechText = 'The weather today is sunny.';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('The weather today is sunny.', speechText)
        .getResponse();
    }
  };

  // third handler, HelpIntent Handler
  const HelpIntentHandler = {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
      const speechText = 'You can ask me the weather!';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard('You can ask me the weather!', speechText)
        .getResponse();
    }
  };

  // fourth handler, CancelAndStopIntent Handler
  const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
          || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
      const speechText = 'Goodbye!';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Goodbye!', speechText)
        .withShouldEndSession(true)
        .getResponse();
    }
  };

  // fifth handler, SessionEndedRequest Handler
  const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
      // Any clean-up logic goes here.
      return handlerInput.responseBuilder.getResponse();
    }
  };

  // sixth handler, ErrorHandler
  const ErrorHandler = {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      console.log(`Error handled: ${error.message}`);
  
      return handlerInput.responseBuilder
        .speak('Sorry, I don\'t understand your command. Please say it again.')
        .reprompt('Sorry, I don\'t understand your command. Please say it again.')
        .getResponse();
    }
  };

  // seventh handler, LambdaHandler
  //The Lambda handler is the entry point for your AWS Lambda function. 
  //The following code creates a Lambda handler function to route all inbound request to your skill.
  let skill;

exports.handler = async function (event, context) {
  console.log(`REQUEST++++${JSON.stringify(event)}`);
  if (!skill) {
    skill = Alexa.SkillBuilders.custom()
      .addRequestHandlers(
        LaunchRequestHandler,
        AskWeatherIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
      )
      .addErrorHandlers(ErrorHandler)
      .create();
  }

  const response = await skill.invoke(event, context);
  console.log(`RESPONSE++++${JSON.stringify(response)}`);

  return response;
};

// The Lambda handler function creates an SDK Skill instance by using the SkillBuilders.custom() builder function. 
//The addRequestHandlers() builder function registers the request handlers that you created in the previous steps. 
//The code exports the function as the Lambda handler function.

// Alternatively, ASK SDK v2 for Node.js provides a lambda builder function 
//that you can use to construct the Lambda handler function that invokes the Skill instance and returns the response. 
//The following example shows how to use the lambda builder function.

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    AskWeatherIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda();