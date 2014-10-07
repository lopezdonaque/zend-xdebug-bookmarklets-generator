
var Zend =
{

  getDestroyCookiesCode: function()
  {
    return Utils.getDestroyCookiesCode(
    [
      "ZendDebuggerCookie",
      "_bm",
      "debug_line_bp",
      "debug_file_bp",
      "start_debug",
      "start_profile",
      "debug_port",
      "debug_host",
      "send_debug_header",
      "debug_stop",
      "debug_coverage",
      "send_sess_end",
      "debug_jit",
      "debug_start_session",
      "original_url",
      "use_ssl",
      "debug_fastfile",
      "debug_protocol",
      "debug_session_id",
      "no_remote", // If set to 1, the file content will only be taken from files located on the server.
      "use_remote", // If set to 1, file content will be taken from the project in Zend Studio.
      "start_debug_forward"
    ]);
  },

  getStartBaseCode: function( port, ip )
  {
    var assignments =
    {
      "debug_host": Utils.getStringLiteralExpression( ip ),
      "debug_port": Utils.getStringLiteralExpression( port ),
      "debug_session_id": "(Math.floor(Math.random() * 147483648) + 2000)",
      "send_sess_end": Utils.getStringLiteralExpression( "1" ),
      "no_remote": Utils.getStringLiteralExpression( "0" ),
      "send_debug_header": Utils.getStringLiteralExpression( "1" ),
      "original_url": "document.location",
      "use_remote": Utils.getStringLiteralExpression( "1" )
    };

    return this.getDestroyCookiesCode() + Utils.getCookieAssignments( assignments, Utils.defaultPath );
  },

  getStartDebugBaseCode: function( port, ip, breakAtTheFirstLine )
  {
    var assignments =
    {
      "start_debug": Utils.getStringLiteralExpression( "1" ),
      "debug_jit": Utils.getStringLiteralExpression( "1" ),
      "start_debug_forward": Utils.getStringLiteralExpression( "0" )
    };

    var result = this.getStartBaseCode( port, ip ) + Utils.getCookieAssignments( assignments, Utils.defaultPath );

    if( breakAtTheFirstLine )
    {
      result += Utils.getCookieAssignments( { "debug_stop": Utils.getStringLiteralExpression( "1" ) }, Utils.defaultPath );
    }

    return result;
  },


  getDebugThisPageCode: function( port, ip, breakAtFirstLine )
  {
    return this.getDebugNextPageCode( port, ip, breakAtFirstLine ) + Utils.getReloadPageCode();
  },

  getDebugNextPageCode: function( port, ip, breakAtFirstLine )
  {
    return this.getStartDebugBaseCode( port, ip, breakAtFirstLine ) + Utils.getCookieAssignments( { "debug_new_session": Utils.getStringLiteralExpression( "1" ) }, Utils.defaultPath );
  },

  getDebugAllPagesCode: function( port, ip, breakAtFirstLine )
  {
    return this.getStartDebugBaseCode( port, ip, breakAtFirstLine ) + Utils.getCookieAssignments( { "debug_start_session": Utils.getStringLiteralExpression( "1" ) }, Utils.defaultPath );
  },

  getDebugForwardAllPagesCode: function( port, ip, breakAtFirstLine )
  {
    return this.getStartDebugBaseCode( port, ip, breakAtFirstLine ) +
           Utils.getDestroyCookiesCode( [ "debug_start_session", "start_debug" ] ) +
           Utils.getCookieAssignments( { "start_debug_forward": Utils.getStringLiteralExpression( "1" ) }, Utils.defaultPath );
  },

  getDebugAllPostCode: function( port, ip, breakAtFirstLine )
  {
    return this.getStartDebugBaseCode( port, ip, breakAtFirstLine ) + Utils.getCookieAssignments( { "debug_start_session": Utils.getStringLiteralExpression("POST") }, Utils.defaultPath );
  },

  getStartProfilerCode: function( port, ip )
  {
    return this.getStartBaseCode( port, ip ) + Utils.getCookieAssignments(
    {
      "start_profile": Utils.getStringLiteralExpression("1"),
      "start_debug": Utils.getStringLiteralExpression("1")
    }, Utils.defaultPath );
  }

};
