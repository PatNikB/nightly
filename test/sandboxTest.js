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

describe ( 'getDetailsFromBraintreeTransactions', async () => {

    let strStartDateTime = '2022/08/18 00:00';
    let strEndDateTime = '2022/08/18 23:59:59';

    const oTransactions = null;

    it( `should request transactions from braintree between ${strStartDateTime} and ${strEndDateTime}`, async () => {
        const oResponse = await app.getTransactionsFromBraintreeBetweenDates( strStartDateTime, strEndDateTime );
        assert.ok( oResponse.success == true );
        oTransactions = oResponse;
    } );

    it ('should extract all details for each transaction retrieved from braintree into an object', async () =>{

    } );
} );