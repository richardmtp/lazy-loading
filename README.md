DIAGNAL PROGRAMMING TEST

How to run application?
  * Open terminal
  * cd to application path
  * Run command `bower install`
  * Move application folder to apache server(/var/www/html/)
  * Run ifconfig in terminal to find ip address(ex. inet addr:192.168.0.10)
  * Connect your mobile device and application deployed system in the same network
  * Open brower in mobile and enter url like  192.168.0.10/{{application_folder}}/app/

Release Notes
  * This release includes various feature:
  	* Video Listing page added - which contains a page title and a three column vertically scrolling grid which is not horizontally scrollable.
  	* Lazy loading feature implemented.
  	* Support Mobile browser
    * 3 x 3 grid alignment fixed.
    * Missing poster added.
    * Search functionality implemented (based on local loaded data)

  * Known issue:
  	* Autocomplete feature not implemented for search.