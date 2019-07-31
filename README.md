# All Inbox, LLC - Summer Coding Challenge
##
Reading the email file, which may contain millions of emails. The program will reverse the order of email contents line by line but keep the heading in order.

This program is written in **Node.js**. Two programs are provided:
1. **_mbox.js_**: This program reads the input file as an array, processes the array and write to "out.txt" as its output. Please use the following command to run:

       ``` node mbox.js filename ```  
 
 The program uses append method to write output file. Please delete out.txt before running the program.

2. **_mbox2.js_**: If we need to handle the file containing millions of emails, then the program needs to create an array with almost hundreds of millions of elements. In this case, we should use mbox2.js, which uses "readline" module. Please run ```npm install readline``` before running this program. The command is as follows:

         ``` node mbox2.js filename```

The program will generate "filename-rev" as the output file. You should delete the existing filename-rev file if it exists.

----

The program uses the following conditions to determine to beginning and end of an email:

* Between two space lines, there must be at least 4 lines containing "From ", "From: ", "Date: " and "Subjects: ".
* Some headers may contain lines starting like "Reference: " or "Message-Id: ". They should be considered as part of the header, not the body of the email.
* Some emails may contain another email as contents.
* The end of an email is marked by two dashes "--" and then followed by  a line starting with 3 numbers separated by dots, such as : 
```
--
1.4.0.g6f2b
```
----
## Challenge for huge input files

If the input email files contain millions of emails, then we cannot use an array to read the entire file and then to process it. A NODE.js module "readline" is installed to read the document "line by line". An temporary array is created to store a "chunk" of the strings when the program reads the file. Each "chunk" is ended by either "end of an email" or "beginning of an email". The program will export (append) the strings into the output file and clear the array. And the the program will be ready to continue to read next "chunk" of strings.  










