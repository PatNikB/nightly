const assert = require('assert').strict;
const { describe } = require('mocha');
const app = require('../app.js');

describe( 'braintreeAPI', async () => {
    it( 'should connect to braintree API', async () => {
        const oGateway = app.braintreeAPI();
        assert.ok( oGateway.config.environment.server == 'api.sandbox.braintreegateway.com' );
    } );

} )

describe ( 'getTransactionsFromBraintreeBetweenDates', async () => {
    const datToday = new Date();
    const datYesterdayMidnight = new Date();
    
    datYesterdayMidnight.setDate( datToday.getDate()-1 );
    datYesterdayMidnight.setHours( 1, 0, 0, 0 );

    datToday.setHours( 1, 0, 0, 0 );


    it( 'should request for any transactions made yesterday', async () => {
        const oResponse = await app.getTransactionsFromBraintreeBetweenDates( datYesterdayMidnight, datToday );
        assert.ok( oResponse.success == true );
    } );

} );

describe ( 'getTransactionDetailsFromTransactionId', async () => {
    let strTransactionId = '9gxprs0h';

    it( `should get transaction details for the id ${strTransactionId}`, async () => {
        const oTransactionDetailsResponse = await app.getTransactionDetailsFromTransactionId( strTransactionId );
        // console.log("json: %j", oTransactionDetailsResponse);
        assert.ok( oTransactionDetailsResponse.id == strTransactionId );
        assert.ok( oTransactionDetailsResponse.customer.id == "651516905" );
    } );

    // consider using chai
    let strFalseTransactionId = '1abcde0f'
    it( `should return notFoundError as the transaction ID ${strFalseTransactionId} does not exist`, async () => {
        return app.getTransactionDetailsFromTransactionId( strFalseTransactionId )
        .then(
            () => Promise.reject( new Error('Expected method to reject.') ),
            err => assert.ok(err, Error)
            
        );
    } );

} );

describe ( 'verifyTransaction', async () => {
    //get sampleTransactionDetails from json file
    // const fs = require( 'fs' );
    
    // let strTransactionExampleJson = fs.readFileSync( './oTransactionExample.json' );
    // let oTransactionDetailsExample = JSON.parse( strTransactionExampleJson );

    let strTransactionId = '9gxprs0h';
    oTransactionDetailsExample = await app.getTransactionDetailsFromTransactionId( strTransactionId );

    it( `should verify transaction and return an object`, async () => {
        
    } );

} );

describe ( 'checkFileOrDirectoryExists', async () => {
    const strPath = require('path');

    const strCronLogPath = strPath.join(__dirname, '../logs/cron-log/cron20220908.log');
    it( `should check if log file in /logs/cron-log exists`, async () => {
        console.log(strCronLogPath);
        assert.ok( await app.checkFileOrDirectoryExists( strCronLogPath ) );
    } );

    const strFinanceReportPath = strPath.join(__dirname, '../logs/finance-report/finance-report20220908.csv');
    it( `should check if csv file in /logs/finance-report exists`, async () => {
        console.log(strFinanceReportPath);
        assert.ok( await app.checkFileOrDirectoryExists( strFinanceReportPath ) );
    } );

    const strSystemLogsPath = strPath.join(__dirname, '../logs/system-logs/20220908.json');
    it( `should check if json file in /logs/system-logs exists`, async () => {
        console.log(strSystemLogsPath);
        assert.ok( await app.checkFileOrDirectoryExists( strSystemLogsPath ) );
    } );

    const strFalseSystemLogsPath = strPath.join(__dirname, '../logs/system-logs/20220907.json');
    it( `should check if json file in /logs/system-logs does not exist`, async () => {
        console.log(strFalseSystemLogsPath);
        assert.rejects( await app.checkFileOrDirectoryExists( strFalseSystemLogsPath ) );
    } );

    const strCronLogDirectory = strPath.join(__dirname, '../logs/cron-log/');
    it ( `should check if /logs/cron-log directory exists`, async () => {
        console.log(strCronLogDirectory);
        assert.ok( await app.checkFileOrDirectoryExists( strCronLogDirectory ) );
    } );
    
    const strFinanceReportDirectory = strPath.join(__dirname, '../logs/finance-report');
    it ( `should check if /logs/finance-report directory exists`, async () => {
        console.log(strFinanceReportDirectory);
        assert.ok( await app.checkFileOrDirectoryExists( strFinanceReportDirectory ) );
    } );

    const strSystemLogsDirectory = strPath.join(__dirname, '../logs/system-logs');
    it ( `should check if /logs/system-logs directory exists`, async () => {
        console.log(strSystemLogsDirectory);
        assert.ok( await app.checkFileOrDirectoryExists( strSystemLogsDirectory ) );
    } );
} );

describe ( 'createLogFile', async () => {
    const strPath = require('path');
    const date = new Date();
    const datYear = date.getUTCFullYear();
    let datMonth = date.getUTCMonth() + 1;
    const datDay = date.getUTCDate();

    const strYearMonthDay = datYear.toString() + datMonth.toString() + datDay.toString();
    
    const systemLogFileDirectory = strPath.join(__dirname, '../logs/system-logs/');
    const strFullPath = systemLogFileDirectory + strYearMonthDay + '.json';

    const oSystemLogFileDetails = {
        "directory"     : systemLogFileDirectory,
        "fileName"      : "",
        "fileExtension" : ".json"
    };

    it (`should create json log file in system-logs`, async () => {
        const response = await app.createLogFile( oSystemLogFileDetails );
        const expectedResponse = `log file: ${strFullPath} created`;
        assert.equal( response, expectedResponse );
    } );

    it ('should delete the test json log file', async () => {
        const deleteFileResponse = await app.deleteFile( strFullPath );
        assert.equal( deleteFileResponse, true )
    });
    
} );


// describe ( 'overnightRun', async () => {

//     let strStartDateTime = '2022/08/18 00:00:00';
//     let strEndDateTime = '2022/08/18 23:59:59';
//     let arrTransactionId = null;
    
//     it( `should request transactions from braintree between ${strStartDateTime} and ${strEndDateTime}`, async () => {
//         const oTransactionSearchResponse = await app.getTransactionsFromBraintreeBetweenDates( strStartDateTime, strEndDateTime );
//         assert.ok( oTransactionSearchResponse.success == true );
//         arrTransactionId = oTransactionSearchResponse.ids;
//     } );


//     it ('should extract all details for each transaction retrieved from braintree into an object', async () =>{
//         // for each arrTransactionId
//         // app.overnightRun( arrTransactionId );
        
//     } );
// } );