1. Added missing mongoDB connection logic to index file
2. Registered event and user routers to app
3. Added dotenv for better config management
4. Corrected logic to check for existing events
5. Added invalid parameter check to addJobsEvent to make sure events are created correctly
6. Replaced findOne function with countDocuments as it is more efficient to check model existence
7. Corrected syntax for Event model functions
8. Added model registration to Event model
9. Added user model
10. Corrected syntax for router functions in event router
11. Used aggregation query to fetch events for each user which is more efficient than finding each event for a user
12. Added unit tests