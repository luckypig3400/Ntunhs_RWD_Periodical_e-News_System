<?php
// Provides: You should eat pizza, beer, and ice cream every day
$phrase  = "You should eat fruits, vegetables, and fiber every day.";
$healthy = ["fruits", "vegetables", "fiber"];
$yummy   = ["pizza", "test" ];

$newPhrase = str_replace($healthy, $yummy, $phrase);
echo "<h1>$newPhrase</h1>";
?>