function braintreeAPI(){
    require( 'dotenv').config(); 
    const braintree = require("braintree");
    let oBraintreeEnvironment = null;

    if( process.env.ENVIRONMENT == 'sandbox' ){
        oBraintreeEnvironment = braintree.Environment.Sandbox;
    }
    // else{
    //     oBraintreeEnvironment = braintree.Environment.Production;
    // }
    
    const oGateway = new braintree.BraintreeGateway( {
        environment : oBraintreeEnvironment,
        merchantId  : process.env.MERCHANTID,
        publicKey   : process.env.PUBLICKEY,
        privateKey  : process.env.PRIVATEKEY
    } );

    return oGateway;

}

function getTransactionsFromBraintreeBetweenDates( startDateTime, endDateTime ){
    const oGateway = braintreeAPI();

    return new Promise( ( resolve, reject ) => {
        oGateway.transaction.search( ( search ) => {
            search.createdAt().between( startDateTime, endDateTime );
        }, ( err, transactions ) => {
            console.log('\n Making call to get transactions from braintree.');
            if ( !transactions ){
                console.log( 'getTransactionsFromBraintreeBetweenDates: call failed' );
                reject( err );
            }
            else if ( !err ){
                console.log( 'getTransactionsFromBraintreeBetweenDates: call succeeded ' );
                resolve( transactions );
            }
        } );
    } );


}
module.exports = {
    braintreeAPI,
    getTransactionsFromBraintreeBetweenDates
};