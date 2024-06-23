declare module 'serverless-http' {
    import { Handler } from 'express';
  
    function serverless(app: Handler): Handler;
  
    export = serverless;
  }
  