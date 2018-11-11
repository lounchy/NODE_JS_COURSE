/**
 * Create and export configuration variables
 */

 //Container for all the environments
 var enviroments = {};

 //Staging (default) environment
 enviroments.staging = {
    'httpPort' : 3000,
    'envName' : 'staging'
 };
 //Production environment
 enviroments.production = {
    'httpPort' : 5000,
    'envName' : 'production'
 };
 //Determine witch enviroment was passed as a comand-line argument
 var currentEviroment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';
 //Check that the current enviroment is one of the enviroments above if not default to staging
 var environmentToExport = typeof(enviroments[currentEviroment]) == 'object' ? enviroments[currentEviroment] : enviroments.staging;
 //Export the module
 module.exports = environmentToExport;