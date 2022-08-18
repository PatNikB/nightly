const assert = require('assert').strict;
const app = require('../app.js');

describe( 'braintreeAPI', async () => {
    

    it('should connect to braintree API', async () => {
        const oGateway = app.braintreeAPI();
        assert.ok( oGateway.config.environment == 'sandbox' );
    });

} )

