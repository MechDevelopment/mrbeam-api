# MrBeamAPI

REST API for mrbeam project. We want to create an online service for calculating beams using the finite element method, accessible to everyone.

## Usage
```javascript
const URL = "https://mrbeam-api.herokuapp.com/generate";
```
This API will allow generating json data of the correct beams for tests. Some example of a GET request:
```javascript
fetch(URL).then(res => res.json()).then(data => console.log(data));
```

Use POST request to configure the generator:
```javascript
fetch(URL, {
  method: "POST",
  headers: { "Content-Type": "application/json;charset=utf-8" },
  body: JSON.stringify({ complexity: 'elementary', beamLength: 10, unitsCount: 4 })
})
  .then(res => res.json())
  .then(data => console.table(data));
```
Body is an object with optional parameters:
>'complexity' - the complexity of the beam,

>'unitsCount' - number of elements, including material,

>'beamLength' - beam length.

| 'complexity'   | 'unitsCount' | features               |
|----------------|--------------|------------------------|
| 'random'       | 2 - 10       | all                    |
| 'elementary'   | 2 - 6        | 'moment', 'force'      |
| 'intermediate' | 4 - 8        | 'distload', 'material' |
| 'advanced'     | 6 - 10       | 'hinge'                |

'complexity' and 'unitsCount' can conflict with each other, but 'unitsCount' is more important.

## License
[MIT](https://choosealicense.com/licenses/mit/)
