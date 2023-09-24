---
{"dg-publish":true,"dg-path":"docs/Hebrew Reading Ease.md","permalink":"/docs/hebrew-reading-ease/","noteIcon":"","created":"","updated":""}
---


## Overview

The Hebrew Reading Ease is a scale based on word frequency. The script iterates through the Hebrew Bible and generates a frequency index of each word that occurs. Then, the script works back through the text and generates a difficulty average for each passage. The concept is that the more frequently words occur, the easier it will be to recognize and read them. Thus, a passage with a high score should be easier to read and a passage with a low score should be more difficult. For details, see the [[archive/zotero/griffinHebrewReadingEase2010.pdf|Hebrew Reading Ease Abstract]].

The repository may be found at http://github.com/jag3773/HebrewReadingEase.

This [flat viewer page](https://flatgithub.com/jag3773/HebrewReadingEase?filename=hre.csv) shows a book, chapter, verse listing of all of the frequency values that the script outputs.

## Script
Currently, the script will rate all of the OT books, a chapter or a specific verse. You must pass the passage that you would like rated to the script in the form of Gen.1.1. You may also specify Gen, or Gen.1, or ot to rate all books. The script relies on the xml files of the Open Scriptures Hebrew Bible found here: http://github.com/openscriptures/morphhb.

## Gotchas
Please note that the script does not take into account that some portions of the Hebrew Bible are actually Aramaic. Further, note that the Hebrew Reading Ease scale is currently being evaluated for its accuracy in describing the difficulty with which one may read a passage of biblical Hebrew.

## A Comparison of Means

The follow chart provides a comparison of the Arithmetic Mean, Harmonic Mean, and Geometric Mean using the verses from [[resources/bible/pentateuch/Genesis 22\|Genesis 22]] and [[resources/bible/pentateuch/Genesis 34\|Genesis 34]].

|    Verse   | Harmonic Mean | Geometric Mean | Arithmetic Mean |
|:----------:|:-------------:|:--------------:|:---------------:|
|  Gen.22.1  |       16      |       153      |       930       |
|  Gen.22.2  |       5       |       117      |       1580      |
|  Gen.22.3  |       12      |       107      |       958       |
|  Gen.22.4  |       23      |       150      |       1377      |
|  Gen.22.5  |       8       |       45       |       441       |
|  Gen.22.6  |       31      |       145      |       1068      |
|  Gen.22.7  |       7       |       91       |       713       |
|  Gen.22.8  |       19      |       66       |       275       |
|  Gen.22.9  |       12      |       152      |       1233      |
|  Gen.22.10 |       7       |       169      |       2015      |
|  Gen.22.11 |       78      |       302      |       972       |
|  Gen.22.12 |       7       |       117      |       1118      |
|  Gen.22.13 |       5       |       52       |       729       |
|  Gen.22.14 |       18      |       163      |       1238      |
|  Gen.22.15 |       73      |       242      |       1194      |
|  Gen.22.16 |       11      |       319      |       2037      |
|  Gen.22.17 |       5       |       38       |       575       |
|  Gen.22.18 |       4       |       27       |       644       |
|  Gen.22.19 |       19      |       63       |       534       |
|  Gen.22.20 |       15      |       64       |       175       |
|  Gen.22.21 |       11      |       62       |       1008      |
|  Gen.22.22 |       1       |       36       |       729       |
|  Gen.22.23 |       7       |       23       |       628       |
|  Gen.22.24 |       3       |       32       |       755       |
|  Gen.37.1  |       12      |       66       |       131       |
|  Gen.37.2  |       10      |       109      |       1012      |
|  Gen.37.3  |       7       |       91       |       750       |
|  Gen.37.4  |       4       |       37       |       268       |
|  Gen.37.5  |       5       |       16       |        70       |
|  Gen.37.6  |       12      |       152      |       972       |
|  Gen.37.7  |       1       |       11       |       105       |
|  Gen.37.8  |       3       |       30       |       376       |
|  Gen.37.9  |       4       |       28       |       210       |
|  Gen.37.10 |       5       |       55       |       590       |
|  Gen.37.11 |       10      |       35       |       952       |
|  Gen.37.12 |       4       |       15       |        35       |
|  Gen.37.13 |       8       |       105      |       758       |
|  Gen.37.14 |       4       |       44       |       662       |
|  Gen.37.15 |       3       |       37       |       249       |
|  Gen.37.16 |       7       |       73       |       862       |
|  Gen.37.17 |       4       |       34       |       376       |
|  Gen.37.18 |       4       |       19       |       111       |
|  Gen.37.19 |       7       |       73       |       588       |
|  Gen.37.20 |       2       |        7       |        50       |
|  Gen.37.21 |       3       |       36       |       583       |
|  Gen.37.22 |       7       |       69       |       688       |
|  Gen.37.23 |       9       |       124      |       1769      |
|  Gen.37.24 |       3       |       14       |       103       |
|  Gen.37.25 |       2       |        5       |        37       |
|  Gen.37.26 |       3       |       108      |       1701      |
|  Gen.37.27 |       3       |       20       |       221       |
|  Gen.37.28 |       4       |       37       |       1044      |
|  Gen.37.29 |       7       |       86       |       991       |
|  Gen.37.30 |       34      |       88       |       448       |
|  Gen.37.31 |       3       |       32       |       1208      |
|  Gen.37.32 |       7       |       55       |       724       |
|  Gen.37.33 |       3       |       13       |       216       |
|  Gen.37.34 |       11      |       39       |       375       |
|  Gen.37.35 |       7       |       47       |       461       |
|  Gen.37.36 |       2       |       22       |       415       |
