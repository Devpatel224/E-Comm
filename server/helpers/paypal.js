const { Client, Environment } = require("@paypal/paypal-server-sdk");


const paypalClient = new Client({
    clientCredentialsAuthCredentials: {
      oAuthClientId: "AVJvn-RW_CdGq6S18Hqsd3aSlJeyElJfg-CsLZQTCXc-DtHpyWdUKbbuG-P1OwvEi_6YBe4WAgN5r8Rl",
      oAuthClientSecret: "ECpN1hAUxohLDC3fXoFP-EXYq4zPRC9VD4RapoGgmUl-vYtwlGuIhjqSjbdVuaIf0YC6ZF7hCNDp2wFn",
    },
    environment: Environment.Sandbox, // Use Environment.Live for production
  });


module.exports = paypalClient





