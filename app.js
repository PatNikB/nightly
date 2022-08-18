function braintreeAPI(){
    require( 'dotenv').config(); 
    const braintree = require("braintree");
    
    const oGateway = new braintree.BraintreeGateway( {
        environment : process.env.ENVIRONMENT,
        merchantId  : process.env.MERCHANTID,
        publicKey   : process.env.PUBLICKEY,
        privateKey  : process.env.PRIVATEKEY
    } );

    return oGateway;

}

function getTransactionsFromBraintreeFromDateCreated( date ){

}
module.exports = {
    braintreeAPI,
    getTransactionsFromBraintreeFromDateCreated
};