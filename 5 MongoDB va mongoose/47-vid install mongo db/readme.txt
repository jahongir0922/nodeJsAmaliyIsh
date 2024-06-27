
Install mongo db server link - https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/
1 Install MongoDB Community Edition
	
	sudo apt-get install gnupg curl 					///install curl
	
	curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor                                                                    ///To import the MongoDB public GPG key, run the following command

	echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list								///Create a list file for MongoDB
	
	sudo apt-get update							///Reload local package database
	
	sudo apt-get install -y mongodb-org					///Install the MongoDB packages
	
2 Run MongoDB Community Edition
	
	sudo systemctl start mongod						///You can start the mongod process by issuing the following command
	
	sudo systemctl daemon-reload						///If you receive an error similar to the following when starting mongod

	sudo systemctl status mongod						///Verify that MongoDB has started successfully
	
	sudo systemctl enable mongod						///You can optionally ensure that MongoDB will start following a system reboot by issuing the following command
	
	sudo systemctl stop mongod						///As needed, you can stop the mongod process by issuing the following command
	
	sudo systemctl restart mongod						///You can restart the mongod process by issuing the following command

	mongosh									///Start a mongosh session on the same host machine as the mongod. You can run mongosh without any command-line options to 					 
										connect to a mongod that is running on your localhost with default port 27017
3 Uninstall MongoDB Community Edition
	
	sudo service mongod stop						///Stop the mongod process by issuing the following command
	sudo apt-get purge "mongodb-org*"					///Remove any MongoDB packages that you had previously installed
	sudo rm -r /var/log/mongodb						///Remove MongoDB databases and log files
	sudo rm -r /var/lib/mongodb						///Remove MongoDB databases and log files

Install mongodb compass link - https://www.mongodb.com/docs/compass/current/install/

	wget https://downloads.mongodb.com/compass/mongodb-compass_1.40.4_amd64.deb 		////Download MongoDB Compass
	
	sudo dpkg -i mongodb-compass_1.40.4_amd64.deb						///Install MongoDB Compass
	
	mongodb-compass										///Start MongoDB Compass
	


