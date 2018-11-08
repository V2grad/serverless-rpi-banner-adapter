# RPI-BANNER Adatper on AWS Lambda

A Serverless version for Adatper RPI-BANNER

## Get started 

Read this [tutorial](https://docs.aws.amazon.com/apigateway/latest/developerguide/integrating-api-with-aws-services-lambda.html#api-as-lambda-proxy-expose-get-method-with-path-parameters-to-call-lambda-function) from AWS.

You need to notice that if you let AWS to handle the route for you, you need to write the velocity template by yourself in Mapping section. (In section `Create a GET Method with Query Parameters to Call the Lambda Function`)

Mapping template example (`application/json`): 

```json
{
   "terms": "$input.params('terms')"
}
```

So you can get this params in `event` variable.

## More

- Here I put two function in the same repo for convenience. So for two routes here I upload the same code and export two different handler which you can change in the `inline code editor`
- Before you upload this repo to AWS Lambda, you need to include `node_modules`. Read this [tutorial](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-create-deployment-pkg.html)
- You may need to increase the time limit (at least 5s)
- You may also want to learn something about `handler` [here](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html)