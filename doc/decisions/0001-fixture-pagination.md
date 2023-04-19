## Context
We need to show the fixture list to the user and can load more when user scroll down 

## Decision
The traditional way is to use limit offset, but the DB will slow down when there are more fixture data inserted to the db.

We will instead index our `date` column and use cursor-based pagination.

The downside is that we will not be able to jump from page to page, but the `load more` will work perfectly well
