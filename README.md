# json line nodejs db
I was just annoyed with my calender app on my smartphone. It was every day asking for internet permission, I clicked only once on allow, now the permission can no longer get removed. (thanks huawei).

That made me thing about implementing a calender app myself, so I keep my own data. Also playing around recently with streaming data, I want to work a little with it.
After implementing a small server for storing data in json line files with dynamic created collections(see the originalServer directory), I wondered, if i could build a small database on it. With acceptable small project performance for small personal projects.

# the concept idea
It will be a simple express js app, that is using nodejs build in fs module for working with files. With node.js version 12 working with streams became much more accessible using the `for await(const item of stream){}` loop.
The data will be stored in a json line file. I plan, always to append to the collections data file. I plan for a second file, called collectionName_idIndex that has one line one number. This file is for finding items quickly by id. Each line in that file will be a fixed length, so when i get an id I can jump to that position and read a number. This number will contain the actual position within the data file. When a document get updated it will just get append to the data file and update the index file, for the position.

When doing a lot of updates, the data file will contain a lot of old data. With a separate method I plan to remove such data. During the update process I also might need to remove the old item or mark it invalid. so it can be removed from search. 

when the first version works, I plan to crete one predefined collection, that contains schema information and existing collections. This could be used for some validations to provide some useful presentation of the data, without actually implementing a real app.

also some UI like couchdb's buildin UI would be nice.

more features might follow, this should be a good first roadmap.
