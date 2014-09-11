<?php
/* Script to record interaction choices */
header("Access-Control-Allow-Origin: *");

if(isset($_POST['no-js'])) {
	
	// Not really recoridng anything, just sending them back to the main page
	header('Location: http://gvsu.edu/library/openeverything/');
	exit;
	
} else {

	$record = array($_POST['time'], $_POST['answer']);

	// More sane CSV code thanks to Michael Oehrlich, oehrlich@thulb.uni-jena.de

	if (!$DataFile = fopen("data.csv", "a")) {echo "Failure: cannot open file"; die;};
	if (!fputcsv($DataFile, $record)) {echo "Failure: cannot write to file"; die;};
	fclose($DataFile);
	echo "file write successful";
	
}
