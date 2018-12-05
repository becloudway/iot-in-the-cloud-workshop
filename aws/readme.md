# AWS Setup and Instructions

| [AWS Console](https://eu-west-1.console.aws.amazon.com/) |

## Login
First off we have to login into the AWS console this is the controlcenter for the average Cloud Developer ;).

The username and password for the demo environment will be given during the workshop.

## Navigating and Services

There are normally 3 services that you want to be able to find to do your job for this workshop.

1. IoT Core
    - For the Rule and MqTT messages
    - [Act - Used for creating a rule](https://eu-west-1.console.aws.amazon.com/iot/home?region=eu-west-1#/rulehub)
    - [Test - Used for MqTT tests](https://eu-west-1.console.aws.amazon.com/iot/home?region=eu-west-1#/test)
2. Lambda
    - For creating the Lambda function
    - [Lambda management](https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1#/functions)
3. CloudWatch
    - For checking log messages
    - [Cloudwatch Logs](https://eu-west-1.console.aws.amazon.com/cloudwatch/home?region=eu-west-1)

You can navigate by using the above links or using the menu in the AWS Console.

## Instructions

For this we only provide some basic instructions:

But in the end you should be able to send a message from your device to AWS IoT, then trigger a rule that initiates a Lambda function that does something to your message and publishes this altered message to a different MqTT topic.

Then you can subscribe for this message on your device (or someone else's) and act upon the message data.

There is some example code (for the lambda) which can be found under source.
There is also a policy that you need to allow lambda to access IoT. It would be a better practice to be stricter on what you allow. But because of the hackathon part we grant you an almost all access pass ;)

### More instructions

The things you will need to do:

- Create a new lambda function
- When asked to choose a role/policy create a new one (use the `lambda-policy.json` file)
- Write your lambda code (based on the example if needed ;) )
- Go to IoT core and select ACT
  - Create a new Rule
    - Write a query like this: `SELECT *, topic(4) as DeviceID FROM "iot/demo/device/+/#"`
    - Select Add action and choose for lambda
      - Select your lambda there
- Go back to IoT core and select test
  - Go to publish to a topic
    - In the `topic to publish` box enter: `iot/demo/device/[something_here]/[aMessage]`
    - Hit `publish to topic`
- Go to CloudWatch and find your lambda's log messages
  - Check if your message shows up.
- Now have some fun

## Some additional information about the services that you will use

### AWS IoT Core Rule Engine

The AWS IoT Core Rule Engine allows you to let AWS listen to certain MqTT topics for messages. And when it gets a message you can trigger a certain action. This is called a rule.

The rule itself can do some data alternation by using a special query language influenced by SQL. You can also have multiple AWS services hooked up on these rules. For instance you can send the message to S3 and store it as an file. Or you can store the message in DynamoDB.

This is very useful when you receive messages from IoT devices and want to store, edit or act upon them.

### Lambda

Lambda functions are an approach for running code in the cloud. They are serverless and often referred to as MicroServices. Serverless is a term that describes a programm that can run without depending on a specific server or environment.

Lambda is serverless because the code you deploy on the lambda can run on its own without needing a specific environment or local data stored on the machine. By serverless we don't mean you don't need a computer to run the code on we just mean that it can run on any computer that is able to run the code.

Microservices are a different approach of writing software, in the past (and sometimes we still do) programmes where "monolithic"  which means that you had all your code in one program as a big fat program that couldn't be reused, always had to be deployed as one program and wasn't very scalable, ... with microservices you split up this big fat program in multiple tiny ones each doing a specific task. So now we have all these tiny programs which we can spread over multiple servers and our program becomes scalable.

### CloudWatch

Cloudwatch allows us to get the logs of all these different programs in one place, so that we can debug and troubleshoot our applications running in the cloud.

It also stores metrics and allows you to build dashboards. Which is very useful for maintaining an application.