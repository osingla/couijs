var couijs = {};

(function($) { 

	$.abort = function( msg ) {
		require(["dijit/Dialog", "dojo/domReady!"], function( Dialog ) {
		    var dlg = new Dialog({
	        	title: "Error",
    		    content: '<div align="center">' + msg + '</div>',
		        style: "min-width: 200px; min-height: 150px"
    		});
    		dlg.show( );
		});
	 	throw new Error( msg );
	};

	// Are we using IE or Firefox?
	$.detect_browser = function( ) {
	   var browser = navigator.appName;
	   if (browser == "Netscape")
	      $.is_msie = false;
	   else
	      $.is_msie = true;
	   $.windows_os = (navigator.userAgent.indexOf("Win") != -1);
	};
	
	$.get_local_path = function( origPath ) {
	    var s = origPath;
	    var n = s.lastIndexOf('/');
	    if (n != -1)
	        s = s.substring(0, n);
	    if ($.is_msie == true) {
	        n = s.indexOf('file://');
	        if (n != -1)
	            s = s.substring(7);
	    }
	    n = s.indexOf(':');
	    if (n == 2)
	        s = s.substring(1);     // Remove leading /
	    s += '/';
	    return s;
	};
	
	$.getServerURL = function() {
	    var t = new Array();
	    t = document.URL.split('/');
	    var url = '';
	    for (n = 0; n < t.length - 1; n++)
	      url += t[n] + '/';
	    return url;
	};
	
	$.crc32 = function( str ) {

		function Utf8Encode(string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";
	
			for (var n = 0; n < string.length; n++) {
	
				var c = string.charCodeAt(n);
	
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
	
			}
	
			return utftext;
		};
	
		str = Utf8Encode(str);
	
		var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
	
		if (typeof(crc) == "undefined") { crc = 0; }
		var x = 0;
		var y = 0;
	
		crc = crc ^ (-1);
		for( var i = 0, iTop = str.length; i < iTop; i++ ) {
			y = ( crc ^ str.charCodeAt( i ) ) & 0xFF;
			x = "0x" + table.substr( y * 9, 8 );
			crc = ( crc >>> 8 ) ^ x;
		}
	
		return crc ^ (-1);
	}

	// Save the given file
	$.save_file = function( fileUrl, content ) {
	   if ( $.host == null ) {
	      var lp = $.local_path;
	      n = lp.indexOf( 'file://' );
	      if (n != -1)
	         lp = lp.substring( 7 );
	      var n = lp.indexOf( ':' );
	      if ( n == 2 )
	         lp = lp.substring( 1 );     // Remove leading /
	      if ( $.windows_os )
	         lp = lp.replace( /\//g, '\\' )
	      var r = null;
	      if ( $.is_msie )
	         r = ie_save_file( lp + fileUrl, content );
	      else
	         r = mozilla_save_file( lp + fileUrl, content );
	      if ( !r )
	         alert( 'Unable to save file ' + fileUrl );
	      return r;
	   }
	   else {
			var xmlHttp = new XMLHttpRequest();
			var url = $.host + fileUrl;
			xmlHttp.open("PUT", url, false);
			xmlHttp.send( content );
			console.log( "xmlHttp.status=" + xmlHttp.status );
			return (xmlHttp.status == 200) ? true : false;
/*
	       	dojo.xhrPut({
//				url: couijs_config.base + fileUrl,
				url: 'test.xml',
		        timeout: 30000,
		        handleAs: "xml",
		        putData: content,
		        preventCache: true,
//		        load: function( xml, ioArgs ) {
//		        	alert( ioArgs.xhr.responseText );
//		        },
		        error: function( error ) {
		        	alert( 'Error saving configuration! - ' + error );
		        }
			});
*/
	   }
	}

	$.get_nextSibling = function( n ) {
	    try {
		   var y = n.nextSibling;
		   if ( y == undefined )
		      return y;
		   while ( y.nodeType != 1 ) {
		      y = y.nextSibling;
		      if ( y == undefined )
		         return y;
		   }
		   return y;
	    } catch ( ex ) {
		 	$.abort( 'XML file : <b>' + couijs_config.xml_input + '</b><br><br>' + ex );
	    }
	};
	
	$.get_firstChild = function( n ) {

	    try {
		   var y = n.firstChild;
		   while (y.nodeType != 1)
      			y = y.nextSibling;
	   		return y;
	    } catch ( ex ) {
		 	$.abort( 'XML file : <b>' + couijs_config.xml_input + '</b><br><br>' + ex );
	    }

	};
	
	$.add_section = function( attr ) {
	   var section = '';
	   var help = '';
	   var hidden = false;
	   for ( var n = 0; n < attr.length; n++ ) {
	      switch ( attr[n].name ) {
	         case 'name':
	            section = attr[n].value;
	            break;
	         case 'help':
	         	help = attr[n].value.replace(/\\n/g, '<br>'); 
	            break;
	         case 'hidden':
	            hidden = (attr[n].value == 'true');
	            break;
			 default :
			 	$.abort( 'Section : <b>' + section + '</b><br><br>Unknown attribute : <b>' + attr[n].name + '</b>' );
	      }
	   }
/*
	   var found = false;
	   for ( var n = 0; n < $sections.length; n++ ) {
	      if ($sections[n] == section) {
	         alert('Section ' + section + ' is already defined');
	         found_error = true;
	         found = true;
	         break;
	      }
	   }
	   if ( found )
	      return;
*/
	
	    require(["dojo/dom", "dojo/dom-construct", "dijit/layout/ContentPane", "dojo/dom-style"], 
	    	function( dom, domConstruct, ContentPane, domStyle ) {
	
		   console.log( "add_section:    " + section.replace(/_/g, ' ') + ' --- hidden=' + hidden );
		   $.sections[section] = new ContentPane({
		       title: section.replace(/_/g, ' '),
		       selected: "false",
		       tooltip: help
		   });
		   if ( !hidden )
		   		$.sections_tc.addChild( $.sections[section] );

		   $.sections[section].subsections = [];
		   $.sections[section].hidden = hidden;
	
			$.sections[section].table = domConstruct.toDom( "<table width='100%' ></table>" );
			domConstruct.place( $.sections[section].table, $.sections[section].containerNode );

		});
	
	   return section;
	};
	
	$.cb_boolean_changed = function( section, subsection, key, val ) {

		console.log( "boolean changed : " + section + '/' + subsection + '/' + key + ' --- value= ' + val  );
		$.keys['$'+key].value = val;
		
		$.reevaluate_all_rules( );
	};

	$.reevaluate_all_rules = function( ) {

		console.log( "reevaluate_all_rules..." );

		var regex_bold1 = new RegExp( /<b>/g );
		var regex_bold2 = new RegExp( /<\/b>/g );
		
		var nb_apply = 0;
		var nb_apply_and_reboot = 0;
		
		for ( var section in $.sections ) {
//	    	console.log( "" + section );
	    	if ( $.sections[section].hidden )
	    		continue;
	    	
			for ( var subsection in $.sections[section].subsections ) {
//	    		console.log( "   " + subsection );

				var is_visible = true;
				if ( $.sections[section].subsections[subsection].is_advanced && !$.btn_advanced.checked )
					is_visible = false;
				if ( is_visible && ($.sections[section].subsections[subsection].visible_rule != '') ) {
    				try {
						is_visible = eval( $.sections[section].subsections[subsection].visible_rule );
				    } catch ( ex ) {
						$.abort( 'Section : <b>' + section + '</b><br>Subsection : <b>' + subsection + '</b><br><br>visible rule error: <br><b>' + 
							$.sections[section].subsections[subsection].visible_rule + '</b><br><br>' + ex);
				    }
//	    			console.log( "      " + key + '--- vis=' + is_visible );
	    		}
			    require(["dojo/dom-style"], function( domStyle ) {
					domStyle.set( $.sections[section].subsections[subsection].col, {
	    				"display": (is_visible) ? "" : "none",
					});
				});

				for ( var key in $.sections[section].subsections[subsection].keys ) {
				
					var obj_tr = $.sections[section].subsections[subsection].keys[key].tr;
					var skipline = $.sections[section].subsections[subsection].keys[key].skipline;

					var is_visible = true;
		    		if ( $.keys['$'+key].hidden )
		    			is_visible = false;
		    		if ( $.keys['$'+key].advanced && !$.btn_advanced.checked )
		    			is_visible = false;
					if ( is_visible && (couijs.keys['$'+key].visible_rule != '') ) {
	    				try {
							is_visible = eval( couijs.keys['$'+key].visible_rule );
					    } catch ( ex ) {
							$.abort( 'Section : <b>' + section + '</b><br>Subsection : <b>' + subsection + '</b><br>Key : <b>' + key + '</b><br><br>visible rule error: <br><b>' + 
								couijs.keys['$'+key].visible_rule + '</b><br><br>' + ex);
					    }
		    		}
//	    			console.log( "      " + key + '--- vis=' + is_visible );
					$.keys['$'+key].visible = is_visible;
		    		
					var is_enabled = true;
					if ( couijs.keys['$'+key].enable_rule != '' ) {
	    				try {
							is_enabled = eval( couijs.keys['$'+key].enable_rule );
					    } catch ( ex ) {
							$.abort( 'Section : <b>' + section + '</b><br>Subsection : <b>' + subsection + '</b><br>Key : <b>' + key + '</b><br><br>enable rule error: <br><b>' + 
								couijs.keys['$'+key].enable_rule + '</b><br><br>' + ex);
					    }
		    		}
//	    			console.log( "      " + key + '--- ena=' + is_enabled );
					$.keys['$'+key].enabled = is_enabled;

					var is_visible = $.keys['$'+key].visible;
					var is_enabled = $.keys['$'+key].enabled;
//	    			console.log( "      " + key + '--- vis=' + is_visible );
					require(["dojo/dom-style", "dojo/query"], function( domStyle, query ) {
						if ( !skipline ) {
							var obj_tr = $.sections[section].subsections[subsection].keys[key].tr;
							domStyle.set( obj_tr, {
							    "display": (is_visible) ? '' : 'None',
							    "opacity": (is_enabled) ? '1.0' : '0.70',
							});
							var horzline = $.sections[section].subsections[subsection].keys[key].horzline;
							if ( horzline != undefined )
								domStyle.set( horzline, {
							    	"display": (is_visible) ? '' : 'None',
								});
						}
						else {
							domStyle.set( $.sections[section].subsections[subsection].keys[key].label, {
							    "display": (is_visible) ? '' : 'None',
							    "opacity": (is_enabled) ? '1.0' : '0.70',
							});
							if ( $.sections[section].subsections[subsection].keys[key].control != undefined )
								domStyle.set( $.sections[section].subsections[subsection].keys[key].td_control, {
							    	"display": (is_visible) ? '' : 'None',
							    	"opacity": (is_enabled) ? '1.0' : '0.70',
								});
							if ( $.sections[section].subsections[subsection].keys[key].postfix != undefined )
								domStyle.set( $.sections[section].subsections[subsection].keys[key].postfix, {
							    	"display": (is_visible) ? '' : 'None',
							    	"opacity": (is_enabled) ? '1.0' : '0.70',
								});
						}
					});

					var control = $.sections[section].subsections[subsection].keys[key].control;
					if ( control != undefined ) {
						if ( control.set != undefined )
							control.set( "disabled", (is_enabled) ? false : true );
						else
							dojo.query("input, button, textarea, select, radio", control).attr( "disabled", (is_enabled) ? false : true );
					}

					var curr_value = $.keys['$'+key].value;
					var org_value  = $.keys['$'+key].org_value;
					var label = $.sections[section].subsections[subsection].keys[key].label.innerHTML;
					if ( curr_value != org_value ) {
						label = '<b>' + label + '</b>'							
						if ( $.keys['$'+key].apply )
							nb_apply++;
						else
							nb_apply_and_reboot++;
					}
					else {
						label = label.replace( regex_bold1, "" ); 
						label = label.replace( regex_bold2, "" ); 
					}
					$.sections[section].subsections[subsection].keys[key].label.innerHTML = label;

	    		}

	    	}

		}

		$.btn_apply.set( 'disabled', (nb_apply == 0) ? true : false );
		$.btn_apply_and_reboot.set( 'disabled', (nb_apply_and_reboot == 0) ? true : false );
	
	};

	$.control_has_changed = function( section, subsection, key ) {
	
	};
	
	/*
	 * type = 'boolean'  
	 */
	
	$.add_checkbox_input = function( section, subsection, key, label, suffix, value, comment, xvalues ) {
	
		console.log( "checkbox ->     " + section + '/' + subsection + '/' + key + ' --- value= ' + value );
	
	    require(["dojo/dom", "dojo/dom-construct", "dijit/Tooltip"], function( dom, domConstruct, Tooltip ) {
	
			$.sections[section].subsections[subsection].keys[key].td_control = domConstruct.toDom( "<td></td>" );
			domConstruct.place( $.sections[section].subsections[subsection].keys[key].td_control, 
				$.sections[section].subsections[subsection].keys[key].tr );
	
			$.sections[section].subsections[subsection].keys[key].control = new dijit.form.CheckBox( {
				checked: value,
				id: key,
				label: "",
				onChange: function( val ) { $.cb_boolean_changed( section, subsection, key, val ) }
			} );
	
			$.sections[section].subsections[subsection].keys[key].control.placeAt( $.sections[section].subsections[subsection].keys[key].td_control );
	
			$.keys['$'+key].value = value;
			$.keys['$'+key].org_value = value;
			
			if ( suffix != '' ) {
				var text_suffix = domConstruct.toDom( "<a>&nbsp;" + suffix + "</a>" );
				domConstruct.place( text_suffix, $.sections[section].subsections[subsection].keys[key].td_control );
			}
	
			$.control_has_changed( section, subsection, key );
	
		});
	
	};
	
	$.cb_text_input_changed = function( section, subsection, key, val ) {

		console.log( "text changed : " + section + '/' + subsection + '/' + key + ' --- value= ' + val  );
        $.keys['$'+key].value = val;

        $.reevaluate_all_rules( );
	};
	
	/*
	 * type = 'string' 
	 */
	 
	$.add_text_input = function( type, section, subsection, key, label, suffix, value, maxlen, comment ) {
	   var ml = (maxlen == '') ? 64 : parseInt(maxlen);
	   var what = (type == 'password') ? "password" : "text";
	
		console.log( "textbox  ->     " + section + '/' + subsection + '/' + key );
	
	    require(["dojo/dom", "dojo/dom-construct"], function( dom, domConstruct ) {
	
			$.sections[section].subsections[subsection].keys[key].td_control = domConstruct.toDom( "<td></td>" );
			domConstruct.place( $.sections[section].subsections[subsection].keys[key].td_control, 
				$.sections[section].subsections[subsection].keys[key].tr );
	
			$.sections[section].subsections[subsection].keys[key].control = new dijit.form.TextBox( {
				value: value,
				id: key,
				label: "",
				onChange: function( val ) { $.cb_text_input_changed( section, subsection, key, val) },
			});
			
			$.sections[section].subsections[subsection].keys[key].control.placeAt( $.sections[section].subsections[subsection].keys[key].td_control );
	
			if ( suffix != '' ) {
				var text_suffix = domConstruct.toDom( "<a>&nbsp;" + suffix + "</a>" );
				domConstruct.place( text_suffix, $.sections[section].subsections[subsection].keys[key].td_control );
			}
	
			$.keys['$'+key].value = value;
			$.keys['$'+key].org_value = value;
	
		});
	
	};
	
	$.cb_dropdown_changed = function( section, subsection, key, val ) {

		console.log( "boolean changed : " + section + '/' + subsection + '/' + key + ' --- value= ' + val  );
		$.keys['$'+key].value = val;

		$.reevaluate_all_rules( );
		
	};
	
	/*
	 * type = 'list'
	 */
	 
	$.add_list_input = function( section, subsection, key, label, suffix, value, comment, xvalues, xlist ) {
	
		console.log( "list     ->     " + section + '/' + subsection + '/' + key + ' --- value= ' + value );
	
	    require(["dojo/dom", "dojo/dom-construct"], function( dom, domConstruct ) {
	
			$.sections[section].subsections[subsection].keys[key].td_control = domConstruct.toDom( "<td></td>" );
			domConstruct.place( $.sections[section].subsections[subsection].keys[key].td_control, 
				$.sections[section].subsections[subsection].keys[key].tr );
	
			var index = 0;
			var contents = [];
	   		for (var i = 0; i < xvalues.length; i++) {
	      		var xlabel = xlist[i];
	      		if ( !isNaN( xlabel ) )
	      			xlabel = xlabel.toString( );
	      		var xvalue = xvalues[i];
	      		if ( !isNaN( xvalue ) )
	      			xvalue = xvalue.toString( );
	      		if ( xvalue == value ) {
					contents.push( { label: xlabel, value: xvalue, selected: true } );
					index = i;
				}
				else {
					contents.push( { label: xlabel, value: xvalue } );
				}
	   		}
	
			$.sections[section].subsections[subsection].keys[key].control = new dijit.form.Select( {
				label: "", 
				id: key,
				disabled: false,
				options: contents,
				onChange: function( val ) { $.cb_dropdown_changed( section, subsection, key, val ) }
			} );
	
			$.sections[section].subsections[subsection].keys[key].control.placeAt( $.sections[section].subsections[subsection].keys[key].td_control );
	
			if ( suffix != '' ) {
				var text_suffix = domConstruct.toDom( "<a>&nbsp;" + suffix + "</a>" );
				domConstruct.place( text_suffix, $.sections[section].subsections[subsection].keys[key].td_control );
			}
	
			$.keys['$'+key].value = value;
			$.keys['$'+key].org_value = value;
	
		});
	
	};
	
	/*
	 * type = 'radio'
	 */
	 
	$.cb_radio_changed = function( radio, section, subsection, key, val, xvalues ) {

		if ( val ) {
			var radio_value = radio.value;
			console.log( "radio_list changed : " + section + '/' + subsection + '/' + key + ' --- value= ' + val + ' --- value=' + radio.value  );
			$.keys['$'+key].value = xvalues[ parseInt( radio_value ) ];
//			console.log( $.keys['$'+key].index + ' --- ' + $.keys['$'+key].value );
		
			$.reevaluate_all_rules( );
		}
		
	};
	
	$.add_radio_input = function( section, subsection, key, label, suffix, value, comment, xvalues, xlist, orientation ) {
	
		console.log( "list     ->     " + section + '/' + subsection + '/' + key + ' --- value= ' + value );

		if ( orientation == '' )	
			orientation = 'horizontal';
		var options = 'labels on left';
	
	    require(["dojo/dom", "dojo/dom-construct"], function( dom, domConstruct ) {
	
			$.sections[section].subsections[subsection].keys[key].td_control = domConstruct.toDom( "<td></td>" );
			domConstruct.place( $.sections[section].subsections[subsection].keys[key].td_control, 
				$.sections[section].subsections[subsection].keys[key].tr );
	
			var index = 0;
			var contents = [];
	   		for (var i = 0; i < xvalues.length; i++) {
	      		var xlabel = xlist[i];
	      		var xvalue = xvalues[i];
	      		if ( xvalue == value ) {
					contents.push( { label: xlabel, value: xvalue, selected: true } );
					index = i;
				}
				else {
					contents.push( { label: xlabel, value: xvalue } );
				}
	   		}

			var xtable = domConstruct.toDom( "<table></table>" );
			domConstruct.place( xtable, $.sections[section].subsections[subsection].keys[key].td_control );

			group_name = key + '_radio_group';
	
			if ( orientation == 'horizontal' ) {

				if ( options == 'labels on top' ) {

					var xtr1 = domConstruct.toDom( "<tr></tr>" );
					domConstruct.place( xtr1, xtable );
			
					xtr2 = domConstruct.toDom( "<tr></tr>" );
					domConstruct.place( xtr2, xtable );
			
			   		for (var i = 0; i < xvalues.length; i++) {
		
	      				var xlabel = xlist[i];
			      		var xvalue = xvalues[i];

						var xtd1 = domConstruct.toDom( "<td align='center'></td>" );
						domConstruct.place( xtd1, xtr1 );
			
						var xtd2 = domConstruct.toDom( "<td align='center'></td>" );
						domConstruct.place( xtd2, xtr2 );
			
						var radio_label = domConstruct.create( "label", {
		    	            style: "margin-left:5px",
			                innerHTML: xlabel,
		    	        });
						domConstruct.place( radio_label, xtd1 );
		            
						var radio_btn = new dijit.form.RadioButton({
		    				checked: (xvalue == value) ? true : false,
							value: xvalue,
							name: group_name,
							onChange: function( val ) { $.cb_radio_changed( this, section, subsection, key, val, xvalues ) }
						} );
						radio_btn.placeAt( xtd2 );
			      	}

				}
				else {

					var xtr1 = domConstruct.toDom( "<tr></tr>" );
					domConstruct.place( xtr1, xtable );
			
			   		for (var i = 0; i < xvalues.length; i++) {
		
	      				var xlabel = xlist[i];
			      		var xvalue = xvalues[i];

						var xtd1 = domConstruct.toDom( "<td></td>" );
						domConstruct.place( xtd1, xtr1 );
			
						var radio_label = domConstruct.create( "label", {
		    	            style: "margin-left:5px",
			                innerHTML: xlabel,
		    	        });
						domConstruct.place( radio_label, xtd1 );
		            
						var radio_btn = new dijit.form.RadioButton({
		    				checked: (xvalue == value) ? true : false,
							value: xvalue,
							name: group_name,
							onChange: function( val ) { $.cb_radio_changed( this, section, subsection, key, val, xvalues ) }
						} );
						radio_btn.placeAt( xtd1 );
			      	}

				}
			}
			else {
		   		for (var i = 0; i < xvalues.length; i++) {
	
      				var xlabel = xlist[i];
		      		var xvalue = xvalues[i];

					var xtr1 = domConstruct.toDom( "<tr></tr>" );
					domConstruct.place( xtr1, xtable );
		
					var xtd1 = domConstruct.toDom( "<td></td>" );
					domConstruct.place( xtd1, xtr1 );
		
					var radio_label = domConstruct.create( "label", {
	    	            style: "margin-left:5px",
		                innerHTML: xlabel,
	    	        });
					domConstruct.place( radio_label, xtd1 );
	            
					var xtd2 = domConstruct.toDom( "<td></td>" );
					domConstruct.place( xtd2, xtr1 );
		
					var radio_btn = new dijit.form.RadioButton({
	    				checked: (xvalue == value) ? true : false,
						value: xvalue,
						name: group_name,
						onChange: function( val ) { $.cb_radio_changed( this, section, subsection, key, val, xvalues ) }
					} );
					radio_btn.placeAt( xtd2 );
		      	}
			}

			$.sections[section].subsections[subsection].keys[key].control = xtable;
			xtable.disabled = true;

			$.keys['$'+key].value = value;
			$.keys['$'+key].org_value = value;
	
		});
	
		if ( suffix != '' ) {
			var text_suffix = domConstruct.toDom( "<a>&nbsp;" + suffix + "</a>" );
			domConstruct.place( text_suffix, $.sections[section].subsections[subsection].keys[key].td_control );
		}
	
	};
	
	$.cb_slider_list_changed = function( section, subsection, key, val, xvalues ) {

		console.log( "slider_list changed : " + section + '/' + subsection + '/' + key + ' --- value= ' + val  );
		$.keys['$'+key].value = xvalues[ parseInt( val ) ];
//		console.log( $.keys['$'+key].index + ' --- ' + $.keys['$'+key].value );
		
		$.reevaluate_all_rules( );
		
	};
	
	/*
	 * type = 'slider_list'
	 */
	 
	$.add_slider_list_input = function( section, subsection, key, label, suffix, value, comment, xvalues ) {
	
		console.log( "list     ->     " + section + '/' + subsection + '/' + key + ' --- value= ' + value );
	
	    require(["dojo/dom", "dojo/dom-construct"], function( dom, domConstruct ) {
	
			$.sections[section].subsections[subsection].keys[key].td_control = domConstruct.toDom( "<td></td>" );
			domConstruct.place( $.sections[section].subsections[subsection].keys[key].td_control, 
				$.sections[section].subsections[subsection].keys[key].tr );
	
			var br = domConstruct.toDom( "<small style='line-height: 1px'>&nbsp;</small>" );
//			var br = domConstruct.toDom( "<br>" );
			domConstruct.place( br, $.sections[section].subsections[subsection].keys[key].td_control );

			var index = 0;
			var contents = [];
			var labels = [];
	   		for (var i = 0; i < xvalues.length; i++) {
	      		var v = xvalues[i];
	      		if ( v == value ) {
					contents.push( { label: v, value: v, selected: true } );
					index = i;
				}
				else {
					contents.push( { label: v, value: v } );
				}
				if ( i == 0 )
					labels[i] = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + v;
				else if ( i == xvalues.length - 1 )
					labels[i] = v + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
				else
					labels[i] = v;
	   		}
	
			$.sections[section].subsections[subsection].keys[key].control = new dijit.form.HorizontalSlider({
				id: key,
				disabled: false,
		        value: index,
		        minimum: 0,
		        maximum: xvalues.length-1,
		        count: xvalues.length,
		        discreteValues: xvalues.length,
		        intermediateChanges: true,
		        showButtons: false,
		        style: "min-width:300px;",
				onChange: function( val ) { $.cb_slider_list_changed( section, subsection, key, val, xvalues ) }
			} );
        
			$.sections[section].subsections[subsection].keys[key].control.placeAt( $.sections[section].subsections[subsection].keys[key].td_control );
	
			// Create the horizontal ruler
			var horz_ruler = new dijit.form.HorizontalRuleLabels({
				container: "topDecoration",
				labels: labels,
                style: "height:2em;font-size:75%;color:blue;" 
			} );
	
			horz_ruler.placeAt( $.sections[section].subsections[subsection].keys[key].td_control );
			
	
			$.keys['$'+key].value = value;
			$.keys['$'+key].org_value = value;
	
		});
	
		if ( suffix != '' ) {
			var text_suffix = domConstruct.toDom( "<a>&nbsp;" + suffix + "</a>" );
			domConstruct.place( text_suffix, $.sections[section].subsections[subsection].keys[key].td_control );
		}
	
	};
	
	// Handle: <KEY name="XX" ... ></KEY> 
	$.add_key = function( section, key, previous_key, attr, depth, subsection ) {

/*	
		// Each key must be unique
	   for ( var n = 0; n < eval(section + '.keys.length'); n++) {
	      if ( eval(section + '.keys[' + n + ']') == key ) {
	         alert( 'Key ' + key + ' is already defined' );
	         found_error = true;
	         break;
	      }
	   }
	   if ( found_error )
	      return 0;
*/

		$.keys['$'+key] = {};
		
	   var name = '';
	   var type = '';
	   var orientation = '';
	   var maxlen = '';
	   var horzline = false;
	   var skipline = false;
	   var label = '';
	   var postfix = '';
	   var suffix = '';
	   var help = '';
	   var value = '';
	   var values = [];
	   var list = [];
	   var value = '';
	   var enable = '';
	   var visible = '';
	   var check = '';
	   var notyetimplemented = false;
	   var advanced = false;
	   var hidden = false;
	   var apply = false;
		for ( var n = 0; n < attr.length; n++ ) {
	      var a = attr[n];
	      switch ( a.name ) {
	         case 'name': 
	         	name = a.value; 
	         	break;
	         case 'type': 
	         	type = a.value; 
	         	break;
	         case 'orientation': 
	         	orientation = a.value;
	         	break;
	         case 'maxlen': 
	         	maxlen = a.value; 
	         	break;
	         case 'horzline': 
	         	horzline = (a.value == 'true'); 
	         	break;
	         case 'label': 
	         	label = a.value; 
	         	break;
	         case 'postfix': 
	         	postfix = a.value; 
	         	break;
	         case 'suffix': 
	         	suffix = a.value; 
	         	break;
	         case 'help': 
	         	help = a.value.replace(/\\n/g, '<br>'); 
		         break;
	         case 'values': 
	         	values = a.value; 
	         	break;
	         case 'list': 
	         	list = a.value; 
	         	break;
	         case 'value': 
	         	value = (type == 'boolean') ? ((a.value=='true') ? true : false) : a.value; 
	         	break;
	         case 'enable': 
	         	enable = a.value; 
	         	enable = enable.replace(/.AND./g, '&&'); 
	         	enable = enable.replace(/.OR./g, '||'); 
	         	break;
	         case 'visible': 
	         	visible = a.value; 
	         	visible = visible.replace(/.AND./g, '&&'); 
	         	visible = visible.replace(/.OR./g, '||'); 
	         	break;
	         case 'check': 
	         	check = a.value; 
	         	check = check.replace(/.AND./g, '&&'); 
	         	check = check.replace(/.OR./g, '||'); 
	         	break;
	         case 'notyetimplemented': 
	         	notyetimplemented = (a.value == 'true'); break;
	         case 'advanced':
	         	$.nb_advanced_options++; 
	         	advanced = (a.value == 'true'); 
	         	break;
	         case 'hidden': 
	         	hidden = (a.value == 'true'); 
	         	break;
	         case 'apply': 
	         	apply = (a.value == 'true'); 
				$.nb_apply++;
	         	break;
	         case 'index' : 
	         	continue;
	         case 'skipline' : 
	         	skipline = (a.value == 'true');
	         	break;
	         default : 
			 	$.abort( 'Section : <b>' + section + '</b><br>Subsection : <b>' + subsection + '</b><br>Key : <b>' + key + '</b><br><br>Unknown attribute: <b>' + attr[n].name + '</b>');
	      }
	   	}
	
		// Create the new row
	
		var xvalues = values;
		var xlist = list;
		var org_xvalues = xvalues;
	    require(["dojo/dom-construct", "dojo/dom-style", "dojo/query", "dijit/Tooltip"], 
	    	function( domConstruct, domStyle, query, Tooltip ) {
	
//			console.log( "add_key:        " + section + '/' + subsection + '/' + key );
	
			$.sections[section].subsections[subsection].keys[key] = [];
			
			$.keys['$'+key].visible_rule = visible.replace( $.regex_value, "couijs.keys['$1'].value" ); 
			$.keys['$'+key].enable_rule  = enable.replace( $.regex_value, "couijs.keys['$1'].value" ); 

			$.keys['$'+key].visible_rule = $.keys['$'+key].visible_rule.replace( $.regex_index, ".index" ); 
			$.keys['$'+key].enable_rule  = $.keys['$'+key].enable_rule.replace( $.regex_index, ".index" ); 

			$.keys['$'+key].visible_rule = $.keys['$'+key].visible_rule.replace( $.regex_visible, ".visible" ); 
			$.keys['$'+key].enable_rule  = $.keys['$'+key].enable_rule.replace( $.regex_visible, ".visible" ); 

			$.keys['$'+key].visible_rule = $.keys['$'+key].visible_rule.replace( $.regex_enabled, ".enabled" ); 
			$.keys['$'+key].enable_rule  = $.keys['$'+key].enable_rule.replace( $.regex_enabled, ".enabled" ); 

			if ( typeof xvalues == 'string' ) {
				xvalues = xvalues.replace( $.regex_value, "couijs.keys['$1'].value" ); 
				xvalues = xvalues.replace( $.regex_index, ".index" ); 
   				try {
					xvalues = eval( xvalues );
			    } catch ( ex ) {
					$.abort( 'Section : <b>' + section + '</b><br>Subsection : <b>' + subsection + '</b><br>Key : <b>' + key + '</b><br><br>values error: <br><b>' + 
						org_xvalues + '</b><br><br>' + ex );
			    }
			}

			if ( typeof xlist == 'string' ) {
				xlist = xlist.replace( $.regex_value, "couijs.keys['$1'].value" ); 
				xlist = xlist.replace( $.regex_index, ".index" ); 
   				try {
					xlist = eval( xlist );
			    } catch ( ex ) {
					$.abort( 'Section : <b>' + section + '</b><br>Subsection : <b>' + subsection + '</b><br>Key : <b>' + key + '</b><br><br>values error: <br><b>' + 
						org_xvalues + '</b><br><br>' + ex );
			    }
			}

			$.keys['$'+key].apply = apply;

			if (section=='Notifications' && subsection=='NetworkNotifications' && key=='NotifBatteryLow' )
				console.log( '@@@ --> ' + skipline + ' [' + previous_key + ']' );
				
        	if ( horzline ) {
				$.sections[section].subsections[subsection].keys[key].horzline = domConstruct.toDom( "<tr><td colspan='99' nowrap><hr></td></tr>" );
				domConstruct.place( $.sections[section].subsections[subsection].keys[key].horzline, 
					$.sections[section].subsections[subsection].tb_keys );
        	}
        	else {
				$.sections[section].subsections[subsection].keys[key].horzline = undefined;
        	}
        
			$.sections[section].subsections[subsection].keys[key].skipline = skipline;
			if ( !skipline)
				$.sections[section].subsections[subsection].keys[key].tr = domConstruct.toDom( "<tr></tr>" );
			else
				$.sections[section].subsections[subsection].keys[key].tr = $.sections[section].subsections[subsection].keys[previous_key].tr;
			domConstruct.place( $.sections[section].subsections[subsection].keys[key].tr, $.sections[section].subsections[subsection].tb_keys );
	
			if ( !skipline) {
				require(["dojo/on", "dojo/mouse", "dojo/dom-style"], function(on, mouse, domStyle) {
					var bkgd;
					on ( $.sections[section].subsections[subsection].keys[key].tr, mouse.enter, function( evt ) {
						bkgd = domStyle.get( $.sections[section].subsections[subsection].keys[key].tr, "background" );
						domStyle.set( $.sections[section].subsections[subsection].keys[key].tr, {
		    				"background": "#D0D0D0",
						});
					})
					on ( $.sections[section].subsections[subsection].keys[key].tr, mouse.leave, function( evt ) {
						domStyle.set( $.sections[section].subsections[subsection].keys[key].tr, {
		    				"background": bkgd,
						});
					})
	   			});
	   		}
        
			domStyle.set( $.sections[section].subsections[subsection].keys[key].tr, {
		    	"display": "none",
			});
	
			new Tooltip({
	        	connectId: [ $.sections[section].subsections[subsection].keys[key].tr ],
		        label: help,
	        	position: ['after-centered'],
	    	});
	
			// Display the field label (1st column)
	   		var colon = (type == 'boolean') ? '?' : ((label=='') ? '' : ':');
			$.sections[section].subsections[subsection].keys[key].label = domConstruct.toDom( "<td nowrap align='" + couijs_config.labels_align + "'>" + label + colon + "</td>" );
			domConstruct.place( $.sections[section].subsections[subsection].keys[key].label, 
				$.sections[section].subsections[subsection].keys[key].tr );
	
		});
	
		if ( ((type == 'list') || (type == 'radio')) && (list == '') )
			xlist = xvalues;
	
		// Display the field input (2nd column)
		if ( type != '' ) {
			switch (type) {
		      case 'boolean':
		         $.add_checkbox_input( section, subsection, name, label, suffix, value, help, xvalues );
		         break;
		      case 'list':
		         $.add_list_input( section, subsection, name, label, suffix, value, help, xvalues, xlist );
		         break;
		      case 'radio':
		         $.add_radio_input( section, subsection, name, label, suffix, value, help, xvalues, xlist, orientation );
		         break;
		      case 'slider-list':
		         $.add_slider_list_input( section, subsection, name, label, suffix, value, help, xvalues );
		         break;
		      case 'alphanumeric':
		      case 'numeric':
		      case 'IP':
		      case 'password':
		         $.add_text_input( type, section, subsection, name, label, suffix, value, maxlen, help );
		         break;
			}
		}
	
		// Display the postfix label (3rd column)
		if ( type != "" ) {
		    require(["dojo/dom-construct"], function( domConstruct ) {
				$.sections[section].subsections[subsection].keys[key].postfix = domConstruct.toDom( "<td nowrap>" + postfix + "</td>" );
				domConstruct.place( $.sections[section].subsections[subsection].keys[key].postfix, $.sections[section].subsections[subsection].keys[key].tr );
			});
		}

		// Is this new key hidden ? Advanced options ?
		$.keys['$'+key].hidden = hidden;
		$.keys['$'+key].advanced = advanced;

	};
	
	// Start a new subsection Group
	$.start_subsection = function( section_name, node ) {
	
	   var name = '';
	   var label = '';
	   var is_advanced = false;
	   var is_hidden = false;
	   var visible_rule = '';
	   var help = '';
	   var skipline = false;
	   var toggleable = true;
	   var open = true;
	   for (var i = 0; i < node.attributes.length; i++) {
	      var a = node.attributes[i];
	      switch ( a.name ) {
	         case 'name': 
	         	name = a.value; 
	         	break;
	         case 'label': 
	         	label = a.value; 
	         	break;
	         case 'hidden': 
	         	is_hidden = (a.value == 'true'); 
	         	break;
	         case 'advanced': 
	         	is_advanced = (a.value == 'true'); 
	         	break;
	         case 'visible': 
	         	visible_rule = a.value; 
	         	visible_rule = visible_rule.replace(/.AND./g, '&&'); 
	         	visible_rule = visible_rule.replace(/.OR./g, '||'); 
	         	break;
	         case 'help': 
	         	help = a.value.replace(/\\n/g, '<br>'); 
	         	break;
	         case 'skipline': 
	         	skipline = (a.value == 'true');
	         	break;
	         case 'toggleable': 
	         	toggleable = (a.value == 'true'); 
	         	break;
	         case 'open': 
	         	open = (a.value == 'true'); 
	         	break;
	         default :
			 	$.abort( 'Section : <b>' + section_name + '</b><br>Subsection : <b>' + name + '</b><br><br>Unknown attribute: <b>' + a.name + '</b>');
	      }
	   }
	   if ( label == '' ) 
			$.abort( 'Section : <b>' + section_name + '</b><br>Subsection : <b>' + name + '</b><br><br><b>label</b> is missing');
	   if ( name == '' )
			$.abort( 'Section : <b>' + section_name + '</b><br>Subsection : <b>' + name + '</b><br><br><b>name</b> is missing');

		visible_rule = visible_rule.replace( $.regex_value, "couijs.keys['$1'].value" ); 
//		enable_rule  = enable_rule.replace( $.regex_value, "couijs.keys['$1'].value" ); 

		visible_rule = visible_rule.replace( $.regex_index, ".index" ); 
//		enable_rule  = enable_rule.replace( $.regex_index, ".index" ); 

		visible_rule = visible_rule.replace( $.regex_visible, ".visible" ); 
//		enable_rule  = enable_rule.replace( $.regex_visible, ".visible" ); 

		visible_rule = visible_rule.replace( $.regex_enabled, ".enabled" ); 
//		enable_rule  = enable_rule.replace( $.regex_enabled, ".enabled" ); 

/*
	   var found = false;
	   for ( var n = 0; n < $subsections.length; n++ ) {
	      if ( $subsections[n] == name ) {
	         alert('Subsection ' + name + ' is already defined');
	         found_error = true;
	         found = true;
	         break;
	      }
	   }
	   if ( found )
	      return;
*/
	
	    require(["dojo/dom", "dojo/dom-construct", "dojo/dom-style", "dojo/query", "dijit/TitlePane", "dijit/Tooltip"], 
	    	function( dom, domConstruct, domStyle, query, TitlePane, Tooltip ) {
	
			console.log( "add_subsection: " + section_name + '/' + name );

			if ( !skipline ) {
				var row = domConstruct.toDom( "<tr></tr>" );
				domConstruct.place( row, $.sections[section_name].table );
			}

			$.sections[section_name].subsections[name] = new TitlePane({
		        title: label,
		        toggleable: toggleable,
		        open: open,
		    });

			var colspan = (skipline) ? ' colspan="9" rowspan="1"' : '';
			$.sections[section_name].subsections[name].col = domConstruct.toDom( "<td" + colspan + "></td>" );
			domConstruct.place( $.sections[section_name].subsections[name].col, $.sections[section_name].table );

			$.sections[section_name].subsections[name].placeAt( $.sections[section_name].subsections[name].col );

			$.sections[section_name].subsections[name].is_advanced = is_advanced;

			$.sections[section_name].subsections[name].visible_rule = visible_rule;
		    
			$.sections[section_name].subsections[name].keys = [];
	
			$.sections[section_name].subsections[name].tb_keys = domConstruct.toDom( '<table cellpadding="4" cellspacing="0" border="0" ></table>' );
	
			new Tooltip({
	        	connectId: [ $.sections[section_name].subsections[name].id ],
		        label: help,
	        	position: ['above-centered'],
	    	});
	
			domStyle.set( $.sections[section_name].subsections[name].col, {
		    	"display": (is_hidden) ? "none" : "",
			});

		    require(["dojo/dom-construct"], function( domConstruct ) {
				domConstruct.place( $.sections[section_name].subsections[name].tb_keys, 
					$.sections[section_name].subsections[name].containerNode );
			});

		});

		return name;	
	};
	
	$.load_xml_file = function( ) {
	
		$.nb_advanced_options = 0;
		$.nb_more_advanced_options = 0;
		$.nb_apply = 0;
	
	    try {

	        if ( $.is_msie ) {
	            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	            xmlDoc.async = false;
	            if ( $.host == null )
	                xmlDoc.load( $.local_path + couijs_config.xml_input );
	            else
	                xmlDoc.load( couijs_config.base + couijs_config.xml_input );
	        }
	        else {
	            var xmlhttp = new window.XMLHttpRequest( );
	            if ( $.host == null )
	                xmlhttp.open( "GET", $.local_path + couijs_config.xml_input, false );
	            else
	                xmlhttp.open( "GET", couijs_config.base + couijs_config.xml_input, false );
	            xmlhttp.send( null );
	            xmlDoc = xmlhttp.responseXML.documentElement;
	        }

		    var sections = xmlDoc.getElementsByTagName('SECTION');
		    section = sections[0];
		    if ( section == undefined )
			 	$.abort( '<br><br>' + xmlDoc.innerHTML + '<br><br>' );
		
		   // Parse the whole XML tree structure
		    var depth = 0;
		    var node = section;
		    var subsection_name = '';
		    var previous_key = '';
		    while ( node != undefined ) {
		        if ( node.nodeName == 'SECTION' )
		            section_name = $.add_section( node.attributes );
		        if ( node.nodeName == 'KEY' ) {
		            $.add_key( section_name, node.attributes[0].value, previous_key, node.attributes, depth, subsection_name );
		            previous_key = node.attributes[0].value;
	            }
		        if ( (node.nodeName == 'SUBSECTION') || (node.nodeName == 'SECTION') ) {
		            if ( ++depth == 2 )
		                subsection_name = $.start_subsection( section_name, node );
		            node = $.get_firstChild( node );
		        }
		        else {
		            while ( (node != undefined) && ($.get_nextSibling(node) == undefined) ) {
		                node = node.parentNode;
		                depth--;
		            }
		            if ( node != undefined )
		                node = $.get_nextSibling( node );
		        }
		    }
	
	    } catch ( ex ) {
		 	$.abort( 'XML file : <b>' + couijs_config.xml_input + '</b><br><br>' + ex );
	    }
	
		console.log( 'nb_advanced_options=' + $.nb_advanced_options + ' --- nb_more_advanced_options=' + $.nb_more_advanced_options );
		console.log( 'nb_apply=' + $.nb_apply );

		if ( $.nb_advanced_options == 0 )
			$.nb_more_advanced_options = 0;
		require([ 'dojo/dom-style' ], function (domStyle) {
			if ( $.nb_advanced_options == 0 )
		    	domStyle.set( $.btn_advanced.domNode, 'display', 'none' );
			if ( $.nb_more_advanced_options == 0 )
		    	domStyle.set( $.btn_more_advanced.domNode, 'display', 'none' );
			if ( $.nb_apply == 0 )
		    	domStyle.set( $.btn_apply.domNode, 'display', 'none' );
		});	

	
		$.reevaluate_all_rules( );
	
	};

	$.dump_attr = function( depth, attr ) {

		var key = '';
		if ( depth == 2 ) {
			for ( var n = 0; n < attr.length; n++ ) {
				if ( attr[n].name == 'name' ) {
					key = attr[n].value;
					break;
				}
			}
		}
	
		var content = '';
		for ( var n = 0; n < attr.length; n++ ) {
//			console.log( '==> ' +  attr[n].name + '="' + attr[n].value + '"' );
			if ( n > 0 ) {
				if ( depth == 0 )
					content += '\t\t';
				else if ( depth == 1 )
					content += '\t\t\t';
				else if ( depth == 2 )
					content += '\t\t\t\t';
			}
			var value = attr[n].value;
			if ( depth == 2 ) {
				if ( attr[n].name == 'value' ) {
					value = $.keys['$'+key].value;
					if ( value == undefined )
						value = '';
				}
//				else if ( attr[n].name == 'index' ) { 
//					value = $.keys['$'+key].index;
//				}
			} 
			content += attr[n].name + '="' + value + '"';
			if ( n+1 == attr.length )
				content += '>';
			content += '\n';
		}
		
		return content;
	};
	

	$.build_xml_file = function( ) {

		var content = '<?xml version="1.0" encoding="ISO-8859-1"?>\n';
		content += '<SECTIONS>\n'
	
	    try {
	        if ( $.is_msie ) {
	            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	            xmlDoc.async = false;
	            if ( $.host == null )
	                xmlDoc.load( $.local_path + couijs_config.xml_input );
	            else
	                xmlDoc.load( couijs_config.base + couijs_config.xml_input );
	        }
	        else {
	            var xmlhttp = new window.XMLHttpRequest( );
	            if ( $.host == null )
	                xmlhttp.open( "GET", $.local_path + couijs_config.xml_input, false );
	            else
	                xmlhttp.open( "GET", couijs_config.base + couijs_config.xml_input, false );
	            xmlhttp.send( null );
	            xmlDoc = xmlhttp.responseXML.documentElement;
	        }
	    } catch ( ex ) {
	        alert( ex.message );
	        return null;
	    }
	
	    var sections = xmlDoc.getElementsByTagName('SECTION');
	    var section = sections[0];

	    var depth = 0;
	    var node = section;
	    while ( node != undefined ) {
	        if ( node.nodeName == 'SECTION' ) {
	        	content += '\t<SECTION ';
	        	content += $.dump_attr( depth, node.attributes );
	        }
	        if ( node.nodeName == 'KEY' ) {
	        	content += '\t\t\t<KEY ';
	        	content += $.dump_attr( depth, node.attributes );
               	content += '\t\t\t</KEY>\n';
	        }
	        if ( (node.nodeName == 'SUBSECTION') || (node.nodeName == 'SECTION') ) {
		        if ( node.nodeName == 'SUBSECTION' )
		        	content += '\t\t<SUBSECTION ';
	            if ( depth == 1 ) {
		        	content += $.dump_attr( depth, node.attributes );
	            }
	            node = $.get_firstChild( node );
	            depth++;
	        }
	        else {
	            while ((node != undefined) && ($.get_nextSibling(node) == undefined)) {
	                if ( depth == 1 ) {
	                	content += '\t</SECTION>\n';
	                }
	                else if ( depth == 2 ) {
	                	content += '\t\t</SUBSECTION>\n';
	                }
	                node = node.parentNode;
	                depth--;
	            }
	            if ( node != undefined )
	                node = $.get_nextSibling( node );
	        }
	    }

		content += '</SECTIONS>\n'
		return content;
	};
	
// construct data URI (using base64 encoding to preserve multi-byte encodings)
function getDataURI(data) {
//	if (config.browser.isIE)
//		return "data:text/html,"+encodeURIComponent(data);
//	else
		return "data:text/html;base64,"+encodeBase64(data);
}

function encodeBase64(data) {
	if (!data) return "";
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var out = "";
	var chr1,chr2,chr3="";
	var enc1,enc2,enc3,enc4="";
	for (var count=0,i=0; i<data.length; ) {
		chr1=data.charCodeAt(i++);
		chr2=data.charCodeAt(i++);
		chr3=data.charCodeAt(i++);
		enc1=chr1 >> 2;
		enc2=((chr1 & 3) << 4) | (chr2 >> 4);
		enc3=((chr2 & 15) << 2) | (chr3 >> 6);
		enc4=chr3 & 63;
		if (isNaN(chr2)) enc3=enc4=64;
		else if (isNaN(chr3)) enc4=64;
		out+=keyStr.charAt(enc1)+keyStr.charAt(enc2)+keyStr.charAt(enc3)+keyStr.charAt(enc4);
		chr1=chr2=chr3=enc1=enc2=enc3=enc4="";
	}
	return out;
}

function HTML5DownloadSaveFile(filePath,content)
{
	if(document.createElement("a").download !== undefined) {
		var slashpos=filePath.lastIndexOf("/");
		if (slashpos==-1) slashpos=filePath.lastIndexOf("\\"); 
		var filename=filePath.substr(slashpos+1);
		var uri = getDataURI(content);
		var link = document.createElement("a");
		link.setAttribute("target","_blank");
		link.setAttribute("href",uri);
		link.setAttribute("download",filename);
		document.body.appendChild(link); link.click(); document.body.removeChild(link);
		return true;
	}
	return null;
}

	$.onclick_btn_apply = function( ) {

	};
	
	$.ok_cancel_dialog = function( msg, ok_fct ) {

		$.do_ok_fct = function( ) {
			ok_fct();
		};

		require(["dijit/Dialog", "dojo/domReady!"], function( Dialog, ok_fct ) {
			var content =  
				'<br><br>' +
    		    '<div align="center">' + msg + '</div>' +
    		    '<br><br><hr>';
			content += 
				  '<div class="dijitDialogPaneActionBar">' +
        		  '    <button data-dojo-type="dijit/form/Button" type="button" onClick="couijs.do_ok_fct(); couijs.dlg.hide()">' + 
            	  '        OK' +
        		  '    </button>' +
        		  '    <button data-dojo-type="dijit/form/Button" type="button" onClick="couijs.dlg.hide();">' + 
            	  '        Cancel' +
        		  '    </button>' +
    			  '</div>';
		    $.dlg = new Dialog({
	        	title: "Warning",
    		    content: content,
    		    closable: false,
		        style: "min-width: 200px; min-height: 150px"
    		});
    		$.dlg.show( );
		});

	};

	$.do_save_file = function( ) {
	
		var content = $.build_xml_file( );
//		if ( $.host == null )
//			HTML5DownloadSaveFile( "test1.xml", content);
//		else
//			$.save_file( couijs_config.xml_output, content );
			
		var myDate = new Date();
		var now = myDate.getTime() / 1000;
		var len = content.len;
		var c1 = $.crc32( content.slice(0,len-4)) + '\n';
		var reboot_content = 'net\n' + now + '\n' + c1 + + len + '\n';			
		if ( $.host == null )
			HTML5DownloadSaveFile( "test2.xml", content);
		else 
			$.save_file( couijs_config.xml_output, content );

		if ( (couijs_config.close_after_save != undefined) &&  couijs_config.close_after_save ) {
			window.opener = self;
			window.close();
		}
			
	};

	$.onclick_btn_apply_and_reboot = function( ) {

		$.ok_cancel_dialog( "The DVR will reboot and the new configuration will be applied!", couijs.do_save_file );

	};
	
	$.on_change_advanced_options = function( val ) {
	
		require(["dojo/dom-style", "dojo/query"], function( domStyle, query ) {
		
			console.log( "value= " + $.btn_advanced.checked );
			console.log( "class= " + $.btn_advanced.declaredClass );
			if ( $.btn_advanced.checked ) {
				$.btn_more_advanced.set( "checked", true );
			} 
			else {
				$.btn_more_advanced.set( "checked", false );
			}
	
		});
	
		$.reevaluate_all_rules( );
	};
	
	$.place_advanced_buttons = function( ) {
	
	    require( ["dojo/dom", "dojo/dom-construct", "dijit/form/Button", "dijit/form/ToggleButton", "dijit/Tooltip"], 
	    function( dom, domConstruct, Button, ToggleButton, Tooltip ) {
	    
			var table = domConstruct.toDom( '<table cellpadding="2" cellspacing="2" border="0" width="100%" ></table>' );
			domConstruct.place( table, $.tb_bottom_buttons.table.td1 );

		    var row = domConstruct.toDom("<tr></tr>");
	    	domConstruct.place( row, table );
			
		    var col1 = domConstruct.toDom("<td></td>");
	    	domConstruct.place( col1, row );
	
		    var col2 = domConstruct.toDom("<td></td>");
	    	domConstruct.place( col2, row );
	
	        $.btn_advanced = new ToggleButton({
	        	iconClass: 'dijitCheckBoxIcon', 
	        	showLabel: true,
	        	checked: false,
		        label: "Advanced<br>Options",
				onChange: function (val) { $.on_change_advanced_options(); },
	        });
			$.btn_advanced.placeAt( col1 );

			new Tooltip({
	        	connectId: [ $.btn_advanced.id ],
	        	position: ['above'],
		        label: "Select more advanced options"
	    	});
	
	        $.btn_more_advanced = new ToggleButton({
	        	iconClass: 'dijitCheckBoxIcon', 
	        	checked: false,
	        	showLabel: true,
		        label: "More Advanced<br>Options",
				onChange: function() { $.on_change_more_advanced_options() }
	        });
			$.btn_more_advanced.placeAt( col2 );
	
			new Tooltip({
	        	connectId: [ $.btn_more_advanced.id ],
	        	position: ['above'],
		        label: "Select advanced options"
	    	});
	
		});
	
	};
	
	$.place_apply_buttons = function( ) {
	
	    require( ["dojo/dom", "dojo/dom-construct", "dijit/form/Button", "dijit/Tooltip"], function( dom, domConstruct, Button, Tooltip ) {
	    
			var table = domConstruct.toDom( '<table cellpadding="2" cellspacing="2" border="0" width="100%" ></table>' );
			domConstruct.place( table, $.tb_bottom_buttons.table.td3 );

		    var row = domConstruct.toDom("<tr></tr>");
	    	domConstruct.place( row, table );
			
		    var col1 = domConstruct.toDom("<td></td>");
	    	domConstruct.place( col1, row );
	
		    var col2 = domConstruct.toDom("<td></td>");
	    	domConstruct.place( col2, row );
	
	        $.btn_apply = new Button({
		        label: "Apply",
				onClick: function() { $.onclick_btn_apply() },
	        });
			$.btn_apply.placeAt( col1 );
	
			new Tooltip({
	        	connectId: [ $.btn_apply.id ],
	        	position: ['above'],
		        label: "Apply the new configuration"
	    	});
	
	        $.btn_apply_and_reboot = new Button({
	        	iconClass: 'couijs_btn_apply_and_reboot', 
		        label: "Apply and Reboot",
		        disabled: true,
				onClick: function() { $.onclick_btn_apply_and_reboot() }
	        });
			$.btn_apply_and_reboot.placeAt( col2 );
	
			new Tooltip({
	        	connectId: [ $.btn_apply_and_reboot.id ],
	        	position: ['above'],
		        label: "Apply the new configuration and reboot"
	    	});
	
		});
	
	};
	
   	// Display top title
	$.main_top_title = function( ) {
	    require(["dojo/dom", "dojo/dom-construct"],
	    function( dom, domConstruct ) {

			var table = domConstruct.toDom( "<table width='100%'></table>" );
			domConstruct.place( table, $.main_top_cp.containerNode );
			
			var row = domConstruct.toDom( "<tr style='width: 100%'></tr>" );
			domConstruct.place( row, table );

			var col1 = domConstruct.toDom( '<td align="left" nowrap="nowrap" valign="middle" width="1%"></td>' );
			domConstruct.place( col1, row );

			var col2 = domConstruct.toDom( '<td align="center" nowrap="nowrap" valign="middle" width="33%"></td>' );
			domConstruct.place( col2, row );

			var col3 = domConstruct.toDom( '<td align="right" nowrap="nowrap" valign="middle" width="1%"></td>' );
			domConstruct.place( col3, row );

			if ( couijs_config.title_left != undefined )
				col1.innerHTML = couijs_config.title_left;
			if ( couijs_config.title_top != undefined )
				col2.innerHTML = couijs_config.title_top;
			if ( couijs_config.title_right != undefined )
				col3.innerHTML = couijs_config.title_right;

		});
	}
		
	$.place_bottom_buttons = function( ) {
		
	    require( ["dojo/dom", "dojo/dom-construct", "dijit/Tooltip"], function( dom, domConstruct, Tooltip ) {
	    
			$.tb_bottom_buttons = {};
			$.tb_bottom_buttons.table = domConstruct.toDom( '<table cellpadding="2" cellspacing="2" border="0" width="100%" ></table>' );
		    $.tb_bottom_buttons.table.row = domConstruct.toDom("<tr></tr>");
		
		    $.tb_bottom_buttons.table.td1 = domConstruct.toDom( '<td align="left" nowrap="nowrap" valign="middle" width="1%"></td>' );
	    	domConstruct.place( $.tb_bottom_buttons.table.td1, $.tb_bottom_buttons.table.row );
	
		    $.tb_bottom_buttons.table.td2 = domConstruct.toDom( '<td align="center" nowrap="nowrap" valign="middle" width="98%"></td>' );
	    	domConstruct.place( $.tb_bottom_buttons.table.td2, $.tb_bottom_buttons.table.row );
	
		    $.tb_bottom_buttons.table.td3 = domConstruct.toDom( '<td align="right" nowrap="nowrap" valign="middle" width="1%"></td>' );
	    	domConstruct.place( $.tb_bottom_buttons.table.td3, $.tb_bottom_buttons.table.row );
	
	    	domConstruct.place( $.tb_bottom_buttons.table.row, $.tb_bottom_buttons.table );
	
			domConstruct.place( $.tb_bottom_buttons.table, $.main_bottom_cp.containerNode );

			$.place_advanced_buttons( );
			$.place_apply_buttons( );
	
	    	domConstruct.place( $.tb_bottom_buttons.table.row, $.tb_bottom_buttons.table );
	
			domConstruct.place( $.tb_bottom_buttons.table, $.main_bottom_cp.containerNode );
		
		});
	
	};
	
	$.main = function( ) {

		console.log( couijs_config );

		if ( couijs_config.title != undefined )
			document.title = couijs_config.title;

		$.detect_browser( );
	    $.local_path = $.get_local_path( document.location.href );
	    console.log( 'local_path=' + $.local_path );
	
	    if ( ($.local_path.lastIndexOf('http://') == -1) && ($.local_path.lastIndexOf('https://') == -1) ) {
	        $.host = null;
	    }
	    else {
	        $.host = $.getServerURL( );
	        console.log( '$.host=' + $.host );
	    }
	
	    require([
	             "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/layout/TabContainer", "dijit/TitlePane", 
	             "dojo/dom", "dojo/dom-construct", "dijit/form/TextBox", "dijit/form/CheckBox", "dijit/form/Select", "dijit/form/RadioButton",
	             "dijit/Tooltip", "dijit/form/Button", "dijit/form/ToggleButton", "dijit/form/HorizontalSlider", "dijit/form/HorizontalRuleLabels",
	         ], function( BorderContainer, ContentPane, TabContainer, TitlePane, dom, domConstruct, TextBox, CheckBox, Select, RadioButton, Tooltip, Button, ToggleButton ){
	
	    	// create a BorderContainer as the top widget in the hierarchy
	    	$.main_bc = new BorderContainer({
	    		style: "height: 100%; width: 100%;",
	    		class: "demoLayout",
	    		design: "headline"
	    	});
	    	$.main_bc.placeAt( document.body, "last" );
	    
	        // create a ContentPane as the left pane in the BorderContainer
	        $.main_top_cp = new ContentPane({
	            region: "top",
	            class: "edgePanel",
	        });
	    	$.main_top_cp.placeAt( $.main_bc, "last" );
	    	
	    	// Display top title
	    	$.main_top_title( );
	
	        // Create a ContentPane as the left pane in the BorderContainer
	        $.main_left_cp = new ContentPane({
	            region: "left",
	            style: "width: 100%; height: 100%; border-width:0px;",
	            class: "edgePanel",
	            gutters: "true",
	        });
	    	$.main_left_cp.placeAt( $.main_bc, "last" );
	
	        // Create a Tab container into the left pane - Sections name
	        $.sections_tc = new TabContainer({
	            tabPosition: couijs_config.sections_pos,
	            tabStrip: "false",
	            doLayout: "true"
	        });
	    	$.sections_tc.placeAt( $.main_left_cp, "last" );
	
	        // Create a ContentPane as the bottom pane in the BorderContainer
	        $.main_bottom_cp = new ContentPane({
	            region: "bottom",
	            class: "edgePanel",
	        });
	    	$.main_bottom_cp.placeAt( $.main_bc, "last" );
			$.place_bottom_buttons( );

			$.regex_value = new RegExp( /(\$+[^) .=]+)+/g );
			$.regex_index = new RegExp( /(.value.index)+/g );
			$.regex_visible = new RegExp( /(.value.visible)+/g );
			$.regex_enabled = new RegExp( /(.value.enabled)+/g );
	
	    	// Read xml file, interpret it, create the UI and display it
			$.sections = [];
			$.keys = [];
	    	$.load_xml_file( );
	        $.main_bc.startup( );
	
	    });
	
	}

})( couijs );  

require( ["dojo/ready"], function( ready ) {
	ready( function ( ) {
		couijs.main( );
	});
});
