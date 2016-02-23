/**
 * A jQuery tool for converting HTML Tables to CSV.
 */

(function( factory ){
	factory( jQuery );
}( function( $ ){
	
	function TableToCsv(options) {
		options = options || {};
		
		this._defaults = {
			tmpColDelim: String.fromCharCode(11), // vertical tab character
			tmpRowDelim: String.fromCharCode(0), // null character
			colDelim: '","',
			rowDelim: '"\r\n"',
			filename: 'default.csv',
			ignoreRows: ''
		};
		
		this._settings = $.extend({}, this._defaults, options);
	};
	
	$.extend(TableToCsv.prototype , {
		/* Execute */
		_execute: function(target, options) {
			options = options || {};
			
			this._options = $.extend({}, this._settings, options);
			
			var self = this;
			
			//Check that we were given a table.
			var nodeName = target.nodeName.toLowerCase();
			if(nodeName !== "table")
				throw new Error('Target must be a table got "'+nodeName+'" instead.');
			
			var table = $(target);
			
			var headers = table.find('tr:has(th)').not(this._options.ignoreRows);
			var rows = table.find('tr:has(td)').not(this._options.ignoreRows);
			
			var csv = '"';
			csv += self._formatRows(headers.map($._tabletocsvGrabRow));
			csv += self._options.rowDelim;
			csv += self._formatRows(rows.map($._tabletocsvGrabRow)) + '"';
			
			var data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
			
			var a = $('<a></a>');
			a.attr('href', data);
			a.attr('download', self._options.filename);
			a.attr('target', '_blank');
			
			$('body').append(a);
			a[0].click();
		},
		
		_formatRows: function(rows) {
			var self = this;
			
			return rows.get().join(self._settings.tmpRowDelim)
					.split(self._settings.tmpRowDelim).join(self._options.rowDelim)
					.split(self._settings.tmpColDelim).join(self._options.colDelim);
		}
	});

	//jQuery extension for using Table to CSV.
	$.fn.tabletocsv = function(options) {
		//Execute.
		return this.each( function() {
			$.tabletocsv._execute(this, options);
		});
	};
	
	$.tabletocsv = new TableToCsv();
	
	$._tabletocsvGrabRow = function(i, value) {
		var tmpColDelim = $.tabletocsv._settings.tmpColDelim;

		var row = $(value);
		var cols = row.find('td');
		if(!cols.length) cols = row.find('th');

		return cols.map($._tabletocsvGrabCol).get().join(tmpColDelim);
	};
	
	$._tabletocsvGrabCol = function(i, value) {
		var col = $(value);
		var text = $.trim(col.text());
		
		return text.replace('"', '""'); //Escape double quotes.
	};
	
	return $.tabletocsv;
}));
