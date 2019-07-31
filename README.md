# All Inbox, LLC - Summer Coding Challenge
##
Reading the email file, which main contains millions of emails. The program will reverse the order of email contents line by line but keep the heading in order.

This program is written in Node.js. Two programs are provided:
1. **_mbox.js_**: This program reads the input file as an array, processes the array and write out to "out.txt" as its out put. Use the following command to run:

       ``` node mbox.js filename ```  
 
 The program uses append method to write output file. Please delete out.txt before running the program.

2. **_mbox2.js_**: If we need to handle the file containing millions of emails, then we may need to create an array with almost hundreds millions of elements. In this case, we should use mbox2.js, which uses "readline" module. Please run ```npm install readline``` before running this program. The coomand is as follows:

         ``` node mbox2.js filename```

The program will generate "filename-rev" as the output file. You should delete the existing filename-rev file if it exists.

----

The program uses the following conditions to determine to beginning of an email:
* Between two space lines, there must be at least 4 lines containing "From ", "From: ", "Date: " and "Subjects: ".
* Some headers may contain lines starting like "Reference: " or "Message-Id: ". They should be considered as part of the header, not the body of the email.






