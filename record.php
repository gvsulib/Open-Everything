<?php
/* Script to record interaction choices */
header("Access-Control-Allow-Origin: *");

$record = array($_POST['time'], $_POST['answer']);

// More sane CSV code thanks to Michael Oehrlich, oehrlich@thulb.uni-jena.de

if (!$DataFile = fopen("data.csv", "a")) {echo "Failure: cannot open file"; die;};
if (!fputcsv($DataFile, $record)) {echo "Failure: cannot write to file"; die;};
fclose($DataFile);
echo "file write successful";
