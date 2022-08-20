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
            if ( err ){
                console.log( 'getTransactionsFromBraintreeBetweenDates: call failed' );
                reject( err );
            }
            else if ( transactions ){
                console.log( 'getTransactionsFromBraintreeBetweenDates: call succeeded ' );
                resolve( transactions );
            }
        } );
    } );
}

function getTransactionDetailsFromTransactionId( strTransactionId ){
    const oGateway = braintreeAPI();
    return new Promise( (resolve, reject) => {
        oGateway.transaction.find( strTransactionId, 
            ( err, transaction ) => {
                console.log(`\n Making call to get a transaction from braintree using the transaction ID: ${strTransactionId} `);
                if ( err ){
                    console.log( 'getTransactionDetailsFromTransactionId: call failed ' );
                    reject( err );
                }
                else if ( transaction ){
                    console.log( 'getTransactionDetailsFromTransactionId: call succeeded ' );
                    resolve( transaction );
                }
            } );
    } );

}

function verifyTransaction( oTransactionDetails ){
    let strDiscountID = null;
    let strPaymentInstrumentType = null;
    let strCardType = null;
    let strPayPalFeeAmount = null;
    let strCustomerEmail = null;
    let strSubscriptionYear = null;

    let strOutputMessage = '';


    if ( !oTransactionDetails.subscriptionId ){
        return false;
    }

    if ( oTransactionDetails.customer.website ){

    }



}

function getSubscriptionBillingCycle( strSubscriptionId ){
    
}


function logTransactionId(){

}
module.exports = {
    braintreeAPI,
    getTransactionsFromBraintreeBetweenDates,
    getTransactionDetailsFromTransactionId,
    verifyTransaction
};