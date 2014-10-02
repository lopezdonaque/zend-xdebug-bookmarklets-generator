
var Xdebug =
{

  getStartDebugCode: function( ideKey )
  {
    return Utils.getCookieAssignments( { "XDEBUG_SESSION": Utils.getStringLiteralExpression( ideKey ) }, Utils.defaultPath );
  },

  getStopDebugCode: function()
  {
    return Utils.getDestroyCookiesCode( [ "XDEBUG_SESSION", "_XDEBUG_SESSION" ] );
  },

  getDebugThisPageCode: function( ideKey )
  {
    return this.getStartDebugCode( ideKey ) + Utils.getReloadPageCode() + this.getStopDebugCode();
  },

  getStartProfilerCode: function()
  {
    return Utils.getCookieAssignments( { "XDEBUG_PROFILE": Utils.getStringLiteralExpression( "1" ) }, Utils.defaultPath );
  },

  getStopProfilerCode: function()
  {
    return Utils.getDestroyCookiesCode( [ "XDEBUG_PROFILE" ] );
  },

  getStartTracerCode: function()
  {
    return Utils.getCookieAssignments( { "XDEBUG_TRACE": Utils.getStringLiteralExpression( "1" ) }, Utils.defaultPath );
  },

  getStopTracerCode: function()
  {
    return Utils.getDestroyCookiesCode( [ "XDEBUG_TRACE" ] );
  },

  getStartForwardDebugCode: function( ideKey )
  {
    return Utils.getCookieAssignments( { "start_debug_forward": Utils.getStringLiteralExpression( "1" ), "_XDEBUG_SESSION": Utils.getStringLiteralExpression( ideKey ) }, Utils.defaultPath );
  }

};
