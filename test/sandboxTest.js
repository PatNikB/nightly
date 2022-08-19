const assert = require('assert').strict;
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
        console.log ( oResponse.success );
    } );

} );