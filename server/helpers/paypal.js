const { Client, Environment } = require("@paypal/paypal-server-sdk");


const paypalClient = new Client({
    clientCredentialsAuthCredentials: {
      oAuthClientId: "AVJvn-RW_CdGq6S18Hqsd3aSlJeyElJfg-CsLZQTCXc-DtHpyWdUKbbuG-P1OwvEi_6YBe4WAgN5r8Rl",
      oAuthClientSecret: process.env.OAUTH_SECRET,
    },
    environment: Environment.Sandbox, 
  });


module.exports = paypalClient





