# ShopApp
##  Backend
Exposes REST API `(HAL)` to
- Create a category
- List all categories
- Create an item for a category
- List all items for the category

##  Frontend
GUI to view the categories and its items with following support
- Filtering
- Pagination
- Sort by
- Page size

## Tools Choices
| Framework        | Description|
| ------------- |-------------|
| [Spring Data REST](https://docs.spring.io/spring-data/rest/docs/2.0.0.M1/reference/html/index.html)    | Translates HTTP calls to method calls by mapping the HTTP verbs to CRUD methods. |
|[H2](http://www.h2database.com/html/main.html)     | Embedded in-memory database       |
| [Lombok](https://projectlombok.org/) | To avoid repeating boiler plate getter, settter, equals, hashcode in java |
| [React](https://reactjs.org/) | A JavaScript library for building user interfaces      |
| [reactstrap](https://reactstrap.github.io/) | React native Bootstrap 4 components      |
| [Create React App](https://github.com/facebook/create-react-app) | One Dependency that encapsulates all goodness of React, JSX, ES6, TypeScript, Webpack, Babel, ESLint     |

### HTTP Verb to CRUD Method Mapping
|Verb |	Method|
|---- |-------|
GET 	|CrudRepository<ID,T>.findOne(ID id)
POST |	CrudRepository<ID,T>.save(T entity)
PUT 	|CrudRepository<ID,T>.save(T entity)
DELETE |	CrudRepository<ID,T>.delete(ID id)

## Project Setup

http://localhost:8080/