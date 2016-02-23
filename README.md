# TableToCsv
###A jQuery tool for creating CSVs from HTML tables.

This tool is borrowed heavily from [this wonderful gist](https://gist.github.com/adilapapaya/9787842).  Feel free to fork this and or add to the repo.

###Usage

Make sure you include the latest jQuery before including this tool in your code.

Simply call `$('my-table-selector').tabletocsv();` to trigger an automatic download with the filename `default.csv`.  `<tr>`'s with a `<th>` will be grabbed first and put at the top as headers.  All other `<tr>` will be placed in the CSV in the order they appear on the table.  See the sample bellow.

```html
<script>
  function exportTable() {
    $('table').tabletocsv({
      filename: "kids-info.csv",
      ignoreRows: "[data-ignore]"
    })
  }
</script>

<a href="#" onclick="exportTable()">Click To Download</a>
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Favorite Color</th>
      <th>Dog or Cat?</th>
    </tr>
  </thead>
  
  <tbody>
    <tr>
      <td>John</td>
      <td>Red</td>
      <td>Dog</td>
    </tr>
    <tr>
      <td>Jane</td>
      <td>Blue</td>
      <td>Dog</td>
    </tr>
    <tr>
      <td>Tyler</td>
      <td>Green</td>
      <td>Cat</td>
    </tr>
  </tbody>
  
  <tfoot>
    <tr data-ignore>
      <td colspan="3">I am a footer.</td>
    </tr>
  </tfoot>
</table>
```

Will produce...

```
"Name","Favorite Color","Dog or Cat?"
"John","Red","Dog"
"Jane","Blue","Dog"
"Tyler","Green","Cat"
```

###Options
```javascript
{
  filename: "example.csv", //The filename for the csv to be downloaded.
  ignoreRows: "selector" //This is passed as $.not(ignoreRows) on a list of <tr>'s selected.
}
```
