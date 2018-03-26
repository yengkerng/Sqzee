module.exports = {
  'facebookAuth' : {
  	'applicationToken' : "778814778922494|hM7xHe11QSOA4sIFPxJ3NUBIh34",
  	'context' : "YXBwbGljYXRpb25fY29udGV4dDo3Nzg4MTQ3Nzg5MjI0OTQZD",
    //test clientID
    'clientID' : '778927128911259',
    //test clientSecret
    'clientSecret' : '7e67bcc3244430cc207920d3a335713a',
    //production clientID
    //'clientID' : '778814778922494',
    //production clientSecret
    //'clientSecret' : 'c4510b90527d07298004b106471d888b',
    //
    'callbackURL' : '/auth/facebook/callback',
    'profileFields': [ 'name', 'email', 'link', 'locale', 'timezone',
    'gender', 'age_range', 'education', 'picture.type(large)', 'friends' ],
    passReqToCallback: true
  }
};
