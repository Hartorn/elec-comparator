

# PDF to CSV
=>
https://github.com/tabulapdf/tabula

mode latice, zip of csv

Clean up csv
,+ => ,
^, => ""
,$ => ""
^"", => ""
\n+(.*),= > $1,