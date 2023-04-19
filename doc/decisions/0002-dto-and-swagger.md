## Context
We need:

1. DTOs to communicate with the client, decouple the service layer with our entities
2. Mapping our entities to DTOs
3. Swagger for our API Documentation
4. When we change the DTOs structure in the code, the update also must be done in our API documentation 

## Decision
Use Strategy Pattern for DTOs mapping, it will help the open/closed principle 

The swagger documentation is done inside the code, our DTOs will be the source of truth
