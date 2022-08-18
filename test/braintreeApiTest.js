const assert = require( 'assert' ).strict;
require( 'dotenv').config(); 
const braintree = require("braintree");

describe( 'braintreeApiTest', async function () {

    it( 'connects to braintree api', async function () {
        const oGateway = new braintree.BraintreeGateway( {
            environment : process.env.ENVIRONMENT,
            merchantId  : process.env.MERCHANTID,
            publicKey   : process.env.PUBLICKEY,
            privateKey  : process.env.PRIVATEKEY
        } );

        assert.ok( oGateway.config.environment == 'sandbox' );
    } );

});