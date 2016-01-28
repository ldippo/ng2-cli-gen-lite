# ng2-cli-gen-lite
A lightweight angular 2 generator easily usable with existing angular 2 projects.

## Quickstart
Clone this repo

<code> git clone https://github.com/ldippo/ng2-cli-gen-lite.git</code>

Go to cloned directory and install CLI globally

<code>npm install -g</code>

Go to your desired project folder

<code>cd your/feature/folder</code>

Generate a component

<code>ang2 mytestfilename -c</code>

## Generator API
Generate your angular2 code with just a filename - no extensions necessary

Generate a component
<code>ang2 filename -c</code>

Result: TS, SCSS, HTML

Generate a directive
<code>ang2 filename -d</code>

Result: TS

Generate a pipe
<code>ang2 filename -p</code>

Result: TS
