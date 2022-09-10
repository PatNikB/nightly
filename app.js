const { promises: Fs } = require('fs')

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

function getCardTypeFromTransactionRecord( oTransaction ){
    // if ( isset( $transaction->creditCard ) && ( in_array( $strPaymentInstrumentType, $creditCardProviderList) ) ){
    //     $strCardType = $transaction->creditCard['cardType'];
    // }
    // elseif ( isset( $transaction->googlePayCardDetails ) ){
    //     $strCardType = $transaction->googlePayCardDetails->sourceCardType;
    // }
    // elseif ( isset( $transaction->applePay )){
    //     $strCardType = $transaction->applePay['cardType'];
    // }
    // else{
    //     $strCardType = 'N/A';
    // }

    if ( oTransaction.creditCard && (oTransaction.paymentInstrumentType)){

    }

}

function getSubscriptionBillingCycle( strSubscriptionId ){
    
}


function logTransactionId(){
    // saves the id of each transaction that is retrieved and processed by nightly

}

async function checkFileOrDirectoryExists( strPath ){
    try {
        await Fs.access( strPath );
        return true;
    }
    catch{
        return false;
    }
}

// async function initialiseLoggingDirectories(){
//     // check what directories are missing

//     //create directory and the respective .gitkeep file and example file
// }

async function createLogFile( oFileDetails ){
    const date = new Date();
    const datYear = date.getUTCFullYear();
    let datMonth = date.getUTCMonth() + 1;
    const datDay = date.getUTCDate();

    const strYearMonthDay = datYear.toString() + datMonth.toString() + datDay.toString();
    if ( !( await checkFileOrDirectoryExists( oFileDetails.directory ) ) ){
        return 'directory does not exist';
    }

    const strFullPath = oFileDetails.directory + oFileDetails.fileName + strYearMonthDay + oFileDetails.fileExtension;
    if ( await checkFileOrDirectoryExists( strFullPath ) ) {
        return 'file already exists';
    }

    try {
        await Fs.open(strFullPath , 'w' );
        return `log file: ${strFullPath} created`
    } 
    catch {
        return 'failed to create file';
    }

}

async function deleteFile( strFilePath ){
    try {
        Fs.unlink( strFilePath );
        return true;
    } 
    catch {
        return false;
    }
}

async function getJsonObjectFromJsonFile ( strFilePath ){
    if ( !( await checkFileOrDirectoryExists( strFilePath ) ) ){
        return 'directory or file is not found';
    }

    return new Promise( ( resolve, reject ) => {
        const oJson = Fs.readFile( strFilePath, 'utf8' );
        resolve ( oJson );
    } );
}

function updateLogFile( oFileDetails ){

}
module.exports = {
    braintreeAPI,
    getTransactionsFromBraintreeBetweenDates,
    getTransactionDetailsFromTransactionId,
    verifyTransaction,
    checkFileOrDirectoryExists,
    createLogFile,
    deleteFile,
    getJsonObjectFromJsonFile
};