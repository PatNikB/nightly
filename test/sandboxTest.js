const assert = require('assert').strict;
const app = require('../app.js');

describe( 'braintreeAPI', async () => {
    it( 'should connect to braintree API', async () => {
        const oGateway = app.braintreeAPI();
        assert.ok( oGateway.config.environment == 'sandbox' );
    } );

} )

describe ( 'getTransactionsFromBraintreeFromDateCreated', async () => {
    const datToday = new Date();
    const datYesterday = new Date();

    datYesterday.setDate( datToday.getDate()-1 );

    it( 'should request for any transactions made yesterday', () => {
        const oTransactions = app.getTransactionsFromBraintreeFromDateCreated( datYesterday );

    } );

} );